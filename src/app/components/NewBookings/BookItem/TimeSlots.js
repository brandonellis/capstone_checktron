import React, {Component} from 'react'
import moment from 'moment'
import {hashHistory} from 'react-router'

import DatePicker from 'material-ui/DatePicker'
import CircularProgress from 'material-ui/CircularProgress'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';

import {time12To24, time24To12, mapObject} from '../../../utils/helper'
import {getItemSlip} from '../../../utils/apiHelper'


export default class TimeSlots extends Component{
  constructor(props){
    super(props)
    var param = {}
    for(var key in props.item.param){
      if(key === 'qty' && props.item.stock == 1) continue
      param[key] = props.item.param[key].qty
    }
    this.state = {
      item_id: props.item.item_id,
      start_date: props.item.rate.start_date,
      timeslot: 0,
      param: param,
      item: props.item,
      loading: false,
    }
    //alert(JSON.stringify(this.state, null, 4))
  }
  setItem(item){
    this.setState({'item': item, loading: false})
  }
  setParam(param){
    this.setState((prevState) => {
      // Copy json, should be a better way to do this
      var nextParam = JSON.parse(JSON.stringify(prevState.param))
      for(var key in param){
        nextParam[key] = Math.min(Math.max(param[key], 0), 50)
      }
      return {param: nextParam, loading: true}
    })
  }
  date(){
    return (
      <DatePicker
        floatingLabelText="Date"
        mode="landscape"
        defaultDate={moment(this.state.start_date, 'YYYYMMDD').toDate()}
        onChange={((ne, date)=>{
          this.setState({
            start_date: moment(date).format('YYYYMMDD'),
            loading: true,
          })
        }).bind(this)}
      />
    )
  }
  time(){
    if(this.state.item == null || typeof this.state.item.rate.dates[this.state.item.rate.start_date].timeslots !== 'object') return;
    var i = 0
    return(
      <SelectField
        floatingLabelText="Time"
        value={this.state.timeslot}
        onChange={((e, i, value) => this.setState({timeslot: value, loading: true})).bind(this)}
      >
        {this.props.item.rate.dates[this.props.item.rate.start_date].timeslots.map(timeslot=>{
          return(
            <MenuItem
              key={i}
              value={i++}
              primaryText = {time24To12(timeslot.start_time) + ' - ' + time24To12(timeslot.end_time)}
            />
          )
        })}
      </SelectField>
    )
  }
  param(){
    return(
      <div>
        {mapObject(this.state.param, (key, value)=>{
          return(
            <div key={key}>
              <TextField
                defaultValue={this.state.item.param[key].qty}
                floatingLabelText={this.state.item.param[key].lbl}
                type="number"
                onChange={((event)=>{
                  var p = {}
                  p[key] = event.target.value
                  this.setParam(p)
                }).bind(this)}
              />
            </div>
          )
        })}
      </div>
    )
  }
  summary(){
    if(this.state.item.rate.error != null){
      return (
        <div className="alert alert-warning">
          {this.state.item.rate.error.title}
        </div>
      )
    }
    return(
      <div>
        {this.state.item.rate.summary.date + ': ' + this.state.item.rate.summary.price.total}
        <div dangerouslySetInnerHTML={{ __html: this.state.item.rate.summary.details }} />
      </div>
    )
  }
  render(){
    if(this.state.loading)
      getItemSlip(this.state.item_id, this.state.start_date, null, null, null, this.state.timeslot, this.state.param, this.setItem.bind(this))
    return(
      <div>
        <div className={'ct-item-status ' + this.state.item.rate.status}>
          {this.state.item.rate.summary.title}
        </div>
        {this.date()}
        {this.time()}
        {this.param()}
        {this.summary()}
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.props.close}
        />
        <FlatButton
          label="Submit"
          primary={true}
          disabled={this.state.item.rate.status !== 'AVAILABLE'}
          onTouchTap={()=>hashHistory.push('booking_form?slip=' + this.state.item.rate.slip)}
        />
      </div>
    )
  }
}
