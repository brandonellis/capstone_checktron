import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'

// Containers
import Dashboard from './containers/Dashboard'
import BookingIndex from './containers/BookingIndex'
import NewBooking from './containers/NewBooking'
import BookingForm from './containers/BookingForm'

// Needed for onTouchTap
injectTapEventPlugin();

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path='booking' component={NewBooking} />
      <Route path='index' component={BookingIndex} />
      <Route path='booking_form' component={BookingForm} />
    </Route>
  </Router>,
  document.getElementById('app')
)
