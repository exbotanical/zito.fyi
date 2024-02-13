---
title: 'source code review: birpc'
cover: images/chris_burden.jpg
coverAlt: Chris Burden's Urban Light
description: "A source code review of antfu's birpc library"
datePublished: '2023-03-04T08:00:00.000Z'
category: 'programming'
tags:
  - source code review
  - rpc
---

https://github.com/antfu/birpc/commit/9e68576c513eb32cb1f27ccbc8fcd706b9165482

# Intro

This is my source code of antfu's birpc. I've followed antfu's work for a couple years now, ever since I got interested in Vue at my last job. antfu warrants little introduction - dude is the TJ Hollowaychuk of frontend; immensely prolific in the open source community, and an inevitable mention in almost any noteworthy project across the Vue ecosystem.

I'm not particularly keen on open source hype, or the tenuous boundary whereat the intersection between software development and social media qua influencers breaks down, as is especially prominent in the React ecosystem. But, I enjoy reading antfu's work because he is undeniably a very good programmer. I find the Vue community generally strikes a rather refreshing balance in TypeScript programming - the code is at once terse and creative, the build toolchains are novel albeit practical, and the baseline competency is high enough that you see the language wielded in a manner you more often see in languages like C. I've learned a lot from this style in the past, so without hesitation I welcome another opportunity to peek into one of these libraries.

The birpc library is very simple and small. birpc is a thin client that handles bidirectional RPC while remaining agnostic to the serialization protocol. You can create a birpc instance with the Websocket API, MessageChannel, or presumably anything, really.

# How it's used

We'll start by looking at some examples taken from the birpc README. The first example uses the Websocket API:

```ts
// Client
import type { ServerFunctions } from './types'

const ws = new WebSocket('ws://url')

const clientFunctions: ClientFunctions = {
  hey(name: string) {
    return `Hey ${name} from client`
  },
}

const rpc = createBirpc<ServerFunctions>(clientFunctions, {
  post: data => ws.send(data),
  on: data => ws.on('message', data),
  // these are required when using WebSocket
  serialize: v => JSON.stringify(v),
  deserialize: v => JSON.parse(v),
})

await rpc.hi('Client') // Hi Client from server
```

```ts
// Server
import { WebSocketServer } from 'ws'
import type { ClientFunctions } from './types'

const serverFunctions: ServerFunctions = {
  hi(name: string) {
    return `Hi ${name} from server`
  },
}

const wss = new WebSocketServer()

wss.on('connection', ws => {
  const rpc = createBirpc<ClientFunctions>(serverFunctions, {
    post: data => ws.send(data),
    on: data => ws.on('message', data),
    serialize: v => JSON.stringify(v),
    deserialize: v => JSON.parse(v),
  })

  await rpc.hey('Server') // Hey Server from client
})
```

In the client, we initialize a birpc using the server's API and vice versa. In a birpc we pass the API implementation, then implement `post` and `on` - an explicit send and receive methods, respectively. We also implement serialization. Very simple. Let's see how this works with MessageChannel:

```ts
// Bob
import type { AliceFunctions } from './types'
import { channel } from './channel'

const Bob: BobFunctions = {
  hey(name: string) {
    return `Hey ${name}, I am Bob`
  },
}

const rpc = createBirpc<AliceFunctions>(Bob, {
  post: data => channel.port1.postMessage(data),
  on: data => channel.port1.on('message', data),
})

await rpc.hi('Alice') // Hi Bob, I am Alice
```

```ts
// Alice
import type { BobFunctions } from './types'
import { channel } from './channel'

const Alice: AliceFunctions = {
  hi(name: string) {
    return `Hi ${name}, I am Alice`
  },
}

const rpc = createBirpc<BobFunctions>(Alice, {
  post: data => channel.port2.postMessage(data),
  on: data => channel.port2.on('message', data),
})

await rpc.hey('Alice') // Hey Alice, I am Bob
```

For MessageChannel, we don't implement `serialize` or `deserialize` because MessageChannel does this out-of-the-box. I assume this means the default implementations for birpc `serialize` and `deserialize` must be identity functions.

