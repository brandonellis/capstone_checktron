import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import Dropdown from './Dropdown'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import style from './style'
import {remote, ipcRenderer} from 'electron'
const path = require('path')

const mac = process.platform === 'darwin'
const modifierKey = mac ? '&#8984;' : 'Ctrl + '

//todo remove this and the conditions

function link(path){
  return e=>{
    e.preventDefault()
    hashHistory.push(path)
  }
}
function minimize(e) {
  e.preventDefault()
  if(remote) remote.getCurrentWindow().minimize()
}
function maximize(e) {
  e.preventDefault()
  if(remote){
    var window = remote.getCurrentWindow()
    !window.isMaximized() ? window.maximize() : window.unmaximize()
  }
}
function close(e) {
  e.preventDefault()
  if(remote) remote.getCurrentWindow().close()
}
function help(e) {
  e.preventDefault()
  ipcRenderer.send('help', null);
}

export class LoginNavigation extends Component{
  render(){
    return(
      <div style={style.navbar}>
        <div style={style.navbarLeft}>
          <a style={style.navbarItem} className='ct-nav-item' href='#'>
            <img style={style.navbarImage} src='images/logo.png' />
          </a>
          <Dropdown label="Manage" key={Math.random()}>
            <Menu desktop={true} width={256}>
              <MenuItem primaryText="Log In" onTouchTap={link('/')} />
              <MenuItem primaryText="API Connections" onTouchTap={link('api_connections')} />
            </Menu>
          </Dropdown>
        </div>
        <div style={style.navbarRight} className="ct-nav-win-icons">
          <a href="#" onClick={help}>
            <img style={style.winIcon} src="images/help.png" />
          </a>
          <a href="#" onClick={minimize}>
            <img style={style.winIcon} src="images/min.png" />
          </a>
          <a href="#" onClick={maximize}>
            <img style={style.winIcon} src="images/max.png" />
          </a>
          <a href="#" onClick={close}>
            <img style={style.winIcon} src="images/close.png" />
          </a>
        </div>
      </div>
    )
  }
}
export default LoginNavigation
