/**
 * Created by benny on 17.11.16.
 */

const createPlugins = ({normalized, elements}) => {
  const split = normalized.split(/(§\d+§)/).map((s) => s.trim()).filter((s) => s !== '')
  return split.map((markdown) => {
    var elementID = /§(\d+)§/.exec(markdown)
    if (elementID !== null) {
      return {
        cells: [createPluginCell(elements[elementID[1]])]
      }
    } else {
      return {
        cells: [{
          markdown: markdown
        }]
      }
    }
  })
}
const createPluginCell = (elem) => {
  switch (elem.name) {
    case 'spoiler':
      return {
        layout: {
          plugin: {
            name: 'ory/editor/core/layout/spoiler'
          },
          state: {
            title: elem.title
          }
        },
        rows: createPlugins(elem.content)
      }
    case 'injection':
      return {
        content: {
          plugin: {
            name: 'serlo/content/injection'
          },
          state: {
            alt: elem.alt,
            url: elem.url
          }
        }
      }
    case 'image':
      return {
        content: {
          plugin: {
            name: 'ory/editor/core/content/image'
          },
          state: {
            alt: elem.alt,
            src: elem.url
          }
        }
      }
  }
}

export default createPlugins
