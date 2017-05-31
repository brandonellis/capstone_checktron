import React, {Component} from 'react'
import { hashHistory } from 'react-router'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import session from '../utils/session'

const style = {
  content:{
    overflowY: 'auto',
    position: 'fixed',
    top: 60,
    left: 0,
    bottom: 0,
    right: 0
  },
}

export default class Login extends Component{
  constructor(props){
    super(props)
    this.state = {url: '', user: '', pass: ''}
  }

  render(){
    return(
      <div style={style.content}>
        <div className='container' style={{paddingTop: 40}}>
          <Paper zDepth={2}>
            <Divider />
            <div style={{padding: 15}}>
              <h2 style={{margin: 0, padding: 0}}>Token Authentication&nbsp;&nbsp;&nbsp;
              {typeof this.state.error === 'string' &&
                <span style={{fontSize: '85%', color: '#D22'}}>
                  {this.state.error}
                </span>
              }</h2>
            </div>
            <Divider />
            <TextField
              hintText="Base URL, https://___________.checkfront.com/"
              style={{marginLeft: 20}}
              underlineShow={false}
              fullWidth={true}
              onChange={(e=>{this.setState({url: e.target.value})})}
            />
            <Divider />
            <TextField
              hintText="API Key"
              style={{marginLeft: 20}}
              underlineShow={false}
              fullWidth={true}
              onChange={(e=>{this.setState({user: e.target.value})})}
            />
            <Divider />
            <TextField
              hintText="API Secret"
              style={{marginLeft: 20}}
              underlineShow={false}
              fullWidth={true}
              onChange={(e=>{this.setState({pass: e.target.value})})}
            />
            <Divider />
            <div style={{padding: 15}}>
              <RaisedButton label="Submit" style={{margin: 0}}
                onTouchTap={(e=>{
                  session.logIn(this.state.url, this.state.user, this.state.pass, (loggedIn)=>{
                    if(loggedIn){
                      this.setState({error: undefined})
                      hashHistory.push('/')
                    }
                    else
                      this.setState({error: 'Connection to API Failed'})
                  })
                })} />
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}
