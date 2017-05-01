import React, { Component } from 'react'
import {getItemList} from '../../utils/apiHelper'
import {config} from '../../config/config'
import moment from 'moment'

// in two files > ./Sidebar
const sidebarWidth = 250;

const style = {
  content: {
    marginLeft: sidebarWidth,
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
        <table>
        <thead><tr><th>Item</th><th>Price</th><th>Status</th></tr></thead>
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
                  <td>
                    {(()=>{
                      if(typeof(item.image) === 'object'){
                        for(var key in item.image){
                          return (
                            <div>
                              <img src={config.api.base + "media/S" + item.image[key].src + ".jpg"}/>
                            </div>
                          )
                        }
                      }
                    })()}
                    <h2>{item.name}</h2>
                    <em>{item.sku}</em>
                  </td>
                  <td>{price}</td>
                  <td>
                    <div className={item.status}>
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
      <div style={style.content}>
        <h1>
          New Booking:
          &nbsp;&nbsp;
          {this.date()}
        </h1>
        {this.itemTable()}
      </div>
    )
  }
}

export default Content
