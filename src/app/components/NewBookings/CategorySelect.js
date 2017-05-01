import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import {getCategoryNames} from '../../utils/apiHelper'

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
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap.bind(this)}
          label={this.getCategoryName(this.props.category)}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <Menu>
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
