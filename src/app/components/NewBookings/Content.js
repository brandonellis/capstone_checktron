import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
//import {render} from 'react-dom'
import BookingDetails from './BookingDetails'
import {getItemList} from '../../utils/apiHelper'
import Image from './Image'
import moment from 'moment'

// in two files > ./Sidebar
const sidebarWidth = 250;

const style = {
  container:{
    overflowY: 'scroll',
    position: 'fixed',
    top: 60,
    left: 250,
    bottom: 0,
    right: 0
  },
  content: {
    //marginLeft: sidebarWidth,
    paddingLeft: 15,
    paddingRight: 15,
    position: 'relative'
  },
  col1: {

  },
  col2: {
    textAlign: 'right',
    width: '30%'
  },
  col3: {
    textAlign: 'center',
    width: '1%'
  },
  center: {
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    display: 'block',
  },
}

export class Content extends Component{
  constructor(props){
    super(props)
    this.state = {
      open: false,
      item: 0
    }
  }
  handleOpen(item){
    this.setState({open: true, item: item})
  }

  handleClose(){
    this.setState({open: false})
  }

  handleBook(){
    this.setState({open: false})
  }
  componentDidMount() {
    getItemList(
      this.props.start,
      this.props.end,
      this.props.category,
      this.setItemsState.bind(this)
    )
  }
  setItemsState(itemList){
    this.setState({items: itemList})
  }
  date(){
    if(this.props.start === this.props.end){
      return moment(this.props.start, 'YYYYMMDD').format('ddd MMM DD')
    }else if(this.props.start.substring(0, 4) === this.props.end.substring(0, 4)){
      return(
        moment(this.props.start, 'YYYYMMDD').format('ddd MMM DD') +
        ' - ' +
        moment(this.props.end, 'YYYYMMDD').format('ddd MMM DD, YYYY')
      )
    }else{
      return(
        moment(this.props.start, 'YYYYMMDD').format('ddd MMM DD, YYYY') +
        ' - ' + // &nbsp; shows up
        moment(this.props.end, 'YYYYMMDD').format('ddd MMM DD, YYYY')
      )
    }
  }
  itemTable(){
    if(this.state.items === undefined){
      return <CircularProgress size={112} thickness={7} style={style.center} />
    }else if(this.state.items === null){
      return(
        <div className="alert alert-danger">
          <strong>Could Not Connect</strong>
        </div>
      )
    }else if(this.state.items.length > 0){
      return(
        <table style={{maxWidth: 1365, marginBottom: 20}}>
          <thead><tr>
            <th style={style.col1}>Item</th>
            <th style={style.col2}>Price</th>
            <th style={style.col3}>Status</th>
          </tr></thead>
          <tbody>
            {this.state.items.map((item) => {
              var price = item.price
              if(price === '$0.00' ||
                typeof(price) !== 'string'){
                  if(item.total === '$0.00' ||
                    item.total === null){
                      price = '-'
                    }else{
                    price = item.total
                    }
              }
              return (
                <tr key={item.id}>
                  <td style={style.col1}>
                    <a
                      href='#'
                      onClick={e=>{
                        e.preventDefault()
                        this.handleOpen(item.id)
                      }}
                      style={{paddingBottom: 6, display: 'block'}}
                    >
                      <Image image={item.image} giftCert={item.giftCert} />
                      <div style={{display: 'inline-block', paddingLeft: 6, paddingBottom: 4, color: '#000'}}>
                        <h2 style={{marginTop: 5, marginBottom: 0}}>{item.name}</h2>
                        <em>{item.sku}</em>
                      </div>
                    </a>
                  </td>
                  <td style={style.col2}>{price}</td>
                  <td style={style.col3}>
                    <div className={'ct-item-status ' + item.status}>
                      {item.avail}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }else{
      return(
        <div className="alert alert-warning">
          <strong>No Available Items</strong>
        </div>
      )
    }
  }
  render(){

    const actions = false/* [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ]
    */
    return(
      <div style={style.container}>
        <div style={style.content}>
          <h1>
            New Booking:
            &nbsp;&nbsp;
            {this.date()}
          </h1>
          {this.itemTable()}
        </div>
        <div id='booking-dialog'></div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
          contentStyle={{transform:''}}
        >
          <BookingDetails
            item={this.state.item}
            start_date={this.props.start}
            end_date={this.props.end}
            close={this.handleClose.bind(this)}
          />
        </Dialog>
      </div>
    )
  }
}

export default Content
