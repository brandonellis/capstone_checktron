import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import {getItem} from '../../utils/apiHelper'
import {mapObject} from '../../utils/helper'

const style = {
  center: {
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    display: 'block',
  },
}
export default class BookingDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      param: {}
    }
  }
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
  setItem(item){
    var param = {}
    if(item != null && typeof item.param === 'object'){
      for(var key in item.param){
        //skip if
        if(item.param[key].hide != 0) continue
        param[key] = item.param[key].qty
      }
    }
    this.setState({'item': item, loading: false, param: param})
  }
  paramFields(){
    if(this.state.item == null || typeof this.state.item.param !== 'object') return;
    return(
      <div>
        {mapObject(this.state.param, (key, value)=>{
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
  dateFeild(){

  }
  render(){
    if(this.state.loading){
      getItem(this.props.item, this.props.start_date, this.props.end_date, this.setItem.bind(this))
      return <CircularProgress size={80} thickness={5} style={style.center} />
    }else{
      return(
        <div style={style.center}>
          {JSON.stringify(this.state.param)}
          {this.timeField()}
          {this.paramFields()}
        </div>
      )
    }
  }
}
