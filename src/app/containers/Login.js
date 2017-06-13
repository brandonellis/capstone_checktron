import React, {Component} from 'react'
import { hashHistory } from 'react-router'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import session from '../utils/session'
import store from '../utils/store'
import AutoComplete from 'material-ui/AutoComplete'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';

const style = {
  content: {
    overflowY: 'auto',
    position: 'fixed',
    top: 60,
    left: 0,
    bottom: 0,
    right: 0,
  },
  table: {
    border: 'none'
  },
  baseURL: {
    width: "200px",
  },
  endURL: {
    border: 'none',
    textAlign:'right',
    paddingRight: '1px',
    paddingLeft:'1px',
    width:'100px',
    fontSize:"16px",
    color: "#6d6d6d",
  },
  colText: {
    border: 'none',
    paddingRight: '1px',
    paddingLeft: '1px',
    width: '80px',
    fontSize:"16px",
    color: "#6d6d6d",
  },
  col: {
    border: 'none',
    paddingLeft: '1px',
    paddingRight: '1px',
    width: '35%',
  },
  checkfrontLogo: {
      height:"40px",
      width:"218px",
      margin: "0",
      position: "absolute",
      top:"50%",
      left:"50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
  },
  submitButton: {
      margin: "0",
      position: "absolute",
      top:"50%",
      left:"50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
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
        <div className='container' style={{paddingTop: "40", width: "500px"}}>
          <Paper zDepth={2}>
            <Divider />
            <div style={{height:"75px",position:"relative",backgroundColor:"#f8f8f8",borderBottom:"1px solid #e5e5e5"}}>
              <img style={style.checkfrontLogo} src="images/checkfront_color.png"></img>
            </div>
            <div style={{padding: 15}}>
              <h2 style={{margin: 0, padding: 0, paddingTop: '10px'}}>
              {typeof this.state.error === 'string' &&
                <span style={{fontSize: '85%', color: '#D22'}}>
                  {this.state.error}
                </span>
              }</h2>
            </div>
            <div style={{padding: "0 20px",fontWeight:"bold"}}>
              <Table style={style.table}>
              <TableBody displayRowCheckbox={false}>
                <TableRow style={style.baseURL} displayBorder={false} selectable={false}>
                  <TableRowColumn style={style.colText}>Base URL</TableRowColumn>
                  <TableRowColumn style={style.col}>
                    <AutoComplete
                      name="url"
                      dataSource={this.state.urlList}
                      fullWidth={true}
                      onBlur={(e=>{this.setAutoCompleteState(e.target.value)})}
                    />
                  </TableRowColumn>
                  <TableRowColumn style={style.endURL}>
                    .checkfront.com
                  </TableRowColumn>
                </TableRow>

                <TableRow displayBorder={false} selectable={false}>
                  <TableRowColumn style={style.colText}>API Key</TableRowColumn>
                  <TableRowColumn colSpan="2" style={style.col}>
                    <AutoComplete
                      name="apiKey"
                      key={this.state.url+'02'}
                      dataSource={this.state.apiKeyList}
                      fullWidth={true}
                      onBlur={(e=>{this.setAutoCompleteState(this.state.url, e.target.value)})}
                    />
                  </TableRowColumn>
                </TableRow>

                <TableRow displayBorder={false} selectable={false}>
                  <TableRowColumn style={style.colText}>API Secret</TableRowColumn>
                  <TableRowColumn colSpan="2" style={style.col}>
                    <TextField
                      name='apiSecret'
                      key={this.state.apiKey+'03'}
                      defaultValue={this.state.apiSecret}
                      fullWidth={true}
                      onChange={(e=>{this.setState({apiSecret: e.target.value})})}
                    />
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
            </div>
            <div style={{height:'80px',position:'relative'}}>
              <RaisedButton label="Submit" style={style.submitButton}
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
