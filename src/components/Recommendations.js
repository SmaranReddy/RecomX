import React, { useEffect, useState } from "react";
import { getRecommendations } from "../api/personalize";
import axios from "axios";

export default function Recommendations({ userId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({});

  const fetchImages = async (productName) => {
    const unsplashApiKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: productName,
          client_id: unsplashApiKey,
          per_page: 1,
        },
      });

      return response.data.results[0]?.urls?.small || "https://via.placeholder.com/150?text=No+Image";
    } catch (err) {
      console.error("Failed to fetch image:", err);
      return "https://via.placeholder.com/150?text=No+Image";
    }
  };

  useEffect(() => {
    const fetchRecommendationsWithImages = async () => {
      setLoading(true);
      setError("");

      try {
        const recommendedItems = await getRecommendations(userId);

        const imagePromises = recommendedItems.map(async (product) => {
          const imageUrl = await fetchImages(product.productName);
          return { ...product, image: imageUrl };
        });

        const updatedItems = await Promise.all(imagePromises);
        setRecommendations(updatedItems);
      } catch (err) {
        setError(err.message || "Failed to fetch recommendations.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecommendationsWithImages();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!recommendations.length) {
    return <div>No recommendations available for this user ID.</div>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "20px" }}>
      {recommendations.map((product) => (
        <div
          key={product.itemId}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <img
            src={product.image}
            alt={product.productName}
            style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
          />
          <h3 style={{ margin: "10px 0" }}>{product.productName}</h3>
          <p style={{ fontWeight: "bold" }}>${Number(product.price).toFixed(2)}</p>
          <p style={{ fontStyle: "italic", color: "#555" }}>Score: {product.score || "N/A"}</p>
          <p style={{ color: "#888", fontSize: "12px" }}>ID: {product.itemId}</p>
        </div>
      ))}
    </div>
  );
}
