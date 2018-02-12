import {createInterface, ReadLine} from 'readline'
import {createReadStream, readFileSync} from 'fs'
import {List} from 'immutable'
import {parse, ParsingFunction} from '../src/parser'

function inputFile(folder: string, file: string): string {
  return `${__dirname}/${folder}.input/${file}.in`
}

function lineStream(folder: string, file: string): ReadLine {
  const stream = createInterface(createReadStream(inputFile(folder, file)))
  stream.on('close', () => {
    process.exit(0)
  })
  return stream
}

export function testParser(folder: string, file: string, instructions: List<ParsingFunction>, expected: Object): void {
  const input = List(readFileSync(inputFile(folder, file), 'utf-8').split(/\r?\n/))
  expect(parse(input, instructions).toJSON()).toEqual(expected)
}