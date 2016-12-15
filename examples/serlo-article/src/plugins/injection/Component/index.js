// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import styles from './index.scoped.css'
import Display from './Display'
import Form from './Form'
import type { ContentPluginProps } from 'src/editor/service/plugin/classes'

export type PropTypes = ContentPluginProps<{ url: string, alt: string }>

const Injection = (props: PropTypes) => props.readOnly ? (
  <Display {...props} />
) : (
  <Form {...props} />
)

export default cssModules(Injection, styles, { allowMultiple: true })
