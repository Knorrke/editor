/* eslint-env jest */
import unexpected from "unexpected";

const expect = unexpected.clone()

const cases = [
  {
    description: 'Simple Layout',
    input: {
      rows: [
        [{
          "col": 24, "content": "Lorem ipsum"
        }], [{
          "col": 24, "content": "dolor sit amet."
        }]
      ]
    },
    output: {
      cells: [{
        rows: [{
          cells: [{size: 12, raw: 'Lorem ipsum'}]
        }, {
          cells: [{size: 12, raw: 'dolor sit amet.'}]
        }]
      }]
    }
  },
  {
    description: 'Two-column layout',
    input: {
      rows: [
        [{
          "col": 12, "content": "Lorem ipsum"
        }, {
          "col": 12, "content": "dolor adipiscing amet"
        }]
      ]
    },
    output: {
      cells: [{
        rows: [{
          cells: [{size: 6, raw: 'Lorem ipsum'},
            {size: 6, raw: 'dolor adipiscing amet'}]
        }]
      }]
    }
  }, {
    description: 'Two-column layout with odd column size',
    input: {
      rows: [
        [{
          "col": 5, "content": "Lorem ipsum"
        }, {
          "col": 19, "content": "dolor adipiscing amet"
        }]
      ]
    },
    output: {
      cells: [{
        rows: [{
          cells: [{size: 2, raw: 'Lorem ipsum'},
            {size: 9, raw: 'dolor adipiscing amet'}]
        }]
      }]
    }
  }
]

const transform = (input) => {
  const transformed = input.rows.map((row) => {
    return {
      cells: getCellsFromRow(row)
    }
  })

  return {
    cells: [{
      rows: transformed
    }]
  }
}

const getCellsFromRow = (row) => {
  return row.map((cell) => {
    return {
      size: Math.floor(cell.col / 2),
      raw: cell.content
    }
  })
}

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(transform(testcase.input), 'to equal', testcase.output)
    })
  })
})
