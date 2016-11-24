/**
 * Created by benny on 24.11.16.
 */
import unexpected from "unexpected";
import renderMarkdown from "./markdownToHtml.test";

const expect = unexpected.clone()

const cases = [
  {
    description: 'Transform multiple cells to slate',
    input: {
      cells: [{
        rows: [{
          cells: [{
            size: 12,
            rows: [{
              cells: [{
                layout: {
                  plugin: {
                    name: 'ory/editor/core/layout/spoiler'
                  },
                  state: {
                    title: 'title'
                  }
                },
                rows: [{
                  cells: [{
                    markdown: '# header'
                  }]
                }, {
                  cells: [{
                    content: {
                      plugin: {
                        name: 'ory/editor/core/content/image'
                      },
                      state: {
                        alt: 'image',
                        src: 'url'
                      }
                    }
                  }]
                }, {
                  cells: [{
                    markdown: '**bold text**'
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    },
    output: {
      cells: [{
        rows: [{
          cells: [{
            size: 12,
            rows: [{
              cells: [{
                layout: {
                  plugin: {
                    name: 'ory/editor/core/layout/spoiler'
                  },
                  state: {
                    title: 'title'
                  }
                },
                rows: [{
                  cells: [{
                    content: {
                      plugin: {name: 'ory/editor/core/content/slate'},
                      state: {
                        importFromHtml: '<h1 id="header">header</h1>'
                      }
                    }
                  }]
                }, {
                  cells: [{
                    content: {
                      plugin: {
                        name: 'ory/editor/core/content/image'
                      },
                      state: {
                        alt: 'image',
                        src: 'url'
                      }
                    }
                  }]
                }, {
                  cells: [{
                    content: {
                      plugin: {name: 'ory/editor/core/content/slate'},
                      state: {
                        importFromHtml: '<p><strong>bold text</strong></p>'
                      }
                    }
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }
  }
]

const markdownToSlate = (input) => ({
  ...input,
  cells: input.cells.map(renderCell)
})

const renderCell = (cell) => {
  const {rows = []} = cell

  if (cell.markdown) {
    return {
      content: {
        plugin: {name: 'ory/editor/core/content/slate'},
        state: {
          importFromHtml: renderMarkdown(cell.markdown)
        }
      }
    }
  } else if (rows.length > 0) {
    return {
      ...cell,
      rows: rows.map(renderRow)
    }
  }
  return cell
}

const renderRow = (row) => ({
  ...row,
  cells: row.cells.map(renderCell)
})

export default markdownToSlate

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(markdownToSlate(testcase.input), 'to equal', testcase.output)
    })
  })
})
