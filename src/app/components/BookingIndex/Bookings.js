import React, { Component } from 'react'
import {hashHistory} from 'react-router'
import {mapObject} from '../../utils/helper'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

const style = {
    tableHeader: {
        fontSize: '18px',
        color: '#434343',
    }
}

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
      <TableRow
        className='hover'
        style={{cursor: 'pointer'}}
        onClick={(e=>{
          e.preventDefault()
          hashHistory.push('booking_page?id=' + this.props.booking.booking_id)
        }).bind(this)}
      >
        <TableRowColumn>
          <strong>{this.props.booking.code}</strong>
        </TableRowColumn>
        <TableRowColumn>
          {this.props.booking.customer_name}
          <em>{this.props.booking.customer_email}</em>
        </TableRowColumn>
        <TableRowColumn><BookingStatus status_id={this.props.booking.status_id} status_name={this.props.booking.status_name}/></TableRowColumn>
     </TableRow>
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
      <Table style={{maxWidth: 1365, marginBottom: 20, tableLayout: 'auto'}} fixedHeader={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow style={{backgroundColor: "#eee"}}>
            <TableHeaderColumn style={style.tableHeader}>Booking</TableHeaderColumn>
            <TableHeaderColumn style={style.tableHeader}>Customer</TableHeaderColumn>
            <TableHeaderColumn style={style.tableHeader}>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {mapObject(this.props.bookings, (key, value)=>{
            return <BookingRow key={key} booking={value} id={value.booking_id} />
          })}
        </TableBody>
      </Table>
    )
  }
}
