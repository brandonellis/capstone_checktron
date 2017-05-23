import React, { Component } from 'react'
import moment from 'moment'
import {getCompanyInfo, getBookingInfo, getBookingPolicy} from '../utils/apiHelper'
import Status from '../components/Booking/Status'

const style = {
  container:{
    overflowY: 'auto',
    position: 'fixed',
    top: 60,
    left: 0,
    bottom: 0,
    right: 0
  }
}

export default class Booking extends Component{
  constructor(props){
    super(props)
    this.state={
      booking: false,
      company: false,
      policy: false
    }
  }
  componentDidMount(){
    this.getData()
  }
  getData(){
    getCompanyInfo((company=>{
      getBookingInfo(this.props.location.query.id, (booking=>{
        getBookingPolicy((policy=>this.setState({
          booking: booking,
          company: company,
          policy: policy,
        })).bind(this))
      }).bind(this))
    }).bind(this))
  }
  render(){
    if(!this.state.booking || !this.state.company || !this.state.policy) {
      return<div />
    }
    var booking = this.state.booking
    var company = this.state.company
    var policy = this.state.policy
    return(
      <div style={style.container}>
        <div className='container'>
          <div>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <style type="text/css" dangerouslySetInnerHTML={{__html: "#checkfront-invoice {background: #fff;margin-bottom: 1em;font: 11pt Helvetica Neue,Helvetica,Arial,sans-serif;}table {border-collapse: collapse;border-spacing: 0;}.item_table tr {page-break-inside: avoid;}.item_table td,.item_table th {vertical-align: top;padding: 5px;text-align: left;}.item_table thead tr {background:#e1e1e1;}.item_table thead th {border-bottom: solid 1px #aaa;}.item_table tr.sum-row td,.item_table tr.sum-row th {text-align: right;white-space: nowrap;}.item_table tr.border-top {border-top: solid 1px #111;}.invoice_header td,.invoice_header th {vertical-align: top;text-align: left;padding:0;border:0;}.invoice_details {max-width: 300px;float: right;border: solid 1px #aaa;font-size: 9pt;text-align: right;}.invoice_details th {background: #e1e1e1;padding: 5px;}.invoice_details td {text-align: right;padding: 5px}.btn-invoice {background-color: #fff;color: #777;font-weight: bold;text-decoration: none;padding: 3px 10px;border: solid 1px #ccc;margin-right: 5px;}address {font-size: 9pt;color: #777;}#checkfront_status {display: inline-block;padding: .5em 1em .5em 1em;margin-top: 1em;width: 8em;border-radius: 5px;color: #fff;font-size: 13pt;font-weight: bold;text-align: center;text-transform: uppercase;}.show-cell-webkit {display: none;}.show-cell-webkit:not(*:root) {display: table-cell;}" }} />
            <div id="checkfront-invoice" style={{border: 'solid 1px #aaa', padding: '1.2em'}}>
              <div style={{clear: 'both'}}>
                <table className="invoice_header" style={{width: '100%', fontSize: '12pt'}}>
                  <tbody>
                    <tr>
                      <td>
                        <h1 style={{fontSize: '14pt', color: '#333', fontWeight: 'bold', margin: '0 0 5px 0'}}>Booking Invoice</h1>
                        <Status refresh={this.getData.bind(this)} booking={booking.booking_id} status={booking.status_id} />
                      </td>
                      <td style={{textAlign: 'right', padding: '0.5em'}}>
                        <h2 style={{fontSize: '14pt', padding: 0, margin: 0, color: '#333'}}>{company.name}</h2>
                        <address><br />{company.address}<br />{company.city}, {company.region}, {company.country_id}, {company.postal_zip}<br />{company.phone}</address>
                      </td>
                    </tr>
                    <tr>
                      <td style={{paddingTop: '1em', fontSize: '10pt'}}>
                        <div className="cf-customer-addr"><strong>{booking.customer_name}</strong><br /><i className="fa fa-envelope"/> {booking.customer_email}<br />{booking.customer_phone}<br />{booking.customer_region}<br />{booking.customer_contry}</div>
                      </td>
                      <td style={{textAlign: 'right', paddingTop: '1em'}}>
                        <table className="invoice_details">
                          <tbody>
                            <tr>
                              <th> Booking ID:</th>
                              <td><strong>{booking.id}</strong></td>
                            </tr>
                            <tr>
                              <th> Created:</th>
                              <td style={{whiteSpace: 'nowrap'}}>{moment(new Date(booking.created_date*1000)).format('MMMM D, YYYY')}</td>
                            </tr>
                            <tr>
                              <th style={{whiteSpace: 'nowrap'}}> Booking Date:</th>
                              <td style={{whiteSpace: 'nowrap'}}>{moment(new Date(booking.start_date*1000)).format('MMMM D, YYYY')}</td>
                            </tr>
                            <tr>
                              <th> Total (CAD):</th>
                              <td style={{whiteSpace: 'nowrap'}}>${booking.total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <table className="item_table" style={{border: 'solid 1px #aaa', textAlign: 'left', width: '100%', margin: 0, fontSize: '9pt'}}>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Rate</th>
                      <th> </th>
                      <th style={{textAlign: 'right', width: '1%'}}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{borderTop: 'solid 1px #000'}}>
                      <td rowSpan={4} colSpan={2} style={{borderRight: 'solid 1px #000', color: '#444'}} />
                      <td className="show-cell-webkit" colSpan={2} style={{height: '100%', padding: 0}} />
                    </tr>
                    <tr className="sum-row border-top">
                      <th>Sub-Total: </th>
                      <td>${booking.sub_total}</td>
                    </tr>
                    <tr className="sum-row border-top">
                      <th>Total: </th>
                      <td className="item_total_price">${booking.total}</td>
                    </tr>
                    <tr className="sum-row">
                      <th>Amount Paid: </th>
                      <td>${booking.amount_paid}</td>
                    </tr>
                  </tbody>
                </table>
                <img src={"https://capstone2017.checkfront.com/images/qr/?id=" + booking.id} alt="Bar code" width={84} height={84} style={{marginTop: 5, background: '#fff', padding: '10px 0 15px', float: 'right'}} />
                <div
                  id="checkfront-policy"
                  style={{padding: '1.25em 0 0 0', color: '#555', margin: '2em 0 0 0', fontSize: '9pt', borderTop: 'solid 1px #f5f5f5'}}
                  dangerouslySetInnerHTML={{__html: policy}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
