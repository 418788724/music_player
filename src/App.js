import React, {
  Component
} from 'react'
import $ from 'jquery'
import 'jplayer'
import Pubsub from 'pubsub-js'

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
      musicList: MUSIC_LIST
    }
  }

  //播放音乐
  PlayMusic(item) {
    $("#player").jPlayer('setMedia', {
      mp3: item.file
    }).jPlayer('play')

    //// //更新数据
    this.setState({
      currentMusicItem: item
    })
  }

  //Dom挂载完成后插入播放器
  componentDidMount() {
    $("#player").jPlayer({
      supplied: "mp3",
      wmode: "window",
      useStateClassSkin: true
    });

    this.PlayMusic(this.state.currentMusicItem)

    //事件订阅
    Pubsub.subscribe('DELETE_MUSIC', (msg, item) => {
      this.setState({
        musicList: this.state.musicList.filter((value) => {
          return value !== item
        })
      })
    })

    Pubsub.subscribe('PLAY_MUSIC', (msg, item) => {
      this.PlayMusic(item)
    })

  }

  componentWillUnmount() {
    Pubsub.unsubscribe('DELETE_MUSIC')
    Pubsub.unsubscribe('PLAY_MUSIC')
  }

  render() {
    return (
      <div className="App">
        <Header />
       {window.location.pathname==='/list'?
       <AllMusicList musicList={this.state.musicList} currentMusicItem={this.state.currentMusicItem}/>:
       <Player currentMusicItem={this.state.currentMusicItem}/>}
        
      </div>
    );
  }
}

export default App;