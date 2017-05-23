import React, { Component } from 'react'
import Bookings from './Bookings'
import {getBookings} from '../../utils/apiHelper'

const style = {
  container:{
    overflowY: 'auto',
    position: 'fixed',
    top: 60,
    left: 0,
    bottom: 0,
    right: 0
  }
}

export class BookingList extends Component{
  constructor(props){
    super(props)
    this.state = {
      page: 1,
      pages: 1,
      bookings: {},
      loading: true
    }
  }
  setBookings(data){
    this.setState({
      page: data.request.page,
      pages: data.request.pages,
      bookings: data['booking/index'],
      loading: false
    })
  }
  componentDidMount(){
    getBookings(this.state.page, this.setBookings.bind(this))
  }
  render(){
    if(this.state.loading){
      getBookings(this.state.page, this.setBookings.bind(this))
    }
    var pageSelect = []
    for(var i = 1; i <= this.state.pages; i++){
      pageSelect.push(
        <li
          key={i + 'page'}
          className={i == this.state.page?'active':''}
        >
        <a
          href='#'
          onClick={
            (page=>{return e=>{
              e.preventDefault()
              this.setState({page: page, loading: true})
            }})(i)
          }
        >{i}</a></li>)
    }
    return(
      <div style={style.container}>
        <div className="container">
          <h1>Bookings</h1>
          <Bookings key={this.state.page} bookings={this.state.bookings}/>
          <ul className="pagination pagination-sm">
            {pageSelect}
          </ul>
        </div>
      </div>
    )
  }
}

export default BookingList
