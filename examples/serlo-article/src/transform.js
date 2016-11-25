/**
 * Created by benny on 24.11.16.
 */

const transform = (input) => ({
  cells: [{
    rows: input.map((row) => ({
      cells: getCellsFromRow(row)
    }))
  }]
})

const getCellsFromRow = (row) => row.map((cell) => ({
    size: Math.floor(cell.col / 2),
    raw: cell.content
  })
)

export default transform
