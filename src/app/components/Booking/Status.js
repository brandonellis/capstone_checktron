import React, {Component} from 'react'
import {hashHistory} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import {changeStatus} from '../../utils/apiHelper'

var status = {
  HOLD: {
    name: 'Reserved',
    color: '#2b3d51'
  },
  /*
  PRE: {
    name: 'pre',
    color: '#cccccc'
  },
  */
  PEND: {
    name: 'Pending',
    color: '#1a979c'
  },
  PART: {
    name: 'Deposit',
    color: '#80898f'
  },
  PAID: {
    name: 'Paid',
    color: '#91b262'
  },
  WAIT: {
    name: 'Waiting',
    color: '#55007c'
  },
  STOP: {
    name: 'Cancelled',
    color: '#bb2244'
  },
  VOID: {
    name: 'Void',
    color: '#999999'
  },
  BLOKI: {
    name: 'Blokirano',
    color: '#000000'
  },
  STATE: {
    name: 'State',
    color: '#ff8c00'
  },
  PRIVA: {
    name: 'Private',
    color: '#808000'
  },
  REQUE: {
    name: 'Request',
    color: '#ff4500'
  }
}
//<span id="checkfront_status" className={booking.status_id}>{status[booking.status_id].name}</span>
const style = {
  btn:{
    width: '100%'
  },
  btnText: {
    float: 'left'
  },
  btnCaret: {
    marginTop: 9,
    float: 'right'
  }
}
export class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  handleTouchTap(event){
    // This prevents ghost click.
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
  render() {
    return (
      <div>
        <RaisedButton
          buttonStyle={{
            backgroundColor: status[this.props.status].color,
            textAlign: 'center',
            WebkitBorderRadius: '0.5em',
          }}
          labelStyle={{
            color: '#fff'
          }}
          onTouchTap={this.handleTouchTap.bind(this)}
          label={status[this.props.status].name}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <Menu>
            {Object.keys(status).map(status_id=>{
              return <MenuItem
                key={status_id}
                style={{
                  backgroundColor: status[status_id].color,
                  textAlign: 'center',
                  WebkitBorderRadius: '0.5em',
                  margin: '2px 0',
                  color: '#fff'
                }}
                primaryText={status[status_id].name}
                onTouchTap={e=>changeStatus(this.props.booking, status_id, ()=>{
                  this.handleRequestClose()
                  this.props.refresh()
                })}
              />
            })}
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default Status
