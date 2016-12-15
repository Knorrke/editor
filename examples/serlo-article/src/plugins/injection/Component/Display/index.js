/**
 * Created by Benjamin Knorr on 17.11.16.
 */
// @flow
import React, {Component} from 'react'
import debounce from 'lodash.debounce'
import request from 'superagent'
import responses from '../../../../9833.json.js'
import ImageIcon from 'material-ui/svg-icons/image/panorama'
import { isProduction } from 'src/editor/const'

export type PropTypes = {
  state: { url: string, alt: string }
}

class Display extends Component {
  constructor(props: PropTypes) {
    super(props)
    this.createRequest = debounce(this.createRequest, 500)
  }

  state = {
    loaded: null
  }

  props:PropTypes

  componentDidMount() {
    if (!this.state.loaded && this.props.state.url) {
      this.createRequest(this.props.state)
    }
  }

  createRequest = ({url, alt}) => {
    request.get(url).end((err, res) => {
      if (err) {
        this.setState({
          loaded: <div styleName="injection">{alt}</div>
        })
      } else {
        if (isProduction) {
          this.setState({loaded: res.text})
        } else {
          responses.forEach(({id, response}) => {
            if ("/" + id === url) {
              this.setState({loaded: response})
            }
          })
        }
        return true;
      }
    })
  }

  componentWillReceiveProps(nextProps:PropTypes) {
    if (this.props.state.url !== nextProps.state.url) {
      this.createRequest(nextProps.state)
    }
  }
  render() {
    return this.state.loaded ? (
      <div styleName="injection" dangerouslySetInnerHTML={{__html: this.state.loaded}}>
      </div>
    ) : (
      <div styleName="injection">
        <ImageIcon />
      </div>
    )
  }
}

export default Display
