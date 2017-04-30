import React, {Component} from 'react'
import Header from './components/Header'

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
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default App
