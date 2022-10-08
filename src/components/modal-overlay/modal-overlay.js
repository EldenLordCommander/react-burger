import overlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({closeModal}){
    return (
        <div className={overlayStyles.overlay} onClick={()=>closeModal(false)}>
        </div>
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired
  };

export default ModalOverlay;