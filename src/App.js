import React, { useState } from "react";
import Recommendations from "./components/Recommendations";
import PurchaseModal from "./components/PurchaseModal";

export default function App() {
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const handleSearch = () => {
    if (!isPremium) {
      setShowModal(true);
    }
  };

  const handlePurchase = () => {
    setIsPremium(true);
    setShowModal(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      <h1>Personalized Product Recommendations</h1>
      <input
        type="text"
        placeholder="Enter user ID..."
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ padding: "10px", width: "70%", margin: "20px 0" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px", backgroundColor: "#6b46c1", color: "#fff", border: "none", borderRadius: "5px" }}>
        Search
      </button>

      {showModal && <PurchaseModal onClose={() => setShowModal(false)} onPurchase={handlePurchase} />}
      {isPremium && <Recommendations userId={userId} />}
    </div>
  );
}
