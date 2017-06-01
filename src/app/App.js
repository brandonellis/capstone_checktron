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
      theme: 'light'
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
  render(){
    var nav = [<LoginNavigation key='nav0' />]
    if(this.props.children.props.location.pathname !== '/'){
      session.loggedIn((loggedIn)=>{
       if(!loggedIn)
         hashHistory.push('/')
      })
      nav = [<MainNavigation key='nav1' />]
    }
    return(
      <MuiThemeProvider muiTheme={
        getMuiTheme({
          palette: {
            //some text
            primary1Color: blue500,
            //datepicker background
            primary2Color: blue500,
          },
        })
      }>
        <div>
          {nav}
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
