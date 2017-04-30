import React, {Children, Component } from 'react'
import { hashHistory } from 'react-router'
import {getCategoryNames} from '../utils/apiHelper'
import {config} from '../config/config'

//const { remote } = require('electron')

/*
Top of the frame can be used to drag window
Nav Menu to access app fucntions
Tool bar Icons for access to config and help
Window, minimize maximize, close icons
*/
export class Header extends Component{
  render(){
    return(
      <nav className='navbar navbar-default navbar-fixed-top' style={{WebkitAppRegion: 'drag'}}>
        <div className="container-fluid">
          <nav className='pull-left' style={{WebkitAppRegion: 'no-drag'}}>
            <HeaderNav />
          </nav>
          <nav className='pull-right' style={{WebkitAppRegion: 'no-drag'}}>
            <HeaderTools />
            <HeaderWindow />
          </nav>
        </div>
      </nav>
    )
  }
}


class HeaderNav extends Component{
  // TODO : data here should be gotten when initially and stored in an object to be used in other components
  componentDidMount() {
    getCategoryNames(this.setCategoryState.bind(this))
  }
  categories(){
    if(this.state !== null && this.state.categories !== undefined){
      return this.mapNavItems(this.state.categories, 'items?category=')
    }
  }
  setCategoryState(categoryNames){
    this.setState({categories: categoryNames})
  }
  /*
    takes list of objects, [{name: path}]
  */
  mapNavItems(navItemList, pathPrefix){
    pathPrefix = typeof(pathPrefix) === 'string' ? pathPrefix : ''
    return navItemList.map((navItem)=>{
      return <HeaderNavItem
        name={navItem.name}
        key={navItem.id}
        path={pathPrefix + navItem.id}
      />
    })
  }
  render(){
    /* TODO: should this be broken down into more components?
      generated from a list of items and subitems?
    */
    return(
        <ul className='nav navbar-nav'>
          <HeaderNavDropdown name='Booking'>
            <HeaderNavItem name='Index' path='?path=none' />
            {this.mapNavItems(config.nav.booking, '?filter=')}
            <HeaderNavItem name='New Booking' path='items' />
            {this.categories()}
          </HeaderNavDropdown>
          <HeaderNavDropdown name='dev'>
            <HeaderNavItem name='DEV Booking item x' path='item' />
            <HeaderNavItem name='DEV Booking form x' path='bookingform' />
            <HeaderNavItem name='DEV Bookings list' path='bookings' />
            <HeaderNavItem name='DEV Booking details' path='booking' />
          </HeaderNavDropdown>
        </ul>
    )
  }
}
class HeaderNavDropdown extends Component{
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }
  onClick(e){
    this.setState((prevState, props) => {
      return {open: !prevState.open};
    })
    e.preventDefault()
  }
  close(e){
      //clicking a menu item must trigger that items event first
    setTimeout(()=>{

      if(document.activeElement.offsetParent == null ||
        document.activeElement.offsetParent.className != "dropdown-menu")
      {
        this.setState({open: false})
      }
    }, 1)
  }
  render(){
    return(
      <li className={'dropdown ' + (this.state.open ? 'open' : '')}
      onBlur={this.close.bind(this)}>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown"
        role="button" aria-haspopup="true"
        aria-expanded={String(this.state.open)}>
          {this.props.name}<span className="caret"></span>
        </a>
        <ul className="dropdown-menu">
          {this.props.children}
        </ul>
    </li>
    )
  }
}

class HeaderNavItem extends Component{
  subItems(){
    if(Children.count(this.props.children) > 0 ){
      return <ul>{this.props.children}</ul>
    }
  }
  click(e){
    // TODO : can we stop "Warning: You cannot PUSH the same path..."
    hashHistory.push(this.props.path)
    e.preventDefault()
  }
  render(){
    return(
      <li>
        <a href='#' onClick={this.click.bind(this)}>{this.props.name}</a>
        {this.subItems()}
      </li>
    )
  }
}

export class HeaderTools extends Component{
  render(){
    return(
      <div className='pull-left'>
        <button onClick={() => alert("No help, no settings!!")}>?</button>
      </div>
    )
  }
}
export class HeaderWindow extends Component{
  minimize() {
    /*
    var window = remote.getCurrentWindow()
    window.minimize()
    */
  }
  maximize() {
    /*
    var window = remote.getCurrentWindow()
    !window.isMaximized() ? window.maximize() : window.unmaximize()
    */
  }
  close() {
    /*
    var window = remote.getCurrentWindow()
    window.close()
    */
  }
  render(){
    return(
      <div className='pull-left'>
        <button onClick={this.minimize}>_</button>
        <button onClick={this.maximize}>[]</button>
        <button onClick={this.close}>X</button>
      </div>
    )
  }
}
export default Header
