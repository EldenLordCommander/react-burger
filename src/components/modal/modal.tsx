import { useEffect, useCallback, FC } from 'react';
import ReactDOM from "react-dom";
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { DELETE_MODAL_ITEM } from '../../services/actions/modal-actions';
import { DELETE_ORDER_ITEM } from '../../services/actions/order-action';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { TModal } from '../../utils/types';

export const Modal: FC<TModal> = ({ children, title = '' }) => {

    const history = useHistory();
    const dispatch = useAppDispatch();

    const closeModal = useCallback(() => {
        //setModalActive(false)
        clearModal();
        if (title !== '') {
            history.goBack();
        }
    }, [])

    useEffect(() => {
        const closeModalByEscape = (e : KeyboardEvent) => {
            if (e.key === 'Escape') {
                //setModalActive(false);
                clearModal();
                if (title !== '') {
                    history.goBack();
                }
            }
        }
        window.addEventListener('keydown', closeModalByEscape)

        return () => window.removeEventListener('keydown', closeModalByEscape)
    }, [])

    const clearModal = () => {
        if (title !== '') {
            dispatch({ type: DELETE_MODAL_ITEM });
        }
        else {
            dispatch({ type: DELETE_ORDER_ITEM })
        }
    }

    return ReactDOM.createPortal(
        <>
            <ModalOverlay closeModal={closeModal} />
            <div className={modalStyles.modal}>
                <section>
                    <div className={modalStyles.closeButton}>
                        <CloseIcon type="primary" onClick={() => closeModal()} />
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
        document.getElementById('modal')!
    );
}


export default Modal;