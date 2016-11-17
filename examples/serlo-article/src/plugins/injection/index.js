// @flow
import React from 'react'
import Component from './Component'
import Panorama from 'material-ui/svg-icons/toggle/star'
import { ContentPlugin } from 'src/editor/service/plugin/classes'

export default class Injection extends ContentPlugin {
  Component = Component
  name = 'serlo/content/injection'
  version = '0.0.1'
  icon = <Panorama />
  text = 'Injection'
}
