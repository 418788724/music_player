import React, { Component } from 'react'
import { BrowserRouter as Router,Route} from 'react-router-dom'
import App from './App'
import AllMusicList from './route/allMusicList'

class Root extends Component {
  render () {
    return (
        <Router>
          <div>
            <Route path='/' component={App}></Route>
            <Route path='/list' component={AllMusicList}></Route>
          </div>
        </Router>
      )
  }
}

export default Root;