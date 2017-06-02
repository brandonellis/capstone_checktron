import React, { Component } from 'react'
import session from '../utils/session'
import RaisedButton from 'material-ui/RaisedButton'
import { hashHistory } from 'react-router'

export default class Dashboard extends Component{
  render(){
    return(
      <div>
        <h2>Dashboard</h2>
        <RaisedButton label="Log Out" style={{margin: 0}}
          onTouchTap={(e=>{
            session.logOut()
            hashHistory.push('/')
          })} />
      </div>
    )
  }
}
