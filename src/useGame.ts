import { useState, useEffect } from "react";
import { PIXEL_INC, FLAG_OFFSET_WINDOW, MISSILE_FALL_DURATION } from "./constants";
import useMissiles, { MissileType } from "./useMissles";

type GameType = {
    distance: number, 
    direction: string,
	isRunning: boolean,
	missiles: Array<MissileType>,
	result: string
}

export default function useGame (): GameType {
	const [gameOver, setGameOver] = useState(false);
    const [direction, setDirection] = useState("right");
	const [distance, setDistance] = useState(0);
	const [isRunning, setRunning] = useState(false);
	const [missilePtr, setMisslePtr] = useState(0);
	const { missiles, setMissiles } = useMissiles();
	const [result, setResult] = useState("");

	function toggleRunning() {
		setRunning(!isRunning)
	}

	function checkRunning(nextDirection) {
		if ((direction !== nextDirection || !isRunning) && !gameOver) {
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
			setGameOver(true);
			clearInterval(interval);
			if (hasWon !== undefined) {
				setResult(hasWon ? 'Won' : 'Lost');
			}
		}
		function updateReached(currentMissile, missileIdx, distance) {
			setMissiles([
				...missiles.slice(0, missileIdx),
				{ ...currentMissile, reached: true }, 
				...missiles.slice(missileIdx + 1)
			]);
			//check bombed place
			const runner_offset = 65;
			const missile_width = 60;
			if (distance + runner_offset >= currentMissile.position &&
				distance + runner_offset <= currentMissile.position + missile_width) {
				setRunning(false);
				cleanup(false);
			}
		}
	
		function updateStarted(currentMissile, nextDistance) {
			if (currentMissile && !currentMissile.started && !currentMissile.reached
				&& nextDistance + 60 >= Math.ceil(currentMissile.position)) {
				currentMissile = { ...currentMissile, started: true }
				setMissiles([
					...missiles.slice(0, missilePtr),
					currentMissile, 
					...missiles.slice(missilePtr + 1)
				]);
				setMisslePtr(missilePtr + 1);
				setTimeout(
					() => updateReached(currentMissile, missilePtr, distance), 
					1000 * (MISSILE_FALL_DURATION - 0.6)
				);
			}
		}
		
		function move() {
			if (isRunning) {
				const increment = direction === "left" ? -PIXEL_INC : PIXEL_INC;
				const nextDistance = distance + increment;
				if (nextDistance > 0 && nextDistance < window.innerWidth - FLAG_OFFSET_WINDOW) {
					setDistance(nextDistance);
					updateStarted(missiles[missilePtr], nextDistance);
				}
				else if (nextDistance >= window.innerWidth - FLAG_OFFSET_WINDOW)
					cleanup(true);
			}
		}
		window.addEventListener("keydown", changeDirection);
		const interval = setInterval(move, 333)
		return cleanup;
	}, [distance, isRunning, direction, missilePtr, missiles]);

	return {
        distance, 
        direction, 
		isRunning,
		missiles,
		result
    }
}