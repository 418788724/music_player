import React, { Component } from 'react'
import App from 'App'
import AllMusicList from './route/allMusicList'

class Root extends Component {
  render () {
    return (
        <Router>
          <Route path='/' component={App}>
            <Route path='/list' component={AllMusicList}></Route>
          </Route>
          
        </Router>
      )
  }
}

export default Root;