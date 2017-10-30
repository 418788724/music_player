import React, {
  Component
} from 'react'
import $ from 'jquery'
import 'jplayer'
import Pubsub from 'pubsub-js'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
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
      currentMusicItem: MUSIC_LIST[4],
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

  NextMusic(type = 'next') {
    let index = this.state.musicList.indexOf(this.state.currentMusicItem)
    let newIndex = null
    if (type === 'next') {
      newIndex = (index + 1) % this.state.musicList.length
    } else {
      newIndex = (index + this.state.musicList.length - 1) % this.state.musicList.length
        //console.log(newIndex)
    }

    this.PlayMusic(this.state.musicList[newIndex])

    this.setState({
      currentMusicItem: this.state.musicList[newIndex]
    })
  }

  //Dom挂载完成后插入播放器
  componentDidMount() {
    $("#player").jPlayer({
      supplied: "mp3",
      wmode: "window",
      useStateClassSkin: true
    });

    //初始化播放
    this.PlayMusic(this.state.currentMusicItem)

    //自动播放下一首
    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.NextMusic()
    })

    //删除歌曲
    Pubsub.subscribe('DELETE_MUSIC', (msg, item) => {
      this.NextMusic('next')

      this.setState({
        musicList: this.state.musicList.filter((value) => {
          return value !== item
        })
      })
    })

    //播放选中音乐
    Pubsub.subscribe('PLAY_MUSIC', (msg, item) => {
      this.PlayMusic(item)
    })

    //
    Pubsub.subscribe('PREV_MUSIC', (msg) => {
      this.NextMusic('prev')
    })

    Pubsub.subscribe('NEXT_MUSIC', (msg) => {
      this.NextMusic()
    })

  }

  //事件解绑？？？
  componentWillUnmount() {
    Pubsub.unsubscribe('DELETE_MUSIC')
    Pubsub.unsubscribe('PLAY_MUSIC')
    Pubsub.unsubscribe('PREV_MUSIC')
    Pubsub.unsubscribe('NEXT_MUSIC')
    $('#player').unbind($.jPlayer.event.ended);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
            <Router>
            <div className="App">
                <Route exact
                  path="/" 
                  render={()=><Player
                    currentMusicItem={this.state.currentMusicItem}
                  />}
                ></Route>
                <Route exact
                  path="/list" 
                  render={()=><AllMusicList
                    currentMusicItem={this.state.currentMusicItem}
                    musicList={this.state.musicList}
                  />}
                ></Route>              
             </div>
            </Router>          
        </div>
      </Router>
    );
  }
}

export default App;