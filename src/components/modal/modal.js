import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';

function Modal({ children, setModalActive, title = '' }) {

    const closeModal = React.useCallback(() => {
        setModalActive(false)
    }, [])

    useEffect(() => {
        const closeModalByEscape = (e) => {
            if (e.key === 'Escape') {
                setModalActive(false);
            }
        }
        window.addEventListener('keydown', closeModalByEscape)

        return () => window.removeEventListener('keydown', closeModalByEscape)
    }, [])

    return ReactDOM.createPortal(
        <>
            <ModalOverlay closeModal={closeModal} />
            <div className={modalStyles.modal}>
                <section>
                    <div className={modalStyles.closeButton}>
                        <CloseIcon type="primary" onClick={() => setModalActive(false)} />
                    </div>
                    {
                        title === '' ? ''
                            : (
                                <div className={modalStyles.modalHeader}>
                                    <div className={`${modalStyles.title} text text_type_main-medium`}>
                                        {title}
                                    </div>
                                </div>
                            )
                    }
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
    children: PropTypes.object.isRequired,
    setModalActive: PropTypes.func.isRequired,
    isOrder: PropTypes.string
};

export default Modal;