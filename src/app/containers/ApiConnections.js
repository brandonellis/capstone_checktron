import React, { Component } from 'react'
import store from '../utils/store'
import Delete from 'material-ui/svg-icons/action/delete';

const style = {
  container:{
    overflowY: 'auto',
    position: 'fixed',
    top: 60,
    left: 0,
    bottom: 0,
    right: 0
  },
}
export default class ApiConnections extends Component{
  constructor(props){
    super(props)
    this.state = {urlList : store.getUrl()}
  }
  render(){
    return(
      <div style={style.container}>
        <div className="container">
          <h2>ApiConnections</h2>
          <table>
            <tbody>
              {this.state.urlList.map(url=>{
                return store.getApiKey(url).map(key=>{
                  return (
                    <tr key={key}>
                      <td>
                        {url}
                      </td>
                      <td>
                        {key}
                      </td>
                      <td>
                        <a href='#' onClick={e=>{
                          e.preventDefault()
                          store.removeApiKey(url, key)
                          this.setState({urlList : store.getUrl()})
                        }}>
                          <Delete />
                        </a>
                      </td>
                    </tr>
                  )
                })
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
