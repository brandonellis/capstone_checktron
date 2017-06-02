import React, {Component} from 'react'
import { hashHistory } from 'react-router'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import session from '../utils/session'
import store from '../utils/store'
import AutoComplete from 'material-ui/AutoComplete'

const style = {
  content: {
    overflowY: 'auto',
    position: 'fixed',
    top: 60,
    left: 0,
    bottom: 0,
    right: 0
  },
  table: {
    border: 'none'
  },
  colText: {
    border: 'none',
    whiteSpace: 'nowrap',
    width: '15%'
  },
  col: {
    border: 'none'
  }
}

export default class Login extends Component{
  constructor(props){
    super(props)
    var urlList = store.getUrl()
    this.state = {
      url: '',
      apiKey: '',
      urlList: urlList,
      apiKeyList: [],
      apiSecret: ''
    }
  }
  setAutoCompleteState(url, apiKey){
    var urlList = store.getUrl()
    var apiKeyList = store.getApiKey(url)
    var apiSecret = store.getApiSecret(url, apiKey)
    this.setState({
      url: (typeof url === 'string' ? url : ''),
      apiKey: (typeof apiKey === 'string' ? apiKey : ''),
      urlList: urlList,
      apiKeyList: apiKeyList,
      apiSecret: apiSecret
    })
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
            <div style={{padding: '0 20px'}}><table style={style.table}>
              <tbody>
                <tr>
                  <td style={style.colText}>
                    Base URL
                  </td>
                  <td style={style.col}>
                    <AutoComplete
                    name="url"
                      dataSource={this.state.urlList}
                      fullWidth={true}
                      onBlur={(e=>{this.setAutoCompleteState(e.target.value)})}
                    />
                  </td>
                  <td style={style.colText}>
                    .checkfront.com
                  </td>
                </tr>
                <tr>
                  <td style={style.colText}>
                    API Key
                  </td>
                  <td colSpan="2" style={style.col}>
                    <AutoComplete
                      name="apiKey"
                      key={this.state.url+'02'}
                      dataSource={this.state.apiKeyList}
                      fullWidth={true}
                      onBlur={(e=>{this.setAutoCompleteState(this.state.url, e.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={style.colText}>
                    API Secret
                  </td>
                  <td colSpan="2" style={style.col}>
                    <TextField
                      name='apiSecret'
                      key={this.state.apiKey+'03'}
                      defaultValue={this.state.apiSecret}
                      fullWidth={true}
                      onChange={(e=>{this.setState({apiSecret: e.target.value})})}
                    />
                  </td>
                </tr>
              </tbody>
            </table></div>
            <div style={{padding: 15}}>
              <RaisedButton label="Submit" style={{margin: 0}}
                onTouchTap={(e=>{
                  session.logIn(this.state.url, this.state.apiKey, this.state.apiSecret, (loggedIn)=>{
                    if(loggedIn){
                      store.setAuth(this.state.url, this.state.apiKey, this.state.apiSecret)
                      this.setState({error: undefined})
                      hashHistory.push('dashboard')
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
