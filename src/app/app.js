import React, {Component} from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header'
import MainNavigation from './components/Nav/MainNavigation'

export class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      local: 'en-US',
      theme: 'light'
    }
  }
  render(){
    return(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <MainNavigation />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
