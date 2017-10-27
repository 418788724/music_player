import React, {
  Component
} from 'react';
import Header from './components/header'
import Progress from './components/progress'
import $ from 'jquery'
import 'jplayer'

let duration = null

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0
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

    //播放进度时间
    $("#player").bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration //歌曲总时间
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
      });
    });
  }

  //事件的解绑
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }

  progressChangeHandler(p) {
    $('#player').jPlayer('play', duration * p)
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Progress 
          progress={this.state.progress}
          onProgressChange={this.progressChangeHandler}
        />
      </div>
    );
  }
}

export default App;