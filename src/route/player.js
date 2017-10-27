import React, {
	Component
} from 'react'
import {
	Link
} from 'react-router-dom'
import $ from 'jquery'
import 'jplayer'

import './player.css'

import Progress from '../components/progress'

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
			<div className="player-page">
                <h1 className="caption">我的私人音乐坊 </h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                		<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">时间</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                				<div className="volume-wrapper">
					                音量
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px'}}>
			               播放进度
                		</div>
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev" onClick={this.prev}></i>
	                			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
	                			<i className="icon next ml20" onClick={this.next}></i>
                			</div>
                			<div className="-col-auto">
                				<i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
                			</div>
                		</div>
                	</div>
					<div className="-col-auto cover">
						<img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
					</div>
                </div>
                
            </div>
		);
	}

}

export default Player