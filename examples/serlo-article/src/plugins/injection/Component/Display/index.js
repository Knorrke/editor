/**
 * Created by Benjamin Knorr on 17.11.16.
 */
// @flow
import React, {Component} from 'react'
import request from 'superagent'
import responses from '../../../../9833.json.js'
import ImageIcon from 'material-ui/svg-icons/image/panorama'

export type PropTypes = {
  state: { url: string, alt: string }
}

class Display extends Component {
  state = {
    loaded: null
  }

  props: PropTypes

  render() {
    if (this.state.loaded) {
      return (
        <div styleName="injection" dangerouslySetInnerHTML={{__html: this.state.loaded}}>
        </div>
      )
    } else if (this.props.state.url) {
      const {url, alt} = this.props.state
      request.get(url).end((err, res) => {
        if (err) {
          this.setState({
            loaded: <div styleName="injection">{alt}</div>
          })
        } else {
          responses.forEach(({id, response}) => {
            if ("/" + id === url) {
              this.setState({loaded: response})
            }
          })
          //this.setState({loaded: res.text})
          return true;
        }
      })


      return <div styleName="injection">
        <a href={url}>{alt}</a>
      </div>
    }else {
      return <div styleName="injection">
        <ImageIcon />
        </div>
    }
  }
}

export default Display
