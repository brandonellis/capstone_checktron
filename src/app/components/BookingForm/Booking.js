import React, { Component } from 'react'
import {hashHistory} from 'react-router'
import axios from 'axios'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

import {getSession, getForm, createBooking} from '../../utils/apiHelper'
import {mapObject} from '../../utils/helper'

const style = {
  content:{
    overflowY: 'auto',
    position: 'fixed',
    top: 60,
    left: 0,
    bottom: 0,
    right: 0
  },
  container: {
    maxWidth: 1365,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40
  },
  itemTableHead: {
    textAlign: "center",
    backgroundColor: "#efeff0"
  },
  subtotalRight: {
    textAlign: "right",
    fontSize: '15px',
  },
  col: {
    borderStyle: 'none',
  },
  col3: {
    borderStyle: 'none',
    textAlign: 'right',
    width: '1%',
    whiteSpace: 'nowrap'
  },
  formTitle: {
      fontSize: '25px',
      fontWeight: 'bold',
      color: '#787878',
      textAlign: 'center',
  },
  formContainer: {
      width: '70%',
      margin: 'auto',
  },
  orderTitle: {
      fontSize: '27px',
      fontWeight: 'bold',
      color: 'black',
      paddingBottom: '5px',
  }
}

export class Booking extends Component {
  constructor(props){
    super(props)
    this.state={
      session:{
        id: '',
        total: '',
        sub_total: '',
        tax_total: '',
        currency_id: '',
        tax: {},
        item: {}
      }
    }
  }
  componentDidMount(){
    getSession(this.props.slip, this.state.session.id, (session=>{this.setState({session: session})}).bind(this))
  }

  //booking form
  render() {
    return (
      <div style={style.content} key={this.state.session.id}>
        <div style={style.container} className='container'>
          {/*
          <div>
            <h2>Slip={this.props.slip}</h2>
            <h2>Session={this.state.session.id}</h2>
          </div>
          */}
            <p style={style.orderTitle}>Order Summary</p>
          <table>
            <BookingTableHead />
            <BookingTableItems session={this.state.session} />
            <CartTotal session={this.state.session} />
          </table>
          <div>
              <div>
                  <Items session={this.state.session.id} />
              </div>
          </div>
        </div>
      </div>
    )
  }
}

class BookingTableHead extends Component {
    render(){
        return (
          <thead>
            <tr style={style.itemTableHead}>
              <th style={style.col}>Item</th>
              <th style={style.col}>Rate</th>
              <th style={style.col3}>Amount</th>
            </tr>
          </thead>
        )
    }
}

//TODO: Fill this in with the actual values.
//displays the items in the 'cart'
class BookingTableItems extends Component {
  render() {
    var items = this.props.session.item
    if(Object.keys(items).length <= 0) return(<tbody />)
    var item = items[Object.keys(items)[0]]
    return (
      <tbody>
      {/* Options show up */
        mapObject(items, (key, value)=>{
        return (
          <tr key={value.name + key}>
            <td style={style.col}>
              <strong>{value.name}</strong>
              <br />{value.date.summary}
            </td>
            <td
              style={style.col}
              dangerouslySetInnerHTML={{__html: value.rate.summary}}
            ></td>
            <td style={style.col3}>
              <strong>{
                value.opt === 'out' ?
                'Not Selected':
                '$' + value.rate.total}</strong>
            </td>
          </tr>
        )
      })}
      </tbody>
    )
  }
}

//displays the amount owed by the customer
class CartTotal extends Component {
  render() {
    var session = this.props.session
    return (
      <tfoot>
        <tr>
          <td style={style.subtotalRight} colSpan='3'>
            <div>Sub-Total: ${session.sub_total}</div>
            <div>Taxes ({Object.keys(session.tax)[0] && session.tax[Object.keys(session.tax)[0]].amount}%): ${session.tax_total}</div>
            <div>Total {session.currency_id}: ${session.total}</div>
          </td>
        </tr>
      </tfoot>
    )
  }
}

class Items extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        bookingForm: {},
        bookingPolicy: {body: ""},
        form: {},
      }
  }

  componentDidMount() {
    getForm(this.setForm.bind(this))
  }

  setForm(bookingForm){
    this.setState((prevState)=>{
      var form = {}
      for(var input in bookingForm.booking_form_ui){
        form[input] = bookingForm.booking_form_ui[input].value
      }
      return({
        bookingForm: bookingForm.booking_form_ui,
        bookingPolicy: bookingForm.booking_policy,
        form: form,
      })
    })
  }
  handleInput(e, newValue, input) {
      this.setState(
          (prevState)=>{
              prevState.form[input] = newValue
              //alert(input)
              //alert(newValue)
              return{form:prevState.form}
          }
      )
  }

  createInput(key, input, r) {
      //TODO: Function to ensure all requirements have been met

      var required = input.define.required
      required &= typeof this.state.form[key] !== "string" || this.state.form[key] === ""
      r.incomplete |= required

      switch(input.define.layout.type){
          case 'text':
          case 'textarea':
              var type = input.define.layout.type === "textarea"
              return(
                  <TextField
                      errorText={required ? "required" : undefined}
                      errorStyle={{color: "#ff605d"}}
                      floatingLabelText={input.define.layout.lbl}
                      multiLine={type}
                      rows={type ? 2 : 1}
                      fullWidth={true}
                      floatingLabelStyle={{color: "rgb(44, 151, 222)"}}
                      onBlur = {((e)=>this.handleInput(e, e.target.value, key)).bind(this)}
                      //floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  />
              )
              break
          case 'select':
              return(
                  <SelectField
                      value={this.state.form[key]}
                      maxHeight={200}
                      errorText={required ? "required" : undefined}
                      errorStyle={{color: "#ff605d"}}
                      floatingLabelText={input.define.layout.lbl}
                      fullWidth={true}
                      floatingLabelStyle={{color: "rgb(44, 151, 222)"}}
                      //onChange={((e, v)=>this.handleInput(e, v, key)).bind(this)}
                  >
                  {mapObject(input.define.layout.options, (value, text)=>{
                      return(
                          <MenuItem value={value} key={value} primaryText={text}
                                    onTouchTap={((e)=>this.handleInput(e, value, key)).bind(this)}
                          />
                      )
                  })}
                  </SelectField>
              )
              break
          default:
              alert('new input type' + input.layout.type)
      }
  }
  bookingPage(data){
    if(data.request.status === 'OK'){
      hashHistory.push('booking_page?id=' + data.booking.booking_id)
    }else{
      alert(data.request.error.details)
    }
  }
  render() {
    var r = {incomplete: false}
    return (
      <div style={{marginTop:40}}>
        <Paper zDepth={2}>
          <div style={{padding:20}}>
            <p style={style.formTitle}>Customer Form</p>
                <div style={style.formContainer}>
                    <ul>
                      {mapObject(this.state.bookingForm, (key, value)=>{
                        return(
                          <li key={key}>{this.createInput(key, value, r)}</li>
                        )
                      })}
                      <br />
                      <li>
                        <RaisedButton
                          key={r.incomplete? 'disabled' : 'enabled'}
                          label="Submit"
                          disabled={r.incomplete ? true : false}
                          style={{backgroundColor: 'blue', disabledBackgroundColor: 'black'}}
                          onTouchTap={e=>{createBooking(this.props.session, this.state.form, this.bookingPage)}}
                        />
                      </li>
                    </ul>
                </div>
          </div>
        </Paper>
        <br />
        <div dangerouslySetInnerHTML={{__html: this.state.bookingPolicy.body}} />
    </div>
    )
  }
}
export default Booking
