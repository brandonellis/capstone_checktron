import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import session from '../../utils/session'

const style = {
  height: 'auto',
  width: 60,
  margin: 2,
  textAlign: 'center',
  display: 'inline-block',
  verticalAlign: 'top'
}

export class Image extends Component{
  getSrc(){
    if(session.url){
      if(this.props.giftCert) return session.url + 'images/giftcertificate.png'
      if(typeof(this.props.image) === 'object'){
        for(var key in this.props.image){
          return session.url + "media/S" + this.props.image[key].src + ".jpg"
        }
      }
    }
    return 'images/Checkfront.jpg'
  }
  render(){

    return (
      <Paper
        style={style}
        zDepth={2}
      >
      <img
        src={this.getSrc()}
        style={{width: '100%'}}
      />
      </Paper>
    )
  }
}

export default Image
