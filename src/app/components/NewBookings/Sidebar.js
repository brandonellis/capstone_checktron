import React, { Component } from 'react'
import {hashHistory} from 'react-router'
import CategorySelect from './CategorySelect'
import {getCategoryNames} from '../../utils/apiHelper'
import DatePicker from 'material-ui/DatePicker'
import moment from 'moment'

// in two files > ./Content
const sidebarWidth = 250;

const style = {
  sidebar: {
    width: sidebarWidth,
    paddingLeft: 15,
    paddingRight: 15,
    position: 'fixed',
    top: 60,
    height: '100%',
    backgroundColor: '#f4f4f4'
  },
  textFieldStyle:{
    width: '100%'
  },
  labels: {
    fontSize: '16px',
    paddingBottom: '5px',
    paddingTop: '5px'
}
}
const pStr = [
  'booking?start_date=',
  '&end_date=',
  '&category_id='
]

export class Sidebar extends Component{
  setCategory(category){
    var path = pStr[0] + this.props.start + pStr[1] + this.props.end + pStr[2] + category
    hashHistory.push(path)
  }
  setStart(start){
    var end = parseInt(start) > parseInt(this.props.end) ? start : this.props.end
    var path = pStr[0] + start + pStr[1] + this.props.end + pStr[2] + this.props.category
    hashHistory.push(path)
  }
  setEnd(end){
    var start = parseInt(this.props.start) > parseInt(end) ? end : this.props.start
    var path = pStr[0] + start + pStr[1] + end + pStr[2] + this.props.category
    hashHistory.push(path)
  }
  render(){
    return(
      <div style={style.sidebar}>
        <h2 style={{fontWeight: 'bolder', fontSize: '20px'}}>Search</h2>
        <label style={style.labels}>Category</label>
        <CategorySelect
          key={this.props.category}
          category={this.props.category}
          setCategory={this.setCategory.bind(this)}
        />
        <label style={style.labels}>Start:</label>
        <DatePicker
          hintText="Start Date"
          container="inline"
          mode="landscape"
          defaultDate={moment(this.props.start, 'YYYYMMDD').toDate()}
          textFieldStyle={style.textFieldStyle}
          onChange={((ne, date)=>{
            this.setStart(moment(date).format('YYYYMMDD'))
          }).bind(this)}
        />
        <label style={style.labels}>End:</label>
        <DatePicker
          hintText="Start End"
          container="inline"
          mode="landscape"
          defaultDate={moment(this.props.end, 'YYYYMMDD').toDate()}
          textFieldStyle={style.textFieldStyle}
          onChange={((ne, date)=>{
            this.setEnd(moment(date).format('YYYYMMDD'))
          }).bind(this)}
        />
      </div>
    )
  }
}

export default Sidebar
