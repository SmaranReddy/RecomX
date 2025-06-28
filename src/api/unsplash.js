// src/api/unsplash.js
import axios from "axios";

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export const fetchUnsplashImage = async (query) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query, per_page: 1 },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    const result = response.data.results?.[0];
    return result?.urls?.small || null;
  } catch (err) {
    console.error("Error fetching Unsplash image:", err);
    return null;
  }
};
