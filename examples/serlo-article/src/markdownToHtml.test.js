/**
 * Created by benny on 24.11.16.
 */

import unexpected from "unexpected";
import showdown from "showdown";

const expect = unexpected.clone()

const cases = [
  {
    description: 'Showdown renders markdown as expected',
    input: '# header \n\n**bold text**',
    output: '<h1 id="header">header</h1>\n<p><strong>bold text</strong></p>'
  }
]

const renderMarkdown = (input) => {
  const converter = new showdown.Converter()
  return converter.makeHtml(input)
}
export default renderMarkdown

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(renderMarkdown(testcase.input), 'to equal', testcase.output)
    })
  })
})
