import React, { useEffect } from 'react';
import s from './ImageModal.module.css';

const ImageModal = ({
  image: { url, description, name, location, portfolio, alt },
  closeModal,
}) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?q=${encodeURIComponent(
    location
  )}`;

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeModal]);

  const firstItem = name || description;
  const secondItem = location || portfolio;

  return (
    <div className={s.modalOverlay} onClick={closeModal}>
      <div className={s.modalContent}>
        <div className={s.imageContainer}>
          <img src={url} alt={alt} className={s.modalImage} />
        </div>
        <ul className={s.list}>
          {firstItem && (
            <li className={s.itemFirst}>
              {name && <p>Autor: {name}</p>}
              {description && (
                <div className={s.description}>
                  <p>Description: {description}</p>
                </div>
              )}
            </li>
          )}
          {secondItem && (
            <li className={s.itemSecond}>
              {location && (
                <a href={googleMapsUrl} target='_blank'>
                  Made in: {location}
                </a>
              )}
              {portfolio && (
                <a href={portfolio} target='_blank'>
                  Autor Portfolio
                </a>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ImageModal;
