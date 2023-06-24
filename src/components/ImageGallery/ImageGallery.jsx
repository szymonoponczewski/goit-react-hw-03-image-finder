import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css";
import PropTypes from "prop-types";

export const ImageGallery = ({ pictures, imgAddress }) => {
  return (
    <ul className={css.ImageGallery}>
      {pictures.map((picture) => {
        const { id, webformatURL, tags, largeImageURL } = picture;
        return (
          <ImageGalleryItem
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            imageAddress={imgAddress}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  imgAddress: PropTypes.func.isRequired,
};
