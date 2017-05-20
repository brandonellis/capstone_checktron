import React, { Component } from 'react'
import axios from 'axios'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'


const style = {
  container: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  itemTableHead: {
    textAlign: "center",
    backgroundColor: "#efeff0"
  },
  tableSubTotal1: {
    colSpan: "3"
  },
  subtotalRight: {
    textAlign: "right",
    float: "right",
    borderStyle: "hidden"
  }
}

export class BookingForm extends Component {
    //booking form
    render() {
        return (
            <div style={style.container}>
              <h2>Create Booking</h2>
              <div>
                <h2>Slip={this.props.location.query.slip}</h2>
              </div>
              <table>
                <BookingTableHead />
                <BookingTableItems />
                <CartTotal />
              </table>
              <div>
                <h2>Customer Form</h2>
                  <div>
                      <Items />
                  </div>
                <CustomerForm />
              </div>
            </div>
        )
    }
}

class BookingTableHead extends Component {
    render(){
        return (
            <tbody>
            <tr style={style.itemTableHead}>
              <td style={style.col1}>Item</td>
              <td style={style.col1}>Rate</td>
              <td style={style.col1}>Amount</td>
            </tr>
            </tbody>
        )
    }
}

//TODO: Fill this in with the actual values.
//displays the items in the 'cart'
class BookingTableItems extends Component {
    render() {
        return (
            <tr>
              <td style={style.col2}>ItemGoesHere</td>
              <td style={style.col2}>RateGoesHere</td>
              <td style={style.col2}>AmountGoesHere</td>
            </tr>
        )
    }
}

//displays the amount owed by the customer
class CartTotal extends Component {
    render() {
        return (
            <tr style={style.tableSubTotal}>
              <td style={style.tableSubTotal1} colSpan="3">
              <table>
                <tbody style={{borderStyle:"hidden"}}>
                <td style={style.subtotalRight}>
                  <tr>Sub-Total:</tr>
                  <tr>Taxes (10%): </tr>
                  <tr>Total (CAD):</tr>
                </td>
                </tbody>
              </table>
              </td>
            </tr>
        )
    }
}

//Generates input form for customer data entry
class CustomerForm extends Component {
    render() {
        return (
<div></div>
        )
    }
}
function mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
    })
}
class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingForm: {},
            bookingPolicy: {body: ""},
            form: {},
        };
    }

    componentDidMount() {
        // TODO: move url so that it can be changed easily
        axios.get(`https://capstone2017.checkfront.com/api/3.0/booking/form`)
            .then(res => {
                //const posts = res.data.data.children.map(obj => obj.data);
                this.setState((prevState)=>{
                    var form = {}
                    for(var input in res.data.booking_form_ui){
                        form[input] = res.data.booking_form_ui[input].value
                    }
                    return({
                        bookingForm: res.data.booking_form_ui,
                        bookingPolicy: res.data.booking_policy,
                        form: form,
                    })
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

    createInput(key, input) {
        //TODO: Function to ensure all requirements have been met
        var required = input.define.layout.staff.required
        required &= typeof this.state.form[key] !== "string" || this.state.form[key] === ""
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
                        rows={type ? 4 : 1}
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
    render() {
        return (
            <div>
                <h1>Form</h1>
                <ul>
                    {mapObject(this.state.bookingForm, (key, value)=>{
                        return(
                            <li>{this.createInput(key, value)}</li>
                        )
                    })}
                    <li>
                        <RaisedButton label="Submit" style={style}
                                      //TODO
                        />
                    </li>
                </ul>

                <div dangerouslySetInnerHTML={{__html: this.state.bookingPolicy.body}} />
            </div>
        )
    }
}
export default BookingForm
