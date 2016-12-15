/**
 * Created by benny on 17.11.16.
 */
import unexpected from "unexpected";
import normalizeMarkdown from "../normalizeMarkdown"
const expect = unexpected.clone()

const cases = [
  {
    description: 'Split spoilers',
    input: 'Lorem \n/// title\nmarkdowntext\n///\n ipsum',
    output: {
      normalized: 'Lorem \n§0§\n ipsum',
      elements: [{
        name: 'spoiler',
        title: 'title',
        content: {
          normalized: 'markdowntext',
          elements: []
        }
      }]
    }
  }, {
    description: 'split injections',
    input: 'Lorem \n>[alttext](url)\n ipsum',
    output: {
      normalized: 'Lorem \n§0§\n ipsum',
      elements: [{
        name: 'injection',
        alt: 'alttext',
        url: 'url'
      }]
    }
  }, {
    description: 'split images',
    input: 'Lorem ![image](url) ipsum',
    output: {
      normalized: 'Lorem §0§ ipsum',
      elements: [{
        name: 'image',
        alt: 'image',
        url: 'url'
      }]
    }
  }, {
    description: 'split images in spoilers',
    input: '/// title\nmarkdowntext with image ![image](url)\n///',
    output: {
      normalized: '§0§',
      elements: [{
        name: 'spoiler',
        title: 'title',
        content: {
          normalized: 'markdowntext with image §0§',
          elements: [{
            name: 'image',
            alt: 'image',
            url: 'url'
          }]
        }
      }]
    }
  }, {
    description: 'split multiple elements',
    input: 'some markdown text with image\n![image](url)\n some more markdown\n![image2](url2)',
    output: {
      normalized: 'some markdown text with image\n§0§\n some more markdown\n§1§',
      elements: [{
        name: 'image',
        alt: 'image',
        url: 'url'
      },{
        name: 'image',
        alt: 'image2',
        url: 'url2'
      }]
    }
  }
]

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(normalizeMarkdown(testcase.input), 'to equal', testcase.output)
    })
  })
})
