import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import {getItem} from '../../utils/apiHelper'
import {mapObject} from '../../utils/helper'

import PerDay from './BookItem/PerDay'
import PerNight from './BookItem/PerNight'
import PerTime from './BookItem/PerTime'
import TimeSlots from './BookItem/TimeSlots'
import GiftCertificate from './BookItem/GiftCertificate'

const style = {
  center: {
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    display: 'block',
    whiteSpace: 'pre-wrap'
  },
}
export default class BookingDetails extends Component {
  constructor(props){
    super(props)
    this.state = {loading: true}
  }
  /*
  setParam(param){
    this.setState((prevState) => {
      // Copy json, should be a better way to do this
      var nextParam = JSON.parse(JSON.stringify(prevState.param))
      for(var key in param){
        nextParam[key] = Math.max(param[key], 0)
      }
      return {param: nextParam}
    })
  }
  */
  setItem(item){
    this.setState({'item': item, loading: false})
  }
  /*
  paramFields(){
    if(this.state.item == null || typeof this.state.item.param !== 'object') return;
    return(
      <div>
        {mapObject(this.state.param, (key, value)=>{
          alert(key)
          if(key === 'qty' && this.item.stock > 1) return
          return(
            <div key={key}>
              <TextField
                defaultValue={value}
                floatingLabelText={this.state.item.param[key].lbl}
                type="number"
                onChange={((event, newValue)=>{
                  var p = {}
                  p[key] = newValue
                  this.setParam(p)
                }).bind(this)}
              />
            </div>
          )
        })}
      </div>
    )
  }
  timeField(){
    if(this.state.item == null || typeof this.state.item.rate.dates[this.state.item.rate.start_date].timeslots !== 'object') return;
    return(
      <div>
        <h1> pick time slot </h1>
        {this.state.item.rate.dates[this.state.item.rate.start_date].timeslots.map(timeslot=>{
          return(
            <div key={timeslot.start_time}>
              {timeslot.start_time}-{timeslot.end_time}
            </div>
          )
        })}
      </div>
    )
  }
  */
  book(){
    if(this.state.item.type === 'GC'){
      return(
        <div>
          <GiftCertificate
            item={this.state.item}
            close={this.props.close}
          />
        </div>
      )
    }
    if(this.state.item.unit === 'D'){
      return(
        <div>
          <PerDay
            item={this.state.item}
            close={this.props.close}
          />
        </div>
      )
    }
    if(this.state.item.unit === 'N'){
      return(
        <div>
          <PerNight
            item={this.state.item}
            close={this.props.close}
          />
        </div>
      )
    }
    if(this.state.item.unit === 'TS'){
      return(
        <div>
          <TimeSlots
            item={this.state.item}
            close={this.props.close}
          />
        </div>
      )
    }
    if((new RegExp('(?:10M|15M|20M|30M|H)')).test(this.state.item.unit)){
      return(
        <div>
          <PerTime
            item={this.state.item}
            close={this.props.close}
          />
        </div>
      )
    }
  }
  render(){
    if(this.state.loading){
      getItem(this.props.item, this.props.start_date, this.props.end_date, this.setItem.bind(this))
      return <CircularProgress size={80} thickness={5} style={style.center} />
    }else{
      return(
        <div style={style.center}>
          {this.state.item && this.book()}
        </div>
      )
    }
  }
}
