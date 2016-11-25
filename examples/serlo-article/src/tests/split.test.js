/* eslint-env jest */
import unexpected from "unexpected";
import split from "../split";

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
                    alt: 'image',
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
    description: 'Layout with image in spoiler',
    input: {
      cells: [{
        rows: [{
          cells: [{size: 12, raw: '/// title\nmarkdowntext with image ![image](url)\n///'}]
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
                }, rows: [{
                  cells: [{
                    markdown: 'markdowntext with image'
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
                }]
              }]
            }]
          }]
        }]
      }]
    }
  }
]

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(split(testcase.input), 'to equal', testcase.output)
    })
  })
})

