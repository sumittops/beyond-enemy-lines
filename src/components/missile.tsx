import React from "react";
import styled, { keyframes } from "styled-components";
import { bounceInDown } from 'react-animations'
import ReactSVG from "react-svg";
const Symbol = styled.div`
	width: 30px;
	fill: #aaa;
	transform: rotate(40deg);
	position: absolute;
	bottom: 10px;
	animation: ${(props: SymbolProps) => props.fallDuration}s ${keyframes`${bounceInDown}`};
	display: ${(props: SymbolProps) => props.started ? 'block': 'none'}
`;
type SymbolProps = {
	started: boolean,
	reached: boolean,
	fallDuration: number
}
type IProps = SymbolProps & {
	position: number
}
const Missile: React.FC<IProps> = ({ position, started, reached, fallDuration }) => {

	return (
		<Symbol style={{ left: position }} 
		 	fallDuration={fallDuration} started={started} reached={reached}>
			<ReactSVG src="missile.svg"/>
		</Symbol>
	)
}

export default Missile