import React from 'react'

export interface Scene {
	start: number
	end: number
	title: string
}

interface SceneRowProps {
	index: number
	scene: {
		start: number
		end: number
		title: string
	}
	onSceneChange: (
		index: number,
		key: keyof Scene,
		value: string | number
	) => void
	onRemoveScene: (index: number) => void
}

const SceneRow: React.FC<SceneRowProps> = ({
	index,
	scene,
	onSceneChange,
	onRemoveScene
}) => {
	return (
		<tr>
			<td>{index + 1}</td>
			<td>
				<input
					type='number'
					step='0.01'
					value={scene.start}
					onChange={e => onSceneChange(index, 'start', e.target.value)}
					onFocus={() => onSceneChange(index, 'start', scene.start)}
					style={{ width: 70 }}
				/>
			</td>
			<td>
				<input
					type='number'
					step='0.01'
					value={scene.end}
					onChange={e => onSceneChange(index, 'end', e.target.value)}
					onFocus={() => onSceneChange(index, 'end', scene.end)}
					style={{ width: 70 }}
				/>
			</td>
			<td>
				<div>{(scene.end - scene.start).toFixed(2)}</div>
			</td>
			<td>
				<input
					type='text'
					value={scene.title}
					onChange={e => onSceneChange(index, 'title', e.target.value)}
				/>
			</td>

			<td>
				<button onClick={() => onRemoveScene(index)}>x</button>
			</td>
		</tr>
	)
}

export default SceneRow
