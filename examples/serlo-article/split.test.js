/* eslint-env jest */
import unexpected from "unexpected";
import normalizeMarkdown from "./normalizeMarkdown.test"
import createPlugin from "./createPlugin"

const expect = unexpected.clone()

const cases = [
  {
    description: 'Simple Layout no split',
    input: {
      cells: [{
        rows: [{
          cells: [{size: 12, raw: 'Lorem ipsum'}]
        }, {
          cells: [{size: 12, raw: 'dolor adipiscing amet'}]
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
                markdown: 'Lorem ipsum'
              }]
            }]
          }]
        }, {
          cells: [{
            size: 12,
            rows: [{
              cells: [{
                markdown: 'dolor adipiscing amet'
              }]
            }]
          }]
        }]
      }]
    }
  }, {
    description: 'Layout with block element',
    input: {
      cells: [{
        rows: [{
          cells: [{size: 12, raw: 'Lorem \n![image](url)\n ipsum'}]
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
                markdown: 'Lorem'
              }, {
                content: {
                  plugin: {
                    name: 'ory/editor/core/content/image'
                  },
                  state: {
                    src: 'url'
                  }
                }
              }, {
                markdown: 'ipsum'
              }]
            }]
          }]
        }]
      }]
    }
  }, {
    description: 'Layout with spoiler',
    input: {
      cells: [{
        rows: [{
          cells: [{size: 12, raw: 'Lorem \n/// title\nmarkdowntext\n///\n ipsum'}]
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
                markdown: 'Lorem'
              }, {
                layout: {
                  plugin: {
                    name: 'ory/editor/core/layout/spoiler'
                  },
                  state: {
                    title: 'title'
                  }
                }, rows: [{
                  cells: [{
                    markdown: 'markdowntext'
                  }]
                }]
              }, {
                markdown: 'ipsum'
              }]
            }]
          }]
        }]
      }]
    }
  }, {
    description: 'Layout with injection',
    input: {
      cells: [{
        rows: [{
          cells: [{size: 12, raw: 'Lorem \n>[alttext](url)\n ipsum'}]
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
                markdown: 'Lorem'
              }, {
                content: {
                  plugin: {
                    name: 'serlo/content/injection'
                  },
                  state: {
                    alt: 'alttext',
                    url: 'url'
                  }
                }
              }, {
                markdown: 'ipsum'
              }]
            }]
          }]
        }]
      }]
    }
  }
]

const split = (input) => {
  return {
    cells: input.cells.map((cell) => splitCell(cell))
  }
}

const splitCell = (cell) => {
  if (cell.raw !== undefined) {
    const split = splitMarkdown(cell.raw)

    const cells = split.splittedMarkdown.map((markdown) => {
      var match = /§(\d+)§/.exec(markdown)
      if (match !== null) {
        return createPlugin(split.elements[match[1]])
      } else {
        return {
          markdown: markdown
        }
      }
    })

    return {
      size: cell.size,
      rows: [{
        cells: cells
      }]
    }
  } else {
    return {
      size: cell.size,
      rows: cell.rows.map((row) => splitRow(row))
    }
  }
}

const splitRow = (row) => {
  return {
    cells: row.cells.map((cell) => splitCell(cell))
  }
}

const splitMarkdown = (markdown) => {
  const normalized = normalizeMarkdown(markdown),
    split = normalized.normalized.split(/(§\d+?§)/)

  return {
    splittedMarkdown: split.map((elem) => elem.trim()),
    elements: normalized.elements
  }
}

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(split(testcase.input), 'to equal', testcase.output)
    })
  })
})

