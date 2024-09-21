import React, { createContext, useState, useEffect, ReactNode } from 'react'

interface Scene {
	start: number
	end: number
	title: string
}

interface ScenesContextType {
	scenes: Scene[]
	setScenes: React.Dispatch<React.SetStateAction<Scene[]>>
}

export const ScenesContext = createContext<ScenesContextType | undefined>(
	undefined
)

interface ScenesProviderProps {
	children: ReactNode
}

export const ScenesProvider: React.FC<ScenesProviderProps> = ({ children }) => {
	const [scenes, setScenes] = useState<Scene[]>(() => {
		const storedScenes = localStorage.getItem('scenes')
		return storedScenes ? JSON.parse(storedScenes) : []
	})

	useEffect(() => {
		localStorage.setItem('scenes', JSON.stringify(scenes))
	}, [scenes])

	return (
		<ScenesContext.Provider value={{ scenes, setScenes }}>
			{children}
		</ScenesContext.Provider>
	)
}
