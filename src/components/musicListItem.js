import React, { Component } from 'react'
import './musicListItem.css'

class MusicListItem extends Component {

	render () {
		let item = this.props.musicListItem

		return (
				<li className={`row components-listitem ${this.props.focus ? 'focus' : ''}`} >
	                <p><span className="bold">{item.title}</span>  -  {item.artist}</p>
	                <p className="-col-auto delete"></p>
	            </li>
			)
	}
}

export default MusicListItem