import React, { useState, useRef, useEffect } from 'react'
import { parseSubs } from 'frazy-parser'

const LinedTextarea: React.FC = () => {
	const lt = localStorage.getItem('leftText') || ''
	const rt = localStorage.getItem('rightText') || ''
	const [leftText, setLeftText] = useState(lt)
	const [rightText, setRightText] = useState(rt)
	const leftTextareaRef = useRef<HTMLTextAreaElement>(null)
	const rightTextareaRef = useRef<HTMLTextAreaElement>(null)

	const copyTimingToClipboard = () => {
		const timing = localStorage.getItem('timing') || ''
		navigator.clipboard
			.writeText(timing)
			.then(() => alert('Timing copied to clipboard!'))
			.catch(err => console.error('Error copying scenes:', err))
	}

	const textFromSubs = (subs: string) => {
		const phrases = parseSubs(subs, false)
		const result = phrases.reduce(
			(prev, item) => {
				const { start, end, body } = item
				const newLineText = `${body.replace(/\n/g, '<br />')}`
				const newLineTiming = `${start.toFixed(2)}\t${end.toFixed(2)}`
				return {
					text: prev.text + newLineText + '\n',
					timing: prev.timing + newLineTiming + '\n'
				}
			},
			{ text: '', timing: '' }
		)
		return result
	}

	useEffect(() => {
		localStorage.setItem('leftText', leftText)
		localStorage.setItem('rightText', rightText)
	}, [leftText, rightText])

	// Обработчики для кнопок Parse
	const handleLeftParse = () => {
		if (leftTextareaRef?.current) {
			const { text, timing } = textFromSubs(leftText)
			setLeftText(text)
			localStorage.setItem('timing', timing)
		}
	}

	const handleRightParse = () => {
		if (rightTextareaRef?.current) {
			const { text } = textFromSubs(rightText)
			setRightText(text)
		}
	}

	return (
		<div>
			<button style={{ marginLeft: '10px' }} onClick={copyTimingToClipboard}>
				Copy timing to clipboard
			</button>

			<div style={styles.container}>
				<div style={styles.textareaContainer}>
					<button onClick={handleLeftParse}>Parse Left</button>
					<textarea
						ref={leftTextareaRef}
						style={styles.textarea}
						value={leftText}
						onChange={e => setLeftText(e.target.value)}
						rows={leftText.split('\n').length || 1}
					/>
				</div>
				<div style={styles.textareaContainer}>
					<button onClick={handleRightParse}>Parse Right</button>
					<textarea
						ref={rightTextareaRef}
						style={styles.textarea}
						value={rightText}
						onChange={e => setRightText(e.target.value)}
						rows={rightText.split('\n').length || 1}
					/>
				</div>
			</div>
		</div>
	)
}

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '10px'
	} as React.CSSProperties,
	textareaContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '50%'
	} as React.CSSProperties,
	textarea: {
		height: 'auto',
		minHeight: '50px',
		resize: 'none',
		overflow: 'hidden',
		paddingLeft: '10px',
		lineHeight: '1.5em',
		border: '1px solid #ccc',
		fontSize: '16px',
		fontFamily: 'monospace',
		whiteSpace: 'nowrap',
		backgroundImage: `linear-gradient(
      to bottom,
      transparent 97%,
      rgba(0, 0, 0, 0.1) 98%,
      rgba(0, 0, 0, 0.1) 100%
    )`,
		backgroundSize: '100% 1.5em'
	} as React.CSSProperties
}

export default LinedTextarea
