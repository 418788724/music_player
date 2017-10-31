import React, {
	Component
} from 'react'
import {
	Link
} from 'react-router-dom'
import $ from 'jquery'
import 'jplayer'
import Pubsub from 'pubsub-js'

import './player.css'

import Progress from '../components/progress'

let duration = null

class Player extends Component {
	constructor(props) {
		super(props);

		this.state = {
			progress: 0,
			volume: 0,
			isPlay: true,
			leftTime: '0:00'
		}
	}

	formatTime(time) {
		let minutes = Math.floor(time / 60)
		let seconds = Math.floor(time % 60)
		seconds = seconds < 10 ? `0${seconds}` : seconds
		return `${minutes}: ${seconds}`
	}


	//播放进度时间
	componentDidMount() {
		$("#player").bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration //歌曲总时间

			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute,
				volume: e.jPlayer.options.volume * 100,
				leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
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

	//鼠标点击切换音量大小
	volumeChangeHandler(p) {
		$('#player').jPlayer('volume', p)
	}

	//控制歌曲的暂停和播放
	play() {
		console.log('play', this)
		if (this.state.isPlay) {
			$('#player').jPlayer('pause')
		} else {
			$('#player').jPlayer('play')
		}

		//更新state值
		this.setState({
			isPlay: !this.state.isPlay
		})
	}

	prev() {
		console.log('arrow', this)
		Pubsub.publish('PREV_MUSIC')
	}

	next() {
		Pubsub.publish('NEXT_MUSIC')
	}

	changeRepeat() {
		Pubsub.publish('CHANGE_REPEATE')
	}

	render() {
		return (
			<div className="player-page">
                <h1 className="caption"><Link to='/list'>我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                		<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">-{this.state.leftTime}</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
								<div className="volume-wrapper" style={{position:'relative',top:3}}>
					                <Progress 
					                	progress={this.state.volume}
					                	onProgressChange={this.volumeChangeHandler}
					                	bgColor='gray'
					                />
                				</div>
                			</div>
                		</div>
						<div style={{height: '10px', lineHeight: '10px', marginTop: '20px'}}>
			               <Progress 
			               		progress={this.state.progress}
			               		onProgressChange={this.progressChangeHandler}
			               		bgColor='green'
			               />
                		</div>
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev" onClick={this.prev.bind(this)}></i>
								<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>
	                			<i className="icon next ml20" onClick={this.next.bind(this)}></i>
                			</div>
                			<div className="-col-auto">
                				<i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat.bind(this)}></i>
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