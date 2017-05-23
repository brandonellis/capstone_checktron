import React, { Component } from 'react'
import {mapObject} from '../../utils/helper'

class BookingStatus extends React.Component{
  render(){
    return(
     <div className="SB">
        <div className={this.props.status_id}></div>
        {this.props.status_name}
     </div>
    );
  }
}

class BookingRow extends React.Component{
  render(){
    return(
     <tr className='hover'>
        <td>
          <a href={'#booking_page?id=' + this.props.booking.booking_id}>{this.props.booking.code}</a>
        </td>
        <td>
          {this.props.booking.customer_name}
          <em>{this.props.booking.customer_email}</em>
        </td>
        <td><BookingStatus status_id={this.props.booking.status_id} status_name={this.props.booking.status_name}/></td>
     </tr>
    );
  }
}

export default class Bookings extends React.Component{
  reload(){
    //this.setState to reload the component, (prevState) => ({}) because can't use this.state in setState
  }
  render(){
    setInterval(function(){ this.reload; }, 3000);
    return(
      <table>
        <th>Booking</th>
        <th>Customer</th>
        <th>Status</th>
        {mapObject(this.props.bookings, (key, value)=>{
          return <BookingRow booking={value} id={value.booking_id} />
        })}
      </table>
    )
  }
}
