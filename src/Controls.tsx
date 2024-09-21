import React, { useContext } from 'react'
import { ScenesContext } from './ScenesContext'

interface ControlsProps {
	videoRef: React.RefObject<HTMLVideoElement>
}

const Controls: React.FC<ControlsProps> = ({ videoRef }) => {
	const context = useContext(ScenesContext)

	if (!context) {
		throw new Error('Controls must be used within a ScenesProvider')
	}

	const { scenes, setScenes } = context

	const addScene = () => {
		if (videoRef.current) {
			const current = parseFloat(videoRef.current.currentTime.toFixed(2))
			const newScene = { start: current, end: current, title: '' }
			setScenes([...scenes, newScene])
		}
	}

	const copyScenesToClipboard = () => {
		const scenesText = localStorage.getItem('scenes') || ''
		navigator.clipboard
			.writeText(scenesText)
			.then(() => alert('Scenes copied to clipboard!'))
			.catch(err => console.error('Error copying scenes:', err))
	}

	const clearLocalStorage = () => {
		localStorage.removeItem('scenes')
		setScenes([])
		alert('Local Storage cleared!')
	}

	return (
		<div>
			<button onClick={addScene}>Add Scene</button>
			<button onClick={copyScenesToClipboard}>Copy Scenes to Clipboard</button>
			<button onClick={clearLocalStorage}>Clear Local Storage</button>
		</div>
	)
}

export default Controls
