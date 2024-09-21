import React, { useContext } from 'react'
import SceneRow, { Scene } from './SceneRow'
import { ScenesContext } from './ScenesContext'

interface ScenesTableProps {
	videoRef: React.RefObject<HTMLVideoElement>
}

const ScenesTable: React.FC<ScenesTableProps> = ({ videoRef }) => {
	const context = useContext(ScenesContext)

	if (!context) {
		throw new Error('ScenesTable must be used within a ScenesProvider')
	}

	// Update the context type
	const { scenes, setScenes } = context as {
		scenes: Scene[]
		setScenes: React.Dispatch<React.SetStateAction<Scene[]>>
	}

	// Update the handleSceneChange function
	const handleSceneChange = (
		index: number,
		key: keyof Scene,
		value: string | number
	) => {
		const updatedScenes = [...scenes]
		updatedScenes[index] = {
			...updatedScenes[index],
			[key]: key === 'title' ? (value as string) : parseFloat(value as string)
		}

		if (key === 'start' || key === 'end') {
			videoRef.current!.currentTime = parseFloat(value as string)
		}

		setScenes(updatedScenes)
	}

	const removeScene = (index: number) => {
		const updatedScenes = scenes.filter((_, i) => i !== index)
		setScenes(updatedScenes)
	}

	return (
		<table>
			{/* 			<thead>
				<tr>
					<th>Scene Start</th>
					<th>Scene End</th>
					<th>Scene Title</th>
					<th>Action</th>
				</tr>
			</thead> */}
			<tbody>
				{scenes
					.sort((a, b) => a.start - b.start)
					.map((scene, index) => (
						<SceneRow
							key={index}
							index={index}
							scene={scene}
							onSceneChange={handleSceneChange}
							onRemoveScene={removeScene}
						/>
					))}
			</tbody>
		</table>
	)
}

export default ScenesTable
