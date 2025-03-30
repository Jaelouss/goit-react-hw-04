import { useState } from 'react';
import { imageSearch } from '../ImagesApi/ImagesApi';
import ImageGallery from '../ImageGallery/ImageGallery';
import { notify } from '../Toast/Toast';
import SearchBar from '../SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import { BarLoader } from 'react-spinners';
import PageOf from '../PageOf/PageOf';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import s from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imagesData, setImagesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageInfo, setImageInfo] = useState('');

  const handleSubmit = (userQuery) => {
    setQuery(userQuery);
    setCurrentPage(1);
    setImagesData([]);
    handleSearch(userQuery, 1);
  };

  const handleSearch = async (topic, page) => {
    try {
      setError(false);
      setLoading(true);
      const { results, totalPages } = await imageSearch(topic, page);

      setImagesData((prevImages) => [...prevImages, ...results]);
      setMaxPage(totalPages);

      if (results.length === 0) {
        notify('error', 'Nothing was found on your request');
        return;
      }
    } catch (error) {
      notify('error', 'Something went wrong. Try again');
      setError(true);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < maxPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });

      handleSearch(query, nextPage);
    }
  };

  const openModal = (info) => {
    setShowModal(true);
    setImageInfo(info);
  };

  const closeModal = () => {
    setShowModal(false);
    setImageInfo('');
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster />
      {loading && (
        <div className={s.loader}>
          <BarLoader width='300px' />
        </div>
      )}
      {error && <ErrorMessage />}
      {imagesData.length > 0 && (
        <ImageGallery gallery={imagesData} openModal={openModal} />
      )}
      {currentPage >= 1 && (
        <div className={s.panel}>
          <PageOf currentPage={currentPage} maxPage={maxPage} />
          <LoadMoreBtn
            nextPage={handleNextPage}
            currentPage={currentPage}
            maxPage={maxPage}
          />
        </div>
      )}
      <ImageModal
        image={imageInfo}
        isOpen={showModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default App;
