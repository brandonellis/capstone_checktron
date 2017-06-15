import React, {Component} from 'react'
import moment from 'moment'
import {hashHistory} from 'react-router'

import DatePicker from 'material-ui/DatePicker'
import CircularProgress from 'material-ui/CircularProgress'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import {time12To24, time24To12, timeAdd, timeVal, mapObject} from '../../../utils/helper'
import {getItemSlip} from '../../../utils/apiHelper'

export default class PerTime extends Component{
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
      start_time: time12To24(props.item.rate.start_time),
      end_time: time12To24(props.item.rate.end_time),
      len: props.item.len,
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
  startTime(){
    var fixed = this.state.item.len != 0
    var unit = Math.max(1, this.state.item.len)
    if(this.state.item.unit == 'H') unit *= 60
    else unit *= parseInt(this.state.item.unit.substring(0,2))
    return(
      <SelectField
        floatingLabelText='Start Time'
        value={this.state.start_time}
        onChange={((e, i, value) => this.setState({
          start_time: value,
          end_time: timeAdd(value, unit),
          loading: true
        })).bind(this)}
      >
        {mapObject(this.props.item.rate.dates[this.props.item.rate.start_date].times, (key, value) => {
          return(
            <MenuItem
              key={key}
              value={key}
              primaryText = {time24To12(key)}
            />
          )
        })}
      </SelectField>
    )
  }
  endTime(){
    var fixed = this.state.item.len != 0
    var unit = Math.max(1, this.state.item.len)
    if(this.state.item.unit == 'H') unit *= 60
    else unit *= parseInt(this.state.item.unit.substring(0,2))
    return(
      <SelectField
        floatingLabelText='End Time'
        value={this.state.end_time}
        disabled={fixed}
        onChange={((e, i, value) => this.setState({end_time: value, loading: true})).bind(this)}
      >
        {mapObject(this.props.item.rate.dates[this.props.item.rate.start_date].times, (key, value) => {
          return(
            <MenuItem
              key={key}
              value={timeAdd(key, unit)}
              primaryText = {time24To12(timeAdd(key, unit))}
              disabled = {timeVal(key) <= timeVal(this.state.start_time)}
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
      getItemSlip(this.state.item_id, this.state.start_date, null, this.state.start_time, this.state.item.len != 0 ? null : this.state.end_time, null, this.state.param, this.setItem.bind(this))
    return(
      <div style={{position:'relative',marginRight:'auto',marginLeft:'auto',}}>
        <div className={'ct-item-status ' + this.state.item.rate.status} style={{width:"150px",position:'relative',marginRight:"auto",marginLeft:"auto",marginTop:'10px',}}>
          {this.state.item.rate.summary.title}
        </div>
        {this.date()}
        {this.startTime()}
        {this.endTime()}
        {this.param()}
        {this.summary()}
        <div style={{paddingTop:'10px',width:'200px',position:'relative',marginRight:'auto',marginLeft:'auto',}}>
          <table style={{displayBorder:'none'}}>
            <tbody>
              <tr style={{border:'none', borderCollapse:'collapse',}}>
                <td>
                  <RaisedButton
                      label="Cancel"
                      primary={true}
                      onTouchTap={this.props.close}
                  />
                </td>
                <td>
                  <RaisedButton
                      label="Submit"
                      primary={true}
                      disabled={this.state.item.rate.status !== 'AVAILABLE'}
                      onTouchTap={()=>hashHistory.push('booking_form?slip=' + this.state.item.rate.slip)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
