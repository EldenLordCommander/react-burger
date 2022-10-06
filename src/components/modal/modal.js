import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';

function Modal({ children, setModalActive, isOrder }) {

    const closeModal = React.useCallback(() => {
        setModalActive(false)
    }, [])

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                setModalActive(false);
            }
        }
        window.addEventListener('keydown', close)

        return () => window.removeEventListener('keydown', close)
    }, [])

    return ReactDOM.createPortal(
        <>
            <ModalOverlay closeModal={closeModal}></ModalOverlay>
            <div className={modalStyles.modal}>
                <section>
                    {
                        isOrder === true
                            ? ''
                            : (
                                <div className={modalStyles.modalHeader}>
                                    <div className={`${modalStyles.title} text text_type_main-medium`}>
                                        Детали ингридиента
                                    </div>
                                </div>
                            )
                    }
                    <div className={modalStyles.closeButton}>
                        <CloseIcon type="primary" onClick={() => setModalActive(false)} />
                    </div>

                    <div>
                        {children}
                    </div>
                </section>
            </div>
        </>,
        document.getElementById('modal')
    );
}

Modal.propTypes = {
    children:PropTypes.object.isRequired,
    setModalActive: PropTypes.func.isRequired,
    isOrder: PropTypes.bool
  };

export default Modal;