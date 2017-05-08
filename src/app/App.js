import React, {Component} from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {blue500} from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainNavigation from './components/Nav/MainNavigation'
import Mousetrap from 'Mousetrap'
import { hashHistory } from 'react-router'

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
    Mousetrap.bind(['ctrl+b', 'command+b'], ()=>{hashHistory.push('booking')})
  }
  componentWillUnmount() {
    Mousetrap.unbind(['ctrl+i', 'command+i'])
    Mousetrap.unbind(['ctrl+b', 'command+b'])
  }
  render(){
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
          <MainNavigation />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
