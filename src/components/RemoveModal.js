import React from 'react';
import Modal from 'react-modal';

const RemoveModal = (props) => (
    <Modal
        isOpen={props.confirmRemove}
        contentLabel='Selected Option'
        closeTimeoutMS={200}
        className='modal'
        ariaHideApp={false}
    >
        <h3>Are you sure you want to remove this coin?</h3>
        <button 
            className="button button--secondary"
            onClick={props.onRemove}
        > Yes, Remove</button>
        <button 
            className="button button--primary button--primary__modal"
            onClick={props.onCloseModal}
        > No, Go back</button>
    </Modal>
);

export default RemoveModal;