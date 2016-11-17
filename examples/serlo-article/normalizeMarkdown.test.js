/**
 * Created by benny on 17.11.16.
 */
import unexpected from "unexpected";

const expect = unexpected.clone()

const normalizeMarkdown = (markdown) => {
  const spoilerRegEx = new RegExp(/^\/\/\/ (.*)\n([\s\S]*?)(\n|\r)+\/\/\//gm),
    injectionRegEx = new RegExp(/>\[(.*)\]\((.*)\)/g),
    imagesRegEx = new RegExp(/!\[(.*?)\]\((.*?)\)/g),
    elements = []
  var normalized = markdown,
    index = 0

  //Spoilers
  var match = spoilerRegEx.exec(normalized)
  while (match !== null) {
    elements.push({
      name: 'spoiler',
      title: match[1],
      content: match[2]
    })

    normalized = normalized.replace(spoilerRegEx, '§' + index + '§')

    index++
    match = spoilerRegEx.exec(normalized)
  }

  //Injections
  match = injectionRegEx.exec(normalized)
  while (match !== null) {
    elements.push({
      name: 'injection',
      alt: match[1],
      url: match[2]
    })

    normalized = normalized.replace(injectionRegEx, '§' + index + '§')
    index++
    match = injectionRegEx.exec(normalized)
  }

  //Images
  match = imagesRegEx.exec(normalized)
  while (match !== null) {
    elements.push({
      name: 'image',
      alt: match[1],
      url: match[2]
    })

    normalized = normalized.replace(imagesRegEx, '§' + index + '§')
    index++
    match = imagesRegEx.exec(normalized)
  }

  return {
    normalized: normalized,
    elements: elements
  }
}

export default normalizeMarkdown

describe('normalize markdown', () => {
  it('should split spoilers correctly', () => {
    expect(normalizeMarkdown('Lorem \n/// title\nmarkdowntext\n///\n ipsum'), 'to equal',
      {
        normalized: 'Lorem \n§0§\n ipsum',
        elements: [{
          name: 'spoiler',
          title: 'title',
          content: 'markdowntext'
        }]
      }
    )
  })

  it('should split injections correcctly', () => {
    expect(normalizeMarkdown('Lorem \n>[alttext](url)\n ipsum'), 'to equal',
      {
        normalized: 'Lorem \n§0§\n ipsum',
        elements: [{
          name: 'injection',
          alt: 'alttext',
          url: 'url'
        }]
      }
    )
  })
})
