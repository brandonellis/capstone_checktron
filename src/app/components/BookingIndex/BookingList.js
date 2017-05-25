import React, { Component } from 'react'
import Bookings from './Bookings'
import {getBookings} from '../../utils/apiHelper'
import CircularProgress from 'material-ui/CircularProgress'

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
      return <CircularProgress size={80} thickness={5} style={style.center} />
    }
    var pageSelect = []
    //prev
    pageSelect.push(
      <li
        className={1 < this.state.page ? '' : 'disabled'}
        key='prev'
      >
        <a
          href="#"
          onClick={
            e=>{
              e.preventDefault()
              if(1 < this.state.page)
                this.setState(prevState=>{return{page: prevState.page - 1, loading: true}})
            }
          }
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    )
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
    //next
    pageSelect.push(
      <li
        className={this.state.page < this.state.pages ? '' : 'disabled'}
        key='next'
      >
        <a
          href="#"
          onClick={
            e=>{
              e.preventDefault()
              if(this.state.page < this.state.pages)
                this.setState(prevState=>{return{page: prevState.page + 1, loading: true}})
            }
          }
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    )
    return(
      <div style={style.container}>
        <div className="container">
          <h1>Bookings</h1>
          <ul className="pagination pagination-sm">
            {pageSelect}
          </ul>
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
