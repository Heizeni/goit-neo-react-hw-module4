import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onClose, image }) {
  if (!image) {
    return null;
  }

  const altText = image.alt_description || image.description || 'Image';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName={css.overlay}
      className={css.modal}
    >
      <div className={css.container}>
        <img className={css.image} src={image.urls.regular} alt={altText} />

        <div className={css.info}>
          <p>
            <span className={css.label}>Author:</span> {image.user.name}
          </p>
          <p>
            <span className={css.label}>Likes:</span> {image.likes}
          </p>
          <p>
            <span className={css.label}>Description:</span>{' '}
            {image.description || image.alt_description || 'No description'}
          </p>
        </div>
      </div>
    </Modal>
  );
}