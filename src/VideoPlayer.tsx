import React, { forwardRef } from 'react'

interface VideoPlayerProps {
	videoFile: string
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
	({ videoFile }, ref) => {
		return (
			<video ref={ref} controls width={600}>
				<source src={`/videos/${videoFile}`} type='video/mp4' />
				Your browser does not support the video tag.
			</video>
		)
	}
)

export default VideoPlayer
