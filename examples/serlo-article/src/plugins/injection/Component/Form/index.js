// @flow
import React from 'react'
import Display from '../Display'
import TypeException from 'src/editor/exceptions/TypeException'
import type { PropTypes } from '../index.js'

import TextField from 'material-ui/TextField'
import BottomToolbar from 'src/editor/components/BottomToolbar'

const handleChange = (onChange: Function) => (e: Event) => {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    onChange({ url: target.value })
    return
  }

  throw new TypeException('target', 'HTMLInputElement', target)
}

const Form = (props: PropTypes) => (
  <div>
    <Display {...props} />
    <BottomToolbar open={props.focused}>
      <TextField
        hintText="/12345"
        floatingLabelText="Injection Element"
        inputStyle={{ color: 'white' }}
        floatingLabelStyle={{ color: 'white' }}
        hintStyle={{ color: 'grey' }}
        style={{ width: '512px' }}
        value={props.state.url}
        onChange={handleChange(props.onChange)}
      />
    </BottomToolbar>
  </div>
)

export default Form
