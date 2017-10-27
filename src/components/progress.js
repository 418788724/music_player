import React from 'react'
import './progress.css'

class Progress extends React.Component {
	changeProgress(e) {
		let progressBar = this.refs.progressBar
		let newProgress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		console.log(newProgress)

		this.props.onProgressChange && this.props.onProgressChange(newProgress)
	}

	render() {
		return (
			<div className='components-progress' ref='progressBar' onClick={this.changeProgress.bind(this)}>
					<div className="progress" style={{width:`${this.props.progress}%`,background:this.props.bgColor}}></div>
				</div>
		)
	}
}

export default Progress