import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import style from './style'
const path = require('path')

const mac = process.platform === 'darwin'
const modifierKey = mac ? '&#8984;' : 'Ctrl + '

//todo remove this and the conditions
var remote
try{
  remote = require('electron').remote
}catch(e){
  remote = false
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

export class LoginNavigation extends Component{
  render(){
    return(
      <div style={style.navbar}>
        <div style={style.navbarLeft}>
          <a style={style.navbarItem} className='ct-nav-item' href='#' onClick={e=>{
            e.preventDefault()
          }}>
            <img style={style.navbarImage} src='images/logo.png' />
          </a>
        </div>
        <div style={style.navbarRight} className="ct-nav-win-icons">
          <a href="#" onClick={(e)=>{
            e.preventDefault()
            alert('TODO: modal dialog with tabs [keybord shortcuts|TODO:think of more tabs]')
          }}>
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
