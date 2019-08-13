import React from 'react'
import { Modal } from '@material-ui/core';
import styled from 'styled-components';

type IProps = {
    onClose?: () => {},
    open: boolean,
    result: string
}

const ModalContent = styled.div`
    position: absolute;
    width: 400px;
    background-color: #f1f2f3;
    border: 1px solid #000;
    padding: 20px 24px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const ResultModal: React.FC<IProps>  = ({ open, onClose, result}) => {
    return  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={open}
    onClose={onClose}
  >
    <ModalContent>
      <h2>You {result}</h2>
    </ModalContent>
  </Modal>
}

export default ResultModal;