import React from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";

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
type IProps = {
	direction, distance
}

const Player: React.FC<IProps> = ({ direction, distance }) => {
	return (
		<Symbol inverted={direction === "left"} style={{ left: `${distance}px` }}>
			<ReactSVG src="running-man.svg" />
		</Symbol>
	);
};

export default Player;
