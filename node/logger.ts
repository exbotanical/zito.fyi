/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Console } from 'console'
import { Writable } from 'stream'

type ValueOf<T> = T[keyof T]

export class StreamLogger extends Console {
  private readonly colors = {
    BGBLACK: '\x1b[40m',
    BGBLUE: '\x1b[44m',
    BGCYAN: '\x1b[46m',
    BGGREEN: '\x1b[42m',
    BGMAGENTA: '\x1b[45m',
    BGRED: '\x1b[41m',
    BGWHITE: '\x1b[47m',
    BGYELLOW: '\x1b[43m',
    BLINK: '\x1b[5m',
    BRIGHT: '\x1b[1m',
    DIM: '\x1b[2m',
    FGBLACK: '\x1b[30m',
    FGBLUE: '\x1b[34m',
    FGCYAN: '\x1b[36m',
    FGGREEN: '\x1b[32m',
    FGMAGENTA: '\x1b[35m',
    FGRED: '\x1b[31m',
    FGWHITE: '\x1b[37m',
    FGYELLOW: '\x1b[33m',
    HIDDEN: '\x1b[8m',
    RESET: '\x1b[0m',
    REVERSE: '\x1b[7m',
    UNDERSCORE: '\x1b[4m'
  }

  constructor() {
    super({
      colorMode: false,

      stderr: new Writable({
        write(data, _, next) {
          process.stdout.write(data)

          next()
        }
      }),

      stdout: new Writable({
        write(data, _, next) {
          process.stdout.write(data)
          next()
        }
      })
    })
  }

  static init() {
    globalThis.console = new StreamLogger()
  }

  log(...data: any[]) {
    this.print('log', ...data)
  }

  warn(...data: any[]) {
    this.print('warn', ...data)
  }

  error(...data: any[]) {
    this.print('error', ...data)
  }

  private buildStr(
    fg: ValueOf<StreamLogger['colors']>,
    bg = this.colors.FGWHITE
  ) {
    const dateColor = this.colors.FGMAGENTA

    return `${dateColor}[%s] ${fg}${bg}%s`
  }

  private print(type: 'error' | 'log' | 'warn', ...data: any[]) {
    let bg: ValueOf<StreamLogger['colors']>

    switch (type) {
      case 'warn':
        bg = this.colors.BGYELLOW
        break
      case 'error':
        bg = this.colors.BGRED
        break
      default:
        bg = this.colors.BGGREEN
        break
    }

    const colorConfig = this.buildStr(bg, this.colors.FGBLACK)

    super[type](
      colorConfig,
      new Date().toLocaleTimeString(),
      ...data,
      this.colors.RESET
    )
  }
}
