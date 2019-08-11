import React, { useState, useContext, useEffect } from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";
import PlayerContext from "../context/player-info";

const Symbol = styled.div`
	width: 50px
	fill: #aaa;
  	height: 50px;
  	position: absolute
  	transition: all 0.5s linear;
	transform: ${(props: SymbolProps) => props.inverted ? 'rotateY(180deg)' : 'none'};
`;

type SymbolProps = {
	inverted: boolean
}

const Player: React.FC<{onFinish: Function}> = ({ onFinish }) => {
	const player = useContext(PlayerContext);
	const [direction, setDirection] = useState("right");
	const [distance, setDistance] = useState(0);
	const [isRunning, setRunning] = useState(false);

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
			if (hasWon) {
				onFinish(hasWon);
			}
		}
		function move() {
			if (isRunning) {
				const increment = direction === "left" ? -10 : 10;
				const nextDistance = distance + increment;
				if (nextDistance > 0 && nextDistance < window.innerWidth - 100) 
					setDistance(nextDistance)
				else if (nextDistance === window.innerWidth - 100)
					cleanup(true);
			}
		}
		window.addEventListener("keydown", changeDirection);
		const interval = setInterval(move, 333)
		return cleanup;
	}, [distance, isRunning, direction]);

	return (
		<Symbol inverted={direction === "left"} style={{ left: `${distance}px` }}>
			<ReactSVG src="running-man.svg" />
		</Symbol>
	);
};

export default Player;
