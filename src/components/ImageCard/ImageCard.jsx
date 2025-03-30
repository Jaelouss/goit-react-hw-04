import React from 'react';
import s from './ImageCard.module.css';

const ImageCard = ({ image, openModal }) => {
  const info = {
    url: image?.urls?.full,
    alt: image?.alt_description,
    description: image?.description,
    name: `${image?.user?.first_name} ${image?.user?.last_name}`,
    location: image?.user?.location,
    portfolio: image?.user?.portfolio_url,
  };

  return (
    image?.urls?.small && (
      <div>
        <img
          className={s.img}
          width='300'
          onClick={() => openModal(info)}
          src={image.urls.small}
          alt={image?.alt_description}
        />
      </div>
    )
  );
};

export default ImageCard;
