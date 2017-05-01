import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import {config} from '../../config/config'

const style = {
  height: 60,
  width: 60,
  margin: 2,
  textAlign: 'center',
  display: 'inline-block',
  verticalAlign: 'top'
}

export class Image extends Component{
  getSrc(){
    if(typeof(this.props.image) === 'object'){
      for(var key in this.props.image){
        return <img
          src={config.api.base + "media/S" + this.props.image[key].src + ".jpg"}
          style={{width: '100%'}}
        />
      }
    }
  }
  render(){
    return (
      <Paper style={style} zDepth={2}>
        {this.getSrc()}
      </Paper>
    )
  }
}

export default Image
