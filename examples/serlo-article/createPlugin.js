/**
 * Created by benny on 17.11.16.
 */

const createPlugin = (elem) => {
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
        rows: [{
          cells: [{
            markdown: elem.content
          }]
        }]
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
            src: elem.url
          }
        }
      }
  }
}

export default createPlugin
