import {List} from 'immutable'
import {testParser} from './test-helpers'
import {lines, nBlocks} from '../src/parser'

describe('simple', () => {
  it('simple', () => {
    testParser('simple', 'simple',
        List.of(
            nBlocks('a1', lines('b', 'c')),
            nBlocks('a2', lines('b', 'c')),
        ),
        {
          'a1': [
            {
              'b': 10,
              'c': 11,
            },
            {
              'b': 20,
              'c': 21,
            },
          ],
          'a2': [
            {
              'b': 30,
              'c': 31,
            },
          ],
        },
    )
  })
})
