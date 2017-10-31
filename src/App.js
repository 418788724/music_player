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
import {
  randomRange
} from './utils/util.js'


let repeatTypeList = [
  'once',
  'cycle',
  'random'
]

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentMusicItem: MUSIC_LIST[4],
      musicList: MUSIC_LIST,
      repeatType: 'once'
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
    }

    this.PlayMusic(this.state.musicList[newIndex])

    this.setState({
      currentMusicItem: this.state.musicList[newIndex]
    })
  }

  changeRepeate() {
    if (this.state.repeatType === 'once') {
      this.PlayMusic(this.state.currentMusicItem)
    } else if (this.state.repeatType === 'cycle') {
      this.NextMusic()
    } else if (this.state.repeatType === 'random') {
      let Index = this.state.musicList.indexOf(this.state.currentMusicItem);
      let randomIndex = randomRange(0, this.state.musicList.length - 1);
      while (randomIndex === Index) {
        randomIndex = randomRange(0, this.state.musicList.length - 1);
      }
      console.log(Index + 'and' + randomIndex)

      this.setState({
        currentMusitItem: this.state.musicList[randomIndex]
      })
      this.PlayMusic(this.state.musicList[randomIndex]);
    }
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
      this.changeRepeate()
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

    //上一首或下一首
    Pubsub.subscribe('PREV_MUSIC', (msg) => {
      this.NextMusic('prev')
    })

    Pubsub.subscribe('NEXT_MUSIC', (msg) => {
      this.NextMusic()
    })

    //音乐循环播放类型
    Pubsub.subscribe('CHANGE_REPEATE', () => {
      let index = repeatTypeList.indexOf(this.state.repeatType)
      index = (index + 1) % repeatTypeList.length

      this.setState({
        repeatType: repeatTypeList[index]
      })
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
                    repeatType={this.state.repeatType}
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