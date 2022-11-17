import overlayStyles from './modal-overlay.module.css';
import { FC } from 'react';

const ModalOverlay: FC<{closeModal(value : boolean): void}> = ({ closeModal }) => {
    return (
        <div className={overlayStyles.overlay} onClick={()=>closeModal(false)}>
        </div>
    )
}

export default ModalOverlay;