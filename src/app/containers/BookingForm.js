import React, { Component } from 'react'
const moment = require('moment');
import Booking from '../components/BookingForm/Booking'

export class BookingForm extends Component{
  render(){
    return <Booking slip={this.props.location.query.slip} />
  }
}

export default BookingForm
