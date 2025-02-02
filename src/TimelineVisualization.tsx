import React, { useContext } from 'react'
import { ScenesContext } from './ScenesContext'
import './styles.css'

const TimelineVisualization: React.FC<{
	videoDuration: number
}> = ({ videoDuration }) => {
	const { scenes = [] } = useContext(ScenesContext) ?? {}

	const containerStyle: React.CSSProperties = {
		width: '95%',
		height: '20px',
		backgroundColor: '#ffeded', // светло-красный фон для пропусков
		position: 'relative',
		marginTop: '10px'
	}

	return (
		<div style={containerStyle}>
			{scenes.map((scene, index) => {
				// Показываем промежуток перед текущей сценой (если это не первая сцена)
				const prevSceneEnd = index > 0 ? scenes[index - 1].end : 0
				const gap = scene.start - prevSceneEnd

				return (
					<React.Fragment key={index}>
						{gap > 0 && (
							<div
								style={{
									left: `${(prevSceneEnd / videoDuration) * 100}%`,
									width: `${(gap / videoDuration) * 100}%`,
									position: 'absolute',
									height: '100%',
									backgroundColor: 'red',
									borderRadius: '4px'
								}}
								title={`Gap: ${prevSceneEnd.toFixed(2)} - ${scene.start.toFixed(
									2
								)}`}
							/>
						)}
						<div
							className='scene'
							style={
								{
									left: `${(scene.start / videoDuration) * 100}%`,
									width: `${((scene.end - scene.start) / videoDuration) * 100}%`
								} as React.CSSProperties
							}
							title={`Scene ${index + 1}: ${scene.start.toFixed(
								2
							)} - ${scene.end.toFixed(2)}`}
						/>
					</React.Fragment>
				)
			})}
		</div>
	)
}

export default TimelineVisualization