Somehow, under the hood, calling the `hi` and `hey` functions will need to invoke `post` and `on`. We'll see how this is accomplished when reading the source code.

There's also a unit test suite that demonstrates one-to-many communication. Let's take a look at that, too - because it showcases `createBirpcGroup`:

```ts
const channel1 = new MessageChannel()
const channel2 = new MessageChannel()
const channel3 = new MessageChannel()

const client1 = createBirpc<AliceFunctions, BobFunctions>(Bob, {
  post: data => channel1.port1.postMessage(data),
  on: async data => {
    await new Promise(resolve => setTimeout(resolve, 100))
    channel1.port1.on('message', data)
  },
})
const client2 = createBirpc<AliceFunctions, BobFunctions>(Bob, {
  post: data => channel2.port1.postMessage(data),
  on: data => channel2.port1.on('message', data),
})
const client3 = createBirpc<AliceFunctions, BobFunctions>(Bob, {
  post: data => channel3.port1.postMessage(data),
  on: data => channel3.port1.on('message', data),
})

const server = createBirpcGroup<BobFunctions, AliceFunctions>(
  Alice,
  [
    {
      post: data => channel1.port2.postMessage(data),
      on: data => channel1.port2.on('message', data),
    },
    {
      post: data => channel2.port2.postMessage(data),
      on: data => channel2.port2.on('message', data),
    },
  ],
  { eventNames: ['bump'] },
)

// RPCs
expect(await client1.hello('Bob')).toEqual('Hello Bob, my name is Alice')
expect(await client2.hello('Bob')).toEqual('Hello Bob, my name is Alice')
expect(await server.broadcast.hi('Alice')).toEqual([
  'Hi Alice, I am Bob',
  'Hi Alice, I am Bob',
])

server.updateChannels(channels => {
  channels.push({
    post: data => channel3.port2.postMessage(data),
    on: data => channel3.port2.on('message', data),
  })
})

expect(await server.broadcast.hi('Alice')).toEqual([
  'Hi Alice, I am Bob',
  'Hi Alice, I am Bob',
  'Hi Alice, I am Bob',
])

expect(await client3.hello('Bob')).toEqual('Hello Bob, my name is Alice')
```

I've not included the implementations of `Bob` and `Alice` here - they're just APIs. The groupBirpc has a `broadcast` function that calls the API on all of its clients. We see that during the test, we call `updateChannels` to push one more birpc client into the group. After doing this, `broadcast` now calls all three clients.

There's also the third argument to `createBirpcGroup`, an object with `eventNames`. It's not apparent from the test what this does. There's only one assertion in the unit tests that touches on this, and it's not testing the functionality. We'll have to figure this out when reading the code.

## The code

We can see that birpc provides a type-safe way to make RPC calls. It's very simple. Let's look at the code.

We'll begin with the `createBirpc` function:

```ts
export function createBirpc<
  RemoteFunctions = Record<string, never>,
  LocalFunctions = Record<string, never>,
>(
  functions: LocalFunctions,
  options: BirpcOptions<RemoteFunctions>,
): BirpcReturn<RemoteFunctions, LocalFunctions>
```

I've started with just the type signature so we can gather our bearings. `createBirpc` takes as input a `LocalFunctions` and a `BirpcOptions<RemoteFunctions>`, where `LocalFunctions` and `RemoteFunctions` is by default a `Record<string, never>` (essentially an empty object). As we saw in the examples, `RemoteFunctions` is the API the birpc will be calling to, and `LocalFunctions` will be those supported by the birpc. So `functions` is the remote's API.

What about `options`? `options` is a `BirpcOptions<RemoteFunctions>`.

```ts
type BirpcOptions<Remote> = EventOptions<Remote> & ChannelOptions
```

A `BirpcOptions` is the disjoint union of `EventOptions<Remote>` and `ChannelOptions`.

