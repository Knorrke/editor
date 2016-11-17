/**
 * Created by benny on 17.11.16.
 */
// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import type { ContentPluginProps } from 'src/editor/service/plugin/classes'

import styles from './index.scoped.css'

export type PropTypes = ContentPluginProps<{ url: string, alt: string }>

const Injection = (props: PropTypes) => (
  <div styleName="injection">
    this is a placeholder for a real injection...
  </div>
)

export default cssModules(Injection, styles)
