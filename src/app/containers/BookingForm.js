import React, { Component } from 'react'
import axios from 'axios'


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
            <div>
              <h2>Create Booking</h2>
              <div>
                <h2>Slip={this.props.location.query.slip}</h2>
              </div>
              <table style={style.container}>
                <BookingTableHead />
                <BookingTableItems />
                <CartTotal />
              </table>
              <div>
                <h2>Customer Form</h2>
                  <div className="App">
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
            form: {},
            bookingPolicy: {body: ""},
        };
    }

    componentDidMount() {
        // TODO: move url so that it can be changed easily
        axios.get(`https://capstone2017.checkfront.com/api/3.0/booking/form`)
            .then(res => {
                //const posts = res.data.data.children.map(obj => obj.data);
                this.setState({
                    form: res.data.booking_form_ui,
                    bookingPolicy: res.data.booking_policy
                });
            });
    }
    createInput(key, input) {
        switch(input.define.layout.type){
            case 'text':
            case 'textarea':
                if(input.define.layout.staff.required != 0)
                    return(
                        <input type="text" />
                    )
                return(
                    <input type="text" />
                )
                break
            case 'select':
                if(input.define.layout.staff.required != 0)
                    return(
                        <select>
                            {mapObject(input.define.layout.options, (value, html)=>{
                                return(
                                    <option
                                        selected={input.value && input.value === value}
                                        key={value}
                                        value={value}
                                    >{html}</option>
                                )
                            })}
                        </select>
                    )
                return(
                    <select>
                        {mapObject(input.define.layout.options, (value, html)=>{
                            return(
                                <option
                                    selected={input.value && input.value === value}
                                    key={value}
                                    value={value}
                                >{html}</option>
                            )
                        })}
                    </select>
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
                    {mapObject(this.state.form, (key, value)=>{
                        return(
                            <li>{this.createInput(key, value)}
                                <ul>
                                    <li>label: {value.define.layout.lbl}</li>
                                    <li>type: {value.define.layout.type}</li>
                                    {value.value && [<li>value: {value.value}</li>]}
                                    {value.define.layout.staff.required == 1 && [<li>required</li>]}
                                </ul>
                            </li>
                        )})}
                </ul>
                <div dangerouslySetInnerHTML={{__html: this.state.bookingPolicy.body}} />
            </div>
        )
    }
}
export default BookingForm
