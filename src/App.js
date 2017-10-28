import React, {
  Component
} from 'react'
import { BrowserRouter as Router,Route} from 'react-router-dom'
import $ from 'jquery'
import 'jplayer'

import Header from './components/header'
import Player from './route/player'
import AllMusicList from './route/allMusicList'

import {
  MUSIC_LIST
} from './const/musicList.js'


class App extends Component {
  constructor() {
    super();

    this.state = {
      currentMusicItem: MUSIC_LIST[0],
      allMusicList: MUSIC_LIST
    }
  }

  //Dom挂载完成后插入播放器
  componentDidMount() {
    $("#player").jPlayer({
      ready: function() {
        $(this).jPlayer("setMedia", {
          mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"
        }).jPlayer('play');
      },
      supplied: "mp3",
      wmode: "window",
      useStateClassSkin: true
    });

  }

  render() {
    return (
      <div className="App">
        <Header />
        <Player currentMusicItem={this.state.currentMusicItem}/>
        <AllMusicList 
          musicList={this.state.allMusicList}
          currentMusicItem={this.state.currentMusicItem}
        />
      </div>
    );
  }
}

export default App;