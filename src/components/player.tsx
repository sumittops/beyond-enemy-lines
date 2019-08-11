import React, {useState, useContext, useEffect} from 'react';
import ReactSVG from 'react-svg';
import styled from "styled-components";
import PlayerContext from '../context/player-info';

const Symbol = styled.div`
  width: 50px
  fill: #aaa;
  height: 50px;
  `;

const Player: React.FC = () => {
    const player = useContext(PlayerContext);
    const [ direction, setDirection ] = useState('right');
    const isRunning = player["isRunning"];

    function changeDirection(event) {
      if (event.keyCode === '39') {
        setDirection('right')
      }
      if (event.keyCode === '37') {
        setDirection('left')
      }
    }

    useEffect(() => {
      onkeydown = changeDirection;
    }, []);

    return (
      <Symbol>
          <ReactSVG
              src="running-man.svg"
            />
      </Symbol>
    );
}

export default Player;
