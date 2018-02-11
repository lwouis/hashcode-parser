import {List, Map, Range} from 'immutable'

export interface ParsingMap extends Map<string, ParsingValue> {
}

export type Offset = number
export type ParsingValue = number | List<ParsingMap>
export type ParsingOutput = [Offset, ParsingMap]
export type ParsingFunction = (...a: any[]) => ParsingOutput

export function line(...names: string[]): (line: string) => ParsingMap {
  return line => {
    const values = List(line.split(' ').map(x => parseInt(x)))
    if (values.size !== names.length) {
      console.error(`Called line() with '${names}' but it doesn't match line with '${values}'`)
    }
    return Map(List(names).zip(values))
  }
}

export function nLines(name: string, f: (...a: any[]) => ParsingMap): (lines: List<string>) => ParsingOutput {
  return lines => {
    let line0 = lines.get(0)
    if (line0 === undefined) {
      console.error(`nLines() couldn't find '${name}' because there are no lines to parse at this point`)
    }
    const n = parseInt(line0)
    if (n > lines.size - 1) {
      console.error(`nLines() found ${n} '${name}' but there isn't enough lines in '${lines}'`)
    }
    return [n, Map.of(name, Range(1, n + 1).map(x => f(lines.get(x))))]
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