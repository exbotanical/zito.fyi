/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { isLocalRuntime } from '@/utils'

import pkg from '../../../package.json'

// TODO: Get rid of this thing
export class Logger {
  private readonly transport = console
  private readonly baseFormat = `font-weight:bold;padding:6px;border:solid 1px white;border-radius:3px;`

  info(...args: any[]) {
    this.log('info', '#5f57a5', ...args)
  }

  success(...args: any[]) {
    this.log('info', '#abd67a', ...args)
  }

  warn(...args: any[]) {
    this.log('info', '#ffbd5b', ...args)
  }

  error(...args: any[]) {
    this.log('error', '#fc3a6b', ...args)
  }

  private log(method: 'error' | 'info' | 'log', hex: string, ...args: any[]) {
    if (!isLocalRuntime) {
      return
    }

    const callable = this.transport[method]

    callable(
      `%c${pkg.name}`,
      `${this.baseFormat}background:${hex}`,
      '\n\n',
      ...args,
    )
  }
}
