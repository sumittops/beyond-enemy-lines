import { useState, useEffect } from "react";

const FLAG_OFFSET_WINDOW = 100;
const PIXEL_INC = 10;

type GameType = {
    distance: number, 
    direction: string,
    isRunning: boolean
}

export default function useGame (): GameType {
    const [direction, setDirection] = useState("right");
	const [distance, setDistance] = useState(0);
	const [isRunning, setRunning] = useState(false);
    const bombingRange = [100, window.innerWidth - FLAG_OFFSET_WINDOW];
	function toggleRunning() {
		setRunning(!isRunning)
	}

	function checkRunning(nextDirection) {
		if (direction !== nextDirection || !isRunning) {
			toggleRunning()
		}
	}

	function changeDirection(event) {
		if (event.keyCode === 39) {
			setDirection("right");
			checkRunning("right");	
		}
		if (event.keyCode === 37) {
			setDirection("left");
			checkRunning("left");
		}
	}

	useEffect(() => {
		function cleanup(hasWon?: boolean) {
			window.removeEventListener('keydown', changeDirection);
			clearInterval(interval);
		}
		function move() {
			if (isRunning) {
				const increment = direction === "left" ? -PIXEL_INC : PIXEL_INC;
				const nextDistance = distance + increment;
				if (nextDistance > 0 && nextDistance < window.innerWidth - FLAG_OFFSET_WINDOW) 
					setDistance(nextDistance)
				else if (nextDistance === window.innerWidth - FLAG_OFFSET_WINDOW)
					cleanup(true);
			}
		}
		window.addEventListener("keydown", changeDirection);
		const interval = setInterval(move, 333)
		return cleanup;
	}, [distance, isRunning, direction]);
    return {
        distance, 
        direction, 
        isRunning
    }
}