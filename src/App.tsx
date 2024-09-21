// src/App.tsx
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Scenes from './Scenes'
import Subtitles from './Subtitles'

const App: React.FC = () => {
	return (
		<Router>
			<nav>
				<ul>
					<li>
						<Link to='/subtitles'>Subtitles</Link>
					</li>
					<li>
						<Link to='/scenes'>Scenes</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path='/subtitles' element={<Subtitles />} />
				<Route path='/scenes' element={<Scenes />} />
			</Routes>
		</Router>
	)
}

export default App
