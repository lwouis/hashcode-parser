import {List} from 'immutable'
import {testParser} from './test-helpers'
import {lines, nBlocks, nNumbers, line} from '../src/parser'

describe('2016-qualif', () => {
  it('example', () => {
    testParser('2016-qualif', 'example',
        List.of(
            lines('rows', 'columns', 'drones', 'turns', 'payload'),
            nNumbers('products', line('weigth')),
            nBlocks('warehouses', lines('x', 'y'), lines('nProduct0', 'nProduct1', 'nProduct2')),
            nBlocks('orders', lines('x', 'y'), nBlocks('items', lines('product'))),
        ),
        {
          'columns': 100,
          'drones': 3,
          'orders': [
            {'x': 1, 'y': 1, 'items': [{'product': 2}, {'product': 0}]},
            {'x': 3, 'y': 3, 'items': [{'product': 0}]},
            {'x': 5, 'y': 6, 'items': [{'product': 2}]},
          ],
          'payload': 500,
          'productWeight': [{'0': 100, '1': 5, '2': 450}],
          'rows': 100,
          'turns': 50,
          'warehouses': [
            {'x': 0, 'y': 0, 'nProduct0': 5, 'nProduct1': 1, 'nProduct2': 0},
            {'x': 5, 'y': 5, 'nProduct0': 0, 'nProduct1': 10, 'nProduct2': 2},
          ],
        },
    )
  })
})