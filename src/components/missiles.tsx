import React from "react";
import styled from "styled-components";
import ReactSVG from "react-svg";
import Missile from "./missile";
import { MissileType } from "../useMissles";
import { MISSILE_FALL_DURATION } from "../constants";

const MissilesContainer = styled.div`
	flex-grow: 1;
	position: relative;	
`;
type IProps = {
	missiles: Array<MissileType>
}

const Missiles: React.FC<IProps> = ({ missiles }) => {
	return (
		<MissilesContainer>
			{
				missiles.map(({ position, started, reached}, idx) => 
					<Missile key={idx} started={started} position={position} 
						fallDuration={MISSILE_FALL_DURATION} reached={reached}
					>
						<ReactSVG src="missile.svg"/>
					</Missile>
		
				)
			}
		</MissilesContainer>
  	);
};

export default Missiles;
