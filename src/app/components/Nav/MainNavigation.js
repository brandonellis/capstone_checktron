import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Dropdown from './Dropdown'
import style from './style'

const mac = process.platform === 'darwin'
const modifierKey = mac ? '&#8984;' : 'Ctrl + '

function link(path){
  return e=>{
    e.preventDefault
    hashHistory.push(path)
  }
}

export class MainNavigation extends Component{
  render(){
    return(
      <div style={style.navbar}>
        <div style={style.navbarLeft}>
          <a style={style.navbarItem} className='ct-nav-item' href='#'>
            <img style={style.navbarImage} src='/images/checkfront-main-nav-mini-logo.png' />
          </a>
          <Dropdown label="Booking">
            <Menu desktop={true} width={256}>
              <MenuItem primaryText="Index" secondaryText={modifierKey + 'I'} onTouchTap={link('index')} />
              <Divider />
              <MenuItem primaryText="New Booking" secondaryText={modifierKey + 'N'} onTouchTap={link('booking')} />
            </Menu>
          </Dropdown>
          <Dropdown label="Dev">
            <Menu desktop={true} width={256}>
              <MenuItem primaryText="Index" onTouchTap={link('index')} />
              <MenuItem primaryText="New Booking" onTouchTap={link('booking')} />
            </Menu>
          </Dropdown>
        </div>
        <div style={style.navbarLeft}>
        </div>
      </div>
    )
  }
}
export default MainNavigation