```ts
export interface EventOptions<Remote> {
  /**
   * Names of remote functions that do not need response.
   */
  eventNames?: (keyof Remote)[]

  /**
   * Maximum timeout for waiting for response, in milliseconds.
   *
   * @default 60_000
   */
  timeout?: number

  /**
   * Custom resolver to resolve function to be called
   *
   * For advanced use cases only
   */
  resolver?: BirpcResolver

  /**
   * Custom error handler
   */
  onError?: (error: Error, functionName: string, args: any[]) => boolean | void

  /**
   * Custom error handler for timeouts
   */
  onTimeoutError?: (functionName: string, args: any[]) => boolean | void
}
```

We saw `eventNames` being used in the examples, but not these other fields. We'll circle back to these later.

Here's `ChannelOptions`:

```ts
interface ChannelOptions {
  /**
   * Function to post raw message
   */
  post: (data: any, ...extras: any[]) => any | Promise<any>
  /**
   * Listener to receive raw message
   */
  on: (fn: (data: any, ...extras: any[]) => void) => any | Promise<any>
  /**
   * Custom function to serialize data
   *
   * by default it passes the data as-is
   */
  serialize?: (data: any) => any
  /**
   * Custom function to deserialize data
   *
   * by default it passes the data as-is
   */
  deserialize?: (data: any) => any
}
```

As we can see, this is the interface we must implement for our serialization protocol. So `createBirpc` accepts as input the remote API implementation and the serialization protocol implementation, plus some other options we haven't learned about yet. What about the return value?

```ts
BirpcReturn<RemoteFunctions, LocalFunctions>
```

We know these generic type parameters, but what about `BirpcReturn`?

```ts
export type BirpcReturn<
  RemoteFunctions,
  LocalFunctions = Record<string, never>,
> = {
  [K in keyof RemoteFunctions]: BirpcFn<RemoteFunctions[K]>
} & { $functions: LocalFunctions }
```

Let's distill this down. `createBirpc` returns an object (`BirpcReturn`) whose keys are the function names of the remote API implementation. That's how we can call `rpc.hi` in the earlier example. But we also have a nested object under the `$functions` key. This key stores the `LocalFunctions`. Let's revisit this in a moment.

The object's values we can presume are the API functions except we see that the type is `BirpcFn<RemoteFunctions[K]>`, or a `BirpcFn` of the type of function that the original API implementation has for a given key `K`.

For example,

```ts

const remoteApi: RemoteFunctions = {
  a: (arg: string) => string
}

BirpcFn<RemoteFunctions['a']>

BirpcFn<(arg: string) => string>
```

We need to know what a `BirpcFn` is. I mentioned earlier this must be where we abstract the business logic that will proxy the call to `post` or `on`.

```ts
export type BirpcFn<T> = PromisifyFn<T> & {
  /**
   * Send event without asking for response
   */
  asEvent(...args: ArgumentsType<T>): void
}
```

Interesting. `BirpcFn` shows us that we wrap the API function in an object that joins an `asEvent` function and the original function. Remember, in Javascript, a function is an object and can have properties attached to it. This is like saying:

```ts
function doThing() { ... }

doThing.asEvent = function () {
  ...
}

doThing()
doThing.asEvent()
```

Love it! There's some of this in the Vue source code, too. Notice the API function itself is wrapped with a `PromisifyFn`. Here's the information we need to break that one down:

```ts
export type ArgumentsType<T> = T extends (...args: infer A) => any ? A : never
export type ReturnType<T> = T extends (...args: any) => infer R ? R : never
export type PromisifyFn<T> = ReturnType<T> extends Promise<any>
  ? T
  : (...args: ArgumentsType<T>) => Promise<Awaited<ReturnType<T>>>
```

So `PromisifyFn` says if the `ReturnType` of a function `T` is a Promise, then resolve to that Promise (identity); else, a function that takes the arguments of `T` and returns a Promise that resolves to the return type of `T`. In other words, if the handler function is a Promise - great. If not, wrap it in a Promise. This is common in JavaScript APIs where you want to be able to handle both Promises and regular functions - you just wrap everything as a Promise.

So back to `BirpcReturn` - `createBirpc` returns an object that resembles the remote API implementation, except each key's function also has an `asEvent` function property, and each function is a Promise.

Now that we have the type signature down, let's look at the implementation. It's a bit long, so I have annotated it and will discuss thereafter.

