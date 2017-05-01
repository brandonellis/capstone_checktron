import React, { Component } from 'react'
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
  status: {
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#d4f296',
    borderRadius: 5,
    textTransform: 'uppercase',
    fontSize: '0.8em',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingLeft: 8,
    paddingBottom: 5,
    paddingRight: 8,
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
  }
}

export class Content extends Component{
  componentDidMount() {
    getItemList(
      this.props.start,
      this.props.end,
      this.props.category,
      this.setItemsState.bind(this)
    )
  }
  setItemsState(itemList){
    //TODO: check list here
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
    if(this.state != null){
      return(
        <table style={{maxWidth: 1365}}>
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
                    <a href='#' onClick={e=>e.preventDefault()} style={{paddingBottom: 6, display: 'block'}}>
                      <Image image={item.image}/>
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
      return <p className='alert'>Nothing</p>
    }
  }
  render(){
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
      </div>
    )
  }
}

export default Content
