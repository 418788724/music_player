import React, { Component } from 'react'
import MusicListItem from '../components/musicListItem'

class AllMusicList extends Component {
	render () {
		let elemusic = null
		console.log(111,this)
		let musicList = this.props.musicList
		let currentMusicItem = this.props.currentMusicItem
		
		elemusic = musicList.map((item) => {
			return <MusicListItem 
						musicListItem={item} 
						key={item.id}
						focus={currentMusicItem===item}
					/>
		})

		return (
				<div>{elemusic}</div>
			)
		
	}
}

export default AllMusicList