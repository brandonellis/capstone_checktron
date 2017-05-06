import React, { Component } from 'react'

export default class BookingForm extends Component{
  render(){
    return(
      <div>
        <h2>Slip={this.props.location.query.slip}</h2>
      </div>
    )
  }
}
