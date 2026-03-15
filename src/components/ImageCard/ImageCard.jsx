import css from './ImageCard.module.css';

export default function ImageCard({ image, onClick }) {
  const altText = image.alt_description || image.description || 'Image';

  return (
    <div className={css.card} onClick={() => onClick(image)}>
      <img
        className={css.image}
        src={image.urls.small}
        alt={altText}
      />
    </div>
  );
}