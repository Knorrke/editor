/**
 * Created by benny on 24.11.16.
 */

import showdown from "showdown";

const renderMarkdown = (input) => {
  const converter = new showdown.Converter()
  return converter.makeHtml(input)
}
export default renderMarkdown
