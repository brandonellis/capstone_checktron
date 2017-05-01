import React, { Component } from 'react'
const moment = require('moment');
import ItemList from '../components/NewBookings/Content'
import Sidebar from '../components/NewBookings/Sidebar'

export class NewBooking extends Component{
  render(){
    var start = this.props.location.query.start_date != undefined ?
      this.props.location.query.start_date : moment().format('YYYYMMDD')

    var end = this.props.location.query.end_date != undefined ?
      this.props.location.query.end_date : moment().format('YYYYMMDD')

    var category = this.props.location.query.category_id != undefined ?
      this.props.location.query.category_id : '0'

    if(parseInt(start) > parseInt(end)){
      end = start
    }
    return(
      <div>
        <Sidebar
          key={this.props.location.search + 'sidebar'}
          start={start}
          end={end}
          category={category}
        />
        <ItemList
          key={this.props.location.search}
          start={start}
          end={end}
          category={category}
        />
      </div>
    )
  }
}

export default NewBooking
