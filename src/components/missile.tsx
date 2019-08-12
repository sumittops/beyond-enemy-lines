import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { bounceInDown } from 'react-animations'
import ReactSVG from "react-svg";
const Symbol = styled.div`
	width: 30px;
	fill: #aaa;
	transform: rotate(40deg);
	position: absolute;
	bottom: 10px;
	animation: 1s ${keyframes`${bounceInDown}`};
	display: ${(props: MissileState) => props.started ? 'block': 'none'}
`;

type MissileState = {
	started: boolean,
	reached: boolean
}

type IProps = {
	position: number
}
const Missile: React.FC<IProps> = ({ position }) => {
	const [started, setStarted] = useState(false);
	const [reached, setReached] = useState(false);

	function launch() {
		setStarted(true)
		setTimeout(() => {
			setReached(true);
		}, 1)
	}

	return (
		<Symbol style={{ left: position }} started={started} reached={reached}>
			<ReactSVG src="missile.svg"/>
		</Symbol>
	)
}

export default Missile