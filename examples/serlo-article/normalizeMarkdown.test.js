/**
 * Created by benny on 17.11.16.
 */
import unexpected from "unexpected";

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
  }
]
const normalizeMarkdown = (markdown) => {
  var normalizedObj = {
      normalized: markdown,
      elements: []
  }
  normalizedObj = extractSpoilers(normalizedObj)
  normalizedObj = extractInjections(normalizedObj)
  normalizedObj = extractImages(normalizedObj)

  return normalizedObj
}

const extractSpoilers = ({normalized,elements}) => {
  const spoilerRegEx = new RegExp(/^\/\/\/ (.*)\n([\s\S]*?)(\n|\r)+\/\/\//gm)

  var match = spoilerRegEx.exec(normalized)
  while (match !== null) {
    normalized = normalized.replace(spoilerRegEx, '§' + elements.length + '§')
    elements.push({
      name: 'spoiler',
      title: match[1],
      content: normalizeMarkdown(match[2])
    })

    match = spoilerRegEx.exec(normalized)
  }
  return {
    normalized: normalized,
    elements: elements
  }
}

const extractInjections = ({normalized,elements}) => {
  const injectionRegEx = new RegExp(/>\[(.*)\]\((.*)\)/g)
  var match = injectionRegEx.exec(normalized)
  while (match !== null) {
    normalized = normalized.replace(injectionRegEx, '§' + elements.length + '§')
    elements.push({
      name: 'injection',
      alt: match[1],
      url: match[2]
    })

    match = injectionRegEx.exec(normalized)
  }
  return {
    normalized: normalized,
    elements: elements
  }
}

const extractImages = ({normalized, elements}) => {
  const imagesRegEx = new RegExp(/!\[(.*?)\]\((.*?)\)/g)

  var match = imagesRegEx.exec(normalized)
  while (match !== null) {
    normalized = normalized.replace(imagesRegEx, '§' + elements.length + '§')
    elements.push({
      name: 'image',
      alt: match[1],
      url: match[2]
    })

    match = imagesRegEx.exec(normalized)
  }
  return {
    normalized: normalized,
    elements: elements
  }
}

export default normalizeMarkdown

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(normalizeMarkdown(testcase.input), 'to equal', testcase.output)
    })
  })
})
