import React, {Component} from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {blue500} from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainNavigation from './components/Nav/MainNavigation'
import LoginNavigation from './components/Nav/LoginNavigation'
import Mousetrap from 'Mousetrap'
import { hashHistory } from 'react-router'
import session from './utils/session'


export class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      local: 'en-US',
      theme: 'light',
      connected: false,
    }
  }
  componentDidMount() {
    Mousetrap.bind(['ctrl+i', 'command+i'], ()=>{hashHistory.push('index')})
    Mousetrap.bind(['ctrl+n', 'command+n'], ()=>{hashHistory.push('booking')})
  }
  componentWillUnmount() {
    Mousetrap.unbind(['ctrl+i', 'command+i'])
    Mousetrap.unbind(['ctrl+n', 'command+n'])
  }
  nav(){
    if(this.state.connected) return <MainNavigation key='nav1' />
    return <LoginNavigation key='nav0' />
  }
  render(){
    //checks if this page can be accessed without an api connection
    session.loggedIn((loggedIn)=>{
      if(!loggedIn && this.props.location.pathname !== '/' && this.props.location.pathname !== '/api_connections' && this.props.location.pathname !== 'api_connections'){
        console.log(this.props.location.pathname)
        hashHistory.push('/')
      }
      if(loggedIn != this.state.connected)
        this.setState({connected: loggedIn})
    })
    return(
      <MuiThemeProvider muiTheme={
        getMuiTheme({
          palette: {
            primary1Color: blue500,
            primary2Color: blue500,
          },
          raisedButton: {
            color: blue500,
            textColor: 'white',
          }
        })
      }>
        <div>
          {this.nav()}
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
