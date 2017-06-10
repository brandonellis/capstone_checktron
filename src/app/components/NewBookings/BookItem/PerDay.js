import React, {Component} from 'react'
import moment from 'moment'
import {hashHistory} from 'react-router'

import DatePicker from 'material-ui/DatePicker'
import CircularProgress from 'material-ui/CircularProgress'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import {getItemSlip} from '../../../utils/apiHelper'
import {mapObject} from '../../../utils/helper'

export default class PerDay extends Component{
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
      end_date: props.item.rate.end_date,
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
  startDate(){
    return (
      <DatePicker
        key={this.state.start_date + 's'}
        floatingLabelText="Start Date"
        mode="landscape"
        defaultDate={moment(this.state.start_date, 'YYYYMMDD').toDate()}
        onChange={((ne, date)=>{
          this.setState((prevState)=>{
            var start_date = moment(date).format('YYYYMMDD')
            var end_date = parseInt(start_date) > parseInt(prevState.end_date) ? start_date : prevState.end_date
            return {
              start_date: start_date,
              end_date: end_date,
              loading: true,
            }
          })
        }).bind(this)}
      />
    )
  }
  endDate(){
    var fixed = this.state.item.len != 0
    var unit = Math.max(1, this.state.item.len)
    var defaultDate = fixed ? moment(this.state.start_date, "YYYYMMDD").add(unit - 1, 'days').format("YYYYMMDD") : this.state.end_date
    return (
      <DatePicker
        key={this.state.end_date + 'e'}
        floatingLabelText="End Date"
        mode="landscape"
        disabled={fixed}
        defaultDate={moment(defaultDate, 'YYYYMMDD').toDate()}
        onChange={((ne, date)=>{
          this.setState((prevState)=>{
            var end_date = moment(date).format('YYYYMMDD')
            var start_date = parseInt(end_date) < parseInt(prevState.start_date) ? end_date : prevState.start_date
            return {
              start_date: start_date,
              end_date: end_date,
              loading: true,
            }
          })
        }).bind(this)}
      />
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
      getItemSlip(this.state.item_id, this.state.start_date, this.state.end_date, null, null, null, this.state.param, this.setItem.bind(this))
    return(
      <div>
        <div className={'ct-item-status ' + this.state.item.rate.status} style={{width:"150px",position:'relative',marginRight:"auto",marginLeft:"auto",marginTop:'10px',}}>
          {this.state.item.rate.summary.title}
        </div>
        {this.startDate()}
        {this.endDate()}
        {this.param()}
        {this.summary()}
        <div style={{paddingTop:'10px',width:'200px',position:'relative',marginRight:'auto',marginLeft:'auto',}}>
          <table style={{displayBorder:'none'}}>
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
          </table>
        </div>
      </div>
    )
  }
}
