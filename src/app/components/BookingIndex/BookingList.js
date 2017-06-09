import React, { Component } from 'react'
import Bookings from './Bookings'
import {getBookings} from '../../utils/apiHelper'
import CircularProgress from 'material-ui/CircularProgress'
import moment from 'moment'

const style = {
  container:{
    overflowY: 'auto',
    position: 'fixed',
    top: 60,
    left: 0,
    bottom: 0,
    right: 0
  },
  //style pagination <a> links into button styles
  pageButtons:{
    display: "block",
    width: "33px",
    height: "33px",
    textAlign: "center",
    borderRadius: "5px",
    borderColor: "transparent",
    backgroundColor: "#ddd",
    color: "black",
    paddingRight: "10px",
    margin: "2px",
    fontSize: "16px",
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
  date(){
      return(
          moment().format('ddd MMM DD, YYYY')
      )
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
        <a style={style.pageButtons} href="#"
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
        <a style={style.pageButtons} href='#'
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
        <a style={style.pageButtons} href="#"
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
          <h1 style={{marginBottom: "1px"}}>
            Booking Index
          </h1>
          <div style={{textAlign: "center"}}>
            <ul className="pagination pagination-sm">
              {pageSelect}
            </ul>
            <Bookings key={this.state.page} bookings={this.state.bookings}/>
            <ul className="pagination pagination-sm">
              {pageSelect}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default BookingList
