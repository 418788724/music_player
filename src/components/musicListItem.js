import React, {
	Component
} from 'react'
import './musicListItem.css'
import Pubsub from 'pubsub-js'

class MusicListItem extends Component {

	playMusic(item) {
		Pubsub.publish('PLAY_MUSIC', item)
	}

	deleteMusic(item) {
		Pubsub.publish('DELETE_MUSIC', item)
	}


	render() {
		let item = this.props.musicListItem

		return (
			<li onClick={this.playMusic.bind(this,item)} className={`row components-listitem ${this.props.focus ? 'focus' : ''}`} >
	                <p><span className="bold">{item.title}</span>  -  {item.artist}</p>
	                <p onClick={this.deleteMusic.bind(this,item)} className="-col-auto delete"></p>
	        </li>
		)
	}
}

export default MusicListItem