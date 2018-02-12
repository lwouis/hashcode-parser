import {List, Map, Range} from 'immutable'

export interface ParsingMap extends Map<string, ParsingValue> {
}

export type Offset = number
export type ParsingValue = number | List<ParsingMap>
export type ParsingOutput = [Offset, ParsingMap]
export type ParsingNumbersOutput = [Offset, ParsingValue]
export type ParsingFunction = (...a: any[]) => ParsingOutput

export function line(name: string): (line: string) => ParsingNumbersOutput {
  return line => {
    const values = List(line.split(' ').map(x => parseInt(x)))
    return [0, List(values.map(x => Map.of(name, x)))]
  }
}

export function lines(...names: string[]): (lines: List<string>) => ParsingOutput {
  return lines => {
    const values = List(lines.get(0).split(' ').map(x => parseInt(x)))
    if (values.size !== names.length) {
      console.error(`Called line() with '${names}' but it doesn't match line with '${values}'`)
    }
    return [0, Map(List(names).zip(values))]
  }
}

export function nBlocks(name: string, ...f: ((...a: any[]) => ParsingOutput)[]): (lines: List<string>) => ParsingOutput {
  return lines => {
    const line0 = lines.get(0)
    if (line0 === undefined) {
      console.error(`nBlocks() couldn't find '${name}' because there are no lines to parse at this point`)
    }
    const n = parseInt(line0) * f.length
    if (n > lines.size - 1) {
      console.error(`nBlocks() found ${n} '${name}' but there aren't enough lines in '${lines}'`)
    }
    const maps = Range(1, n + 1).map(x => f[(x - 1) % f.length](lines.slice(x))[1])
    return [n, Map.of(name, maps)]
  }
}

export function nNumbers(name: string, f: (a: any) => ParsingNumbersOutput): (lines: List<string>) => ParsingOutput {
  return lines => {
    const line0 = lines.get(0)
    if (line0 === undefined) {
      console.error(`nNumbers() couldn't find '${name}' because there are no lines to parse at this point`)
    }
    const n = parseInt(line0)
    if (n > lines.size - 1) {
      console.error(`nNumbers() found ${n} '${name}' but there aren't enough lines in '${lines}'`)
    }
    const [offset, maps] = f(lines.get(1))
    return [offset, Map.of(name, maps)]
  }
}

export function parse(lines: List<string>, instructions: List<ParsingFunction>): any {
  const r = instructions.reduce(([offset, output], e) => {
    const [lastOffset, result] = e(lines.slice(offset))
    return [offset + lastOffset + 1, output.merge(result)] as ParsingOutput
  }, [0, Map()] as ParsingOutput)
  if (r[0] < lines.size - 1) {
    console.error(`parse() successfully parsed lines 0-${r[0] - 1} but ignored lines ${r[0]}-${lines.size - 1}`)
  }
  return r[1]
}