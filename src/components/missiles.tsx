import React, { createRef } from "react";
import styled, { keyframes } from "styled-components";
import ReactSVG from "react-svg";
import Missile from "./missile";

const MissilesContainer = styled.div`
	flex-grow: 1;
	position: relative;	
`;

const Missiles: React.FC = () => {
	const ref = createRef()
	return (
		<MissilesContainer>
			<Missile position={200}>
				<ReactSVG src="missile.svg"/>
			</Missile>
		</MissilesContainer>
  	);
};

export default Missiles;