```ts
export function createBirpc<
  RemoteFunctions = Record<string, never>,
  LocalFunctions = Record<string, never>,
>(
  functions: LocalFunctions,
  options: BirpcOptions<RemoteFunctions>,
): BirpcReturn<RemoteFunctions, LocalFunctions> {
  // Destructure out all of the options and protocol implementations
  const {
    post,
    on,
    eventNames = [],
    // Yup - we were right. These are just identity functions
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
    // Hmm, interesting - we'll check this out later.
    resolver,
    timeout = DEFAULT_TIMEOUT,
  } = options

  // Interesting - a Map of strings to custom promises
  const rpcPromiseMap = new Map<
    string,
    {
      resolve: (arg: any) => void
      reject: (error: any) => void
      timeoutId: Parameters<typeof clearTimeout>[0]
    }
  >()

  let _promise: Promise<any> | any

  // This is how we intercept the API calls and use post/on
  const rpc = new Proxy(
    {},
    {
      // Any property access will trigger this
      get(_, method: string) {
        // If the LocalFunctions key, just return them
        if (method === '$functions') return functions

        // Create a local sender function. The reason we define the function inside the `get` call closure is so
        // we can pass the `method` name down. In the example we saw earlier, this would be 'hi' or 'hey'
        const sendEvent = (...args: any[]) => {
          post(serialize(<Request>{ m: method, a: args, t: 'q' }))
        }

        // Ah, so we see how this is used. If the invoked API method is one of the eventNames, we assign the sender function to `asEvent`. Not sure why we do this yet.
        if (eventNames.includes(method as any)) {
          sendEvent.asEvent = sendEvent
          return sendEvent
        }

        // Another send function, this is what we use the the call is not in the eventNames list
        const sendCall = async (...args: any[]) => {
          // Wait if `on` is promise (original comment)
          // See above promise is declared outside the proxy scope.
          // We assign promise outside the rpc proxy but before returning it to the caller
          await _promise

          return new Promise((resolve, reject) => {
            // Create an id to track this call...
            const id = nanoid()
            let timeoutId

            if (timeout >= 0) {
              timeoutId = setTimeout(() => {
                try {
                  // Custom onTimeoutError handler can throw its own error too (Original comment)
                  options.onTimeoutError?.(method, args)
                  throw new Error(`[birpc] timeout on calling "${method}"`)
                } catch (e) {
                  reject(e)
                }
                // Interesting...so if there was a timeout, we remove the id from a promise map at the end
                rpcPromiseMap.delete(id)
              }, timeout).unref?.()
            }

            // Add to the promise map
            rpcPromiseMap.set(id, { resolve, reject, timeoutId })
            // Post!
            post(serialize(<Request>{ m: method, a: args, i: id, t: 'q' }))
          })
        }
        // Attach the event fn to asEvent
        sendCall.asEvent = sendEvent
        return sendCall
      },
    },
  ) as BirpcReturn<RemoteFunctions, LocalFunctions>

  // chrome ext that removes youtube warnings, notes, image search "meme"

  // Now we set the promise so we can call `on` whenever the rpc proxy trap is triggered
  _promise = on(async (data, ...extra) => {
    const msg = deserialize(data) as RPCMessage
    if (msg.t === 'q') {
      const { m: method, a: args } = msg
      let result, error: any
      const fn = resolver
        ? resolver(method, (functions as any)[method])
        : (functions as any)[method]

      if (!fn) {
        error = new Error(`[birpc] function "${method}" not found`)
      } else {
        try {
          result = await fn.apply(rpc, args)
        } catch (e) {
          error = e
        }
      }

      if (msg.i) {
        if (error && options.onError) options.onError(error, method, args)
        post(
          serialize(<Response>{ t: 's', i: msg.i, r: result, e: error }),
          ...extra,
        )
      }
    } else {
      const { i: ack, r: result, e: error } = msg
      const promise = rpcPromiseMap.get(ack)
      if (promise) {
        clearTimeout(promise.timeoutId)

        if (error) promise.reject(error)
        else promise.resolve(result)
      }
      rpcPromiseMap.delete(ack)
    }
  })

  return rpc
}
```
