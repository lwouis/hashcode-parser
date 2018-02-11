import {List} from 'immutable'
import {testParser} from './test-helpers'
import {line, nLines} from '../src/parser'

describe('simple', () => {
  it('simple', () => {
    testParser('simple', 'simple',
        List.of(
            nLines('a1', line('b', 'c')),
            nLines('a2', line('b', 'c')),
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
