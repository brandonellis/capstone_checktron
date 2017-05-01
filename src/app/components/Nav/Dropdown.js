import React, { Component } from 'react'
import Popover from 'material-ui/Popover'
import style from './style'

class Dropdown extends Component{
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  handleTouchTap(event){
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }
  handleRequestClose(){
    this.setState({
      open: false,
    })
  }
  render(){
    return(
      <div className={this.state.open ? 'ct-nav-item-open' : 'ct-nav-item'} style={style.navbarItem} href='#' onTouchTap={this.handleTouchTap.bind(this)}>
          <div style={style.navbarText}>
            {this.props.label}&nbsp;<span className="caret"></span>
          </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
        {this.props.children}
        </Popover>
      </div>
    )
  }
}

export default Dropdown
