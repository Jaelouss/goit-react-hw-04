import axios from 'axios';

const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_KEY;

export const imageSearch = async (topic, page = 1) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: `Client-ID ${unsplashAccessKey}`,
    },
    params: {
      query: topic,
      per_page: 10,
      orientation: 'landscape',
      page: page,
    },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};
