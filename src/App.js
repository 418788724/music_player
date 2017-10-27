import React, {
  Component
} from 'react';
import Header from './components/header'
import Player from './route/player'
import $ from 'jquery'
import 'jplayer'


class App extends Component {

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
        <Player />
      </div>
    );
  }
}

export default App;