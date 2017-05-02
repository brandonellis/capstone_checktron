import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'

const style = {
  center: {
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
  },
}
export default class BookingDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      loading: true,
    }
  }

  handleOpen(){
    this.setState({open: true, loading: true})
  }

  handleClose(){
    this.setState({open: false, loading: true})
  }
  content(){
    if(this.state.loading){
      //api call here
      return <CircularProgress size={80} thickness={5} style={style.center} />
    }else{
      return this.props.item_id
    }
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ]

    return (
      <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.content()}
        </Dialog>
      </div>
    )
  }
}
