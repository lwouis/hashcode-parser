import * as winston from 'winston'

type LoggerTransport = any
export type Logger = any

export enum LoggerOut {
  None,
  StdOut,
}

function transport(o: LoggerOut): LoggerTransport {
  // workaround: transports.Console ignores the silent flag, so transports.File is used
  if (o === LoggerOut.None) {
    return new winston.transports.File({filename: '/tmp', silent: true})
  } else if (o === LoggerOut.StdOut) {
    return new winston.transports.Console()
  }
}

export function logger(o: LoggerOut): Logger {
  return winston.createLogger({
    level: 'info',
    colorize: true,
    transports: [transport(o)],
  })
}
