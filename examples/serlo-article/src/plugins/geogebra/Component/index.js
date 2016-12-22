// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import Display from './Display'
import Form from './Form'
import type { ContentPluginProps } from 'src/editor/service/plugin/classes'

export type PropTypes = ContentPluginProps<{ src: string, alt: string }>

const Geogebra = (props: PropTypes) => props.readOnly ? (
  <Display {...props} />
) : (
  <Form {...props} />
)

export default cssModules(Geogebra, {}, { allowMultiple: true })
