import { PluginService, defaultLayoutPlugins, defaultContentPlugins } from 'src/editor/service'
import InjectionPlugin from './plugins/injection'
import Geogebra from './plugins/geogebra'
import React from 'react'
import ReactDOM from 'react-dom'
import Editor, { Editable, Controls } from 'src/editor'
import content from './content.js'

require('react-tap-event-plugin')()

const editor = new Editor({
  plugins: new PluginService([
    ...defaultContentPlugins,
    InjectionPlugin,
    Geogebra
  ], defaultLayoutPlugins)
})

const elements = document.querySelectorAll('.editable')
for (const element of elements) {
  ReactDOM.render((
    <Editable
      editor={editor}
      state={content}
      // onChange={(state) => console.log(state)}
    />
  ), element)
}

ReactDOM.render(<Controls editor={editor} />, document.getElementById('controls'))
