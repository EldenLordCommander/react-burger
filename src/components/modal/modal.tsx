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

export const Modal: FC<TModal> = ({ children, title = '', setActive }) => {

    const history = useHistory();
    const dispatch = useAppDispatch();

    const closeModal = useCallback(() => {

        setActive(false);
    }, [])

    useEffect(() => {
        const closeModalByEscape = (e : KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActive(false);
            }
        }
        window.addEventListener('keydown', closeModalByEscape)

        return () => window.removeEventListener('keydown', closeModalByEscape)
    }, [])


    return ReactDOM.createPortal(
        <>
            <ModalOverlay closeModal={closeModal} />
            <div className={modalStyles.modal} id="modal_form">
                <section>
                    <div className={modalStyles.closeButton} id="divCloseModalWindow">
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