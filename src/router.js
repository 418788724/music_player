import React, { Component } from 'react'
import { BrowserRouter as Router,Route} from 'react-router-dom'
import App from './App'
import Player from './route/player'
import AllMusicList from './route/allMusicList'

class Root extends Component {
  render () {
    return (
        <Router>
          <App>
            <Route exact path='/' component={App}/>
          </App>
        </Router>
      )
  }
}

export default Root;
