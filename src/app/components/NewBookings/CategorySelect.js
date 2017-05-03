import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import {getCategoryNames} from '../../utils/apiHelper'

const style = {
  btn:{
    width: '100%'
  },
  btnText: {
    float: 'left'
  },
  btnCaret: {
    marginTop: 9,
    float: 'right'
  }
}
/*
  PROPS:
    function setCategory,
    var category
*/
export class CategorySelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      categories: [{id: 0, name:'All'}]
    }
  }
  componentDidMount() {
    getCategoryNames(this.setCategories.bind(this))
  }
  setCategories(categoryNames){
    categoryNames.unshift({id: 0, name:'All'})
    this.setState({categories: categoryNames})
  }
  handleTouchTap(event){
    event.preventDefault()
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }
  handleRequestClose(){
    this.setState({
      open: false,
    })
  }
  getCategoryName(id){
    for(var i in this.state.categories){
      if(this.state.categories[i].id == id){
        return this.state.categories[i].name
      }
    }
    return 'All'
  }

  render() {
    return (
      <div style={{marginBottom: 10}}>
        <button style={style.btn} className="btn btn-default drop"
          onTouchTap={this.handleTouchTap.bind(this)}
        >
          <span style={style.btnText}>
            {this.getCategoryName(this.props.category)}
          </span>
          <span style={style.btnCaret} className="caret"></span>
        </button>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}
          animation={PopoverAnimationVertical}
        >
          <Menu autoWidth={false} listStyle={{width: 218}}>
            {this.state.categories.map(category=>{
              return(
                <MenuItem
                  key={category.id}
                  primaryText={category.name}
                  onTouchTap={(e=>{
                    e.preventDefault()
                    this.props.setCategory(category.id)
                  }).bind(this)}
                />
              )
            })}
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default CategorySelect
