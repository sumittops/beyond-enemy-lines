import React from "react";
import styled, { keyframes } from "styled-components";
import { bounceInDown } from "react-animations";
import ReactSVG from "react-svg";

const Missile = styled.div`
	width: 30px;
	fill: #aaa;
	transform: rotate(40deg);
`;

const MissilesContainer = styled.div`
	flex-grow: 1;
	position: relative;
	
`;

const Bounce2s = styled(Missile)`
  	animation: 3s ${keyframes`${bounceInDown}`};
`;
const Bounce3s = styled(Missile)`
  	animation: 4s ${keyframes`${bounceInDown}`};
`;
const Bounce4s = styled(Missile)`
  	animation: 5s ${keyframes`${bounceInDown}`};
`;

const Missiles: React.FC = () => {
  return (
    <MissilesContainer>
		<Bounce2s style={}>
			<ReactSVG src="missile.svg" />
		</Bounce2s>
    </MissilesContainer>
  );
};

export default Missiles;
