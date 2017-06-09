import React, { Component } from 'react'
import store from '../utils/store'
import Delete from 'material-ui/svg-icons/action/delete'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'


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
          <h1>ApiConnections</h1>
          <Table style={{border:'1px solid #ddd'}}>
            <TableBody displayRowCheckbox={false}>
              {this.state.urlList.map(url=>{
                return store.getApiKey(url).map(key=>{
                  return (
                    <TableRow key={key}>
                      <TableRowColumn style={{width: "30%",fontSize:"16px",border:'1px solid #ddd',}}>
                        {url}
                      </TableRowColumn>
                      <TableRowColumn style={{fontSize:"16px",border:'1px solid #ddd',}}>
                        {key}
                      </TableRowColumn>
                      <TableRowColumn style={{width:"75px",fontSize:"16px",border:'1px solid #ddd',}}>
                        <a href='#' onClick={e=>{
                          e.preventDefault()
                          store.removeApiKey(url, key)
                          this.setState({urlList : store.getUrl()})
                        }}>
                          <Delete />
                        </a>
                      </TableRowColumn>
                    </TableRow>
                  )
                })
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}
