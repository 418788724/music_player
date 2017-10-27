import React, {
	Component
} from 'react'
import Progress from '../components/progress'
import $ from 'jquery'
import 'jplayer'

let duration = null

class Player extends Component {
	constructor(props) {
		super(props);

		this.state = {
			progress: 0
		}
	}

	//播放进度时间
	componentDidMount() {
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

	//鼠标点击切换播放进度
	progressChangeHandler(p) {
		$('#player').jPlayer('play', duration * p)
	}

	render() {
		return (
			<div className="App">
		    <Progress 
		      progress={this.state.progress}
		      onProgressChange={this.progressChangeHandler}
		      bgColor='#2f9842'
		    />
		  </div>
		);
	}

}

export default Player