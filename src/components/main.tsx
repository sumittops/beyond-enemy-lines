import React from 'react';
import styled from "styled-components";

import Missiles from './missiles';
import FinishLine from './finish-line';
import Player from './player';
import useGame from '../useGame';
import ResultModal from './resultmodal';
import Instructions from './instructions';

const Wrapper = styled.div`
    height: 70%;
`;

const PlayGround = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  position: relative;
`;

const Main: React.FC = () => {
    const { direction, distance, missiles, result } = useGame();
    return (
        <Wrapper>
            {/* <Timer /> */}
            <PlayGround>
                <Player distance={distance} direction={direction} />
                <Missiles missiles={missiles}/>
                <FinishLine />
            </PlayGround>
            <ResultModal open={!!result} result={result} />
            <Instructions />
        </Wrapper>
    );
}
export default Main;
