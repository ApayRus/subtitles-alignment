import React, { useState, useEffect, useRef } from 'react'
import VideoPlayer from './VideoPlayer'
import ScenesTable from './ScenesTable'
import Controls from './Controls'
import { ScenesProvider } from './ScenesContext'

const Scenes: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [currentTime, setCurrentTime] = useState<number>(0)

	useEffect(() => {
		const handleTimeUpdate = () => {
			if (videoRef.current) {
				setCurrentTime(parseFloat(videoRef.current.currentTime.toFixed(2)))
			}
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			const video = videoRef.current
			if (!video) return

			if (event.key === 'ArrowRight') {
				if (event.shiftKey) {
					video.currentTime += 0.5
				} else if (event.ctrlKey) {
					video.currentTime += 0.01
				} else {
					video.currentTime += 5
				}
			} else if (event.key === 'ArrowLeft') {
				if (event.shiftKey) {
					video.currentTime -= 0.5
				} else if (event.ctrlKey) {
					video.currentTime -= 0.01
				} else {
					video.currentTime -= 5
				}
			} else if (
				event.key === ' ' &&
				event.target instanceof HTMLElement &&
				event.target.tagName !== 'INPUT'
			) {
				event.preventDefault()
				video.paused ? video.play() : video.pause()
			}
		}

		const video = videoRef.current
		if (video) {
			video.addEventListener('timeupdate', handleTimeUpdate)
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			if (video) {
				video.removeEventListener('timeupdate', handleTimeUpdate)
			}
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return (
		<ScenesProvider>
			<div>
				<div
					style={{
						width: '49%',
						display: 'inline-block',
						position: 'sticky',
						top: 1,
						verticalAlign: 'top'
					}}
				>
					<VideoPlayer ref={videoRef} videoFile={`media.mp4`} />
					<Controls videoRef={videoRef} />
					<div id='currentTime'>Current Time: {currentTime.toFixed(2)}</div>
				</div>
				<div style={{ width: '49%', display: 'inline-block' }}>
					<ScenesTable videoRef={videoRef} />
				</div>
			</div>
		</ScenesProvider>
	)
}

export default Scenes
