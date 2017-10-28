import React, { Component } from 'react'
import App from 'App'
import AllMusicList from './route/allMusicList'

class Root extends Component {
  render () {
    return (
        <Router>
          <Route>
            <Route path='/' component={App}></Route>
            <Route path='/list' component={AllMusicList}></Route>
          </Route>
          
        </Router>
      )
  }
}

export default Root;