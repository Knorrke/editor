/**
 * Created by benny on 24.11.16.
 */
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
  const spoilerRegEx = new RegExp(/^\/\/\/ (.*)\n([\s\S]*?)(\n|\r)+\/\/\//m)

  var match = spoilerRegEx.exec(normalized)
  while (match !== null) {
    normalized = normalized.replace(spoilerRegEx, '§' + elements.length + '§')

    elements = [...elements, {
      name: 'spoiler',
      title: match[1],
      content: normalizeMarkdown(match[2])
    }]

    match = spoilerRegEx.exec(normalized)
  }
  return {
    normalized: normalized,
    elements: elements
  }
}

const extractInjections = ({normalized,elements}) => {
  const injectionRegEx = new RegExp(/>\[(.*)\]\((.*)\)/)
  var match = injectionRegEx.exec(normalized)
  while (match !== null) {
    normalized = normalized.replace(injectionRegEx, '§' + elements.length + '§')
    elements = [...elements, {
      name: 'injection',
      alt: match[1],
      url: match[2]
    }]

    match = injectionRegEx.exec(normalized)
  }
  return {
    normalized: normalized,
    elements: elements
  }
}

const extractImages = ({normalized, elements}) => {
  const imagesRegEx = new RegExp(/!\[(.*?)\]\((.*?)\)/)
  var match = imagesRegEx.exec(normalized)
  while (match !== null) {
    normalized = normalized.replace(imagesRegEx, '§' + elements.length + '§')
    elements = [...elements, {
      name: 'image',
      alt: match[1],
      url: match[2]
    }]

    match = imagesRegEx.exec(normalized)
  }
  return {
    normalized: normalized,
    elements: elements
  }
}

export default normalizeMarkdown
