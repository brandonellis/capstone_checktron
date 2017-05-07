import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import {getCategoryNames} from '../../utils/apiHelper'
import Dropdown from './Dropdown'
import style from './style'
const path = require('path')

const mac = process.platform === 'darwin'
const modifierKey = mac ? '&#8984;' : 'Ctrl + '

function link(path){
  return e=>{
    e.preventDefault
    hashHistory.push(path)
  }
}

export class MainNavigation extends Component{
  componentDidMount() {
    getCategoryNames(this.setCategoryState.bind(this))
  }
  categories(){
    if(this.state !== null && this.state.categories !== undefined){
      return this.state.categories.map((category)=>{
        return <MenuItem
          key = {category.id}
          primaryText={category.name}
          onTouchTap={link('booking?category_id=' + category.id)}
        />
      })
    }
  }
  setCategoryState(categoryNames){
    this.setState({categories: categoryNames})
  }
  render(){
    // Math.random() can introduce bugs
    // same number causes menu to stay open, no rerender
    // two components with same key causses error, duplacet key
    return(
      <div style={style.navbar}>
        <div style={style.navbarLeft}>
          <a style={style.navbarItem} className='ct-nav-item' href='#'>
            <img style={style.navbarImage} src='images/logo.png' />
          </a>
          <Dropdown label="Booking" key={Math.random()}>
            <Menu desktop={true} width={256}>
              {/* <MenuItem primaryText="Index" secondaryText={modifierKey + 'I'} onTouchTap={link('index')} />
              <Divider /> */}
              <MenuItem primaryText="New Booking" secondaryText={modifierKey + 'N'} onTouchTap={link('booking')} />
              <Divider />
              {this.categories()}
            </Menu>
          </Dropdown>
          {/*}
          <Dropdown label="Dev" key={Math.random()}>
            <Menu desktop={true} width={256}>
              <MenuItem primaryText="Index" onTouchTap={link('index')} />
              <MenuItem primaryText="New Booking" onTouchTap={link('booking')} />
            </Menu>
          </Dropdown>
          {*/}
        </div>
        <div style={style.navbarLeft}>
        </div>
      </div>
    )
  }
}
export default MainNavigation
