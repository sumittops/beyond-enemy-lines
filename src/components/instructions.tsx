import React from 'react';
import styled from "styled-components";
import { Icon } from '@material-ui/core';

const Container = styled.div`
  margin-top: 30px
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  margin: 12px;
  background: #99CC00;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  color: #fff;
  border-radius: 4px;
`

const Instructions: React.FC = () => {

    return (
      <Container>
        <Box>
          <Icon>arrow_left</Icon>
          Move Left
        </Box>
        <Box>
          Move Right
          <Icon>arrow_right</Icon>
        </Box>
      </Container>
    );

}
export default Instructions;
