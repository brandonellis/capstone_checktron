import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
//import {render} from 'react-dom'
import BookingDetails from './BookingDetails'
import {getItemList} from '../../utils/apiHelper'
import Image from './Image'
import moment from 'moment'

// in two files > ./Sidebar
const sidebarWidth = 250;

const style = {
  container:{
    overflowY: 'auto',
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
  col1: {  },
  col2: {
    textAlign: 'right',
    width: '1px',
    whiteSpace: 'nowrap',
    fontSize: '16px'
  },
  col3: {
    textAlign: 'center',
    width: '15%'
  },
  thCol1: {
    fontSize: '18px',
    color: '#434343',
  },
  thCol2: {
    textAlign: 'right',
    width: '1px',
    whiteSpace: 'nowrap',
    fontSize: '18px',
    color: '#434343',
  },
  thCol3: {
    textAlign: 'center',
    width: '15%',
    fontSize: '18px',
    color: '#434343',
  },
  center: {
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    display: 'block',
  },
  tableHeader: {
    fontSize: "24px"
  },
  bookingDetailsWindow: {
    margin: '0px',
    padding: '0px',
  }
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
      return moment(this.props.start, 'YYYYMMDD').format('dddd, MMMM Do YYYY')
    }else if(this.props.start.substring(0, 4) === this.props.end.substring(0, 4)){
      return(
        moment(this.props.start, 'YYYYMMDD').format('dddd, MMMM Do YYYY') +
        ' - ' +
        moment(this.props.end, 'YYYYMMDD').format('dddd, MMMM Do YYYY')
      )
    }else{
      return(
        moment(this.props.start, 'YYYYMMDD').format('dddd, MMMM Do YYYY') +
        ' - ' + // &nbsp; shows up
        moment(this.props.end, 'YYYYMMDD').format('dddd, MMMM Do YYYY')
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
        <Table style={{maxWidth: 1365, marginBottom: 20, tableLayout: 'auto', border:'1px solid #ddd',}} fixedHeader={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow style={{backgroundColor: "#eee"}}>
              <TableHeaderColumn style={style.thCol1}>Item</TableHeaderColumn>
              <TableHeaderColumn style={style.thCol2}>Price</TableHeaderColumn>
              <TableHeaderColumn style={style.thCol3}>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
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
                <TableRow key={item.id} className='hover'>
                  <TableRowColumn style={style.col1}>
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
                        <h2 style={{marginTop: 5, marginBottom: 0,fontSize:"17px",}}>{item.name}</h2>
                        <em>{item.sku}</em>
                      </div>
                    </a>
                  </TableRowColumn>
                  <TableRowColumn style={style.col2}>
                      {price}
                  </TableRowColumn>
                  <TableRowColumn style={style.col3}>
                    <div className={'ct-item-status ' + item.status}>
                      {item.avail}
                    </div>
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
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
    const actions = false
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
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <BookingDetails style={style.bookingDetailsWindow}
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
