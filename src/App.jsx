import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

import { fetchImages } from './services/unsplashApi';

import css from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

    async function getImages() {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchImages(query, page);

        setImages(prevImages => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);

        if (data.results.length === 0) {
          toast('No images found for your request');
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    setImages([]);
    setPage(1);
    setTotalPages(0);
    setIsError(false);
    setQuery(newQuery);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const hasImages = images.length > 0;
  const hasMoreImages = page < totalPages;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      <Toaster position="top-right" />

      {isError && <ErrorMessage />}

      {hasImages && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}

      {isLoading && <Loader />}

      {hasImages && hasMoreImages && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}