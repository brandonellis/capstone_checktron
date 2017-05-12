import React, { Component } from 'react'

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
  col1: {
    fontWeight: "bold"
  },
  col2: {

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
//TODO: Find a react-like way to generate this dynamically instead of typing out HTML....
class CustomerForm extends Component {
    render() {
        return (
            <form>
              <table style={{width:"500px"}}>
                <tr>
                  <td>First Name:</td>
                  <td><input type="text" name="FirstName"/></td>
                </tr>
                <tr>
                  <td>Secondary person's Name:</td>
                  <td><input type="text" name="SecondaryPersonsName"/></td>
                </tr>
                <tr>
                  <td>E-mail</td>
                  <td><input type="text" name="Email"/></td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td><input type="text" name="Phone"/></td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td><input type="text" name="Address"/></td>
                </tr>
                <tr>
                  <td>City</td>
                  <td><input type="text" name="City"/></td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td><input type="text" name="Country"/></td>
                </tr>
                <tr>
                  <td>Province</td>
                  <td><input type="text" name="Province"/></td>
                </tr>
                <tr>
                  <td>Postal code</td>
                  <td><input type="text" name="PostalCode"/></td>
                </tr>
                <tr>
                  <td>Note</td>
                  <td><input type="text" name="Note"/></td>
                </tr>
                <tr>
                  <td>How did you find us?</td>
                  <td><input type="text" name="FoundUsBy"/></td>
                </tr>
                <tr>
                  <td>Pet Name</td>
                  <td><input type="text" name="PetName1"/></td>
                </tr>
                <tr>
                  <td>Second Pet's Name(If applicable)</td>
                  <td><input type="text" name="PetName1"/></td>
                </tr>
                <tr>
                  <td>Other Pets Names</td>
                  <td><input type="text" name="PetName1"/></td>
                </tr>
                <input type="button" text="submit" />
              </table>
            </form>
        )
    }
}
export default BookingForm
