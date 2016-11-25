/**
 * Created by benny on 24.11.16.
 */
import normalizeMarkdown from "./normalizeMarkdown"
import createPlugins from "./createPlugin"

const split = (input) => ({
  ...input,
  cells: input.cells.map(splitCell)
})

const splitCell = (cell) => {
  if (cell.raw) {
    return {
      size: cell.size,
      rows: [{
        cells: splitMarkdown(cell.raw)
      }]
    }
  } else {
    const {rows = []} = cell
    return {
      ...cell,
      rows: rows.map(splitRow)
    }
  }
}

const splitRow = (row) => ({
  ...row,
  cells: row.cells.map(splitCell)
})

const splitMarkdown = (markdown) => createPlugins(normalizeMarkdown(markdown))

export default split
