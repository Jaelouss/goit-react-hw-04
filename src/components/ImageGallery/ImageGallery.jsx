import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

const ImageGallery = ({ gallery, openModal }) => {
  return (
    <>
      <ul className={s.list}>
        {gallery.map((image) => (
          <li className={s.item} key={image.id}>
            <ImageCard image={image} openModal={openModal} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default ImageGallery;
