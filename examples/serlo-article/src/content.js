/**
 * Created by benny on 24.11.16.
 */
import contentSerlo from "./content.serlo.json"
import transform from "./transform"
import split from "./split"
import markdownToSlate from "./markdownToSlate"

const cells = markdownToSlate(split(transform(contentSerlo)))
const content = {
  id: '1',
  ...cells
}

console.log(markdownToSlate(split(transform(contentSerlo))))

export default content
