// src/components/Paywall.js
import React, { useEffect, useState } from "react";

const PREFIX = "test_user_";

export default function Paywall({ userId, children }) {
  const [isPremium, setIsPremium] = useState(false);
  const [recUserId, setRecUserId] = useState(null);

  useEffect(() => {
    if (userId.startsWith(PREFIX)) {
      // Extract the numeric part after "test_user_"
      const idPart = userId.slice(PREFIX.length);
      setRecUserId(idPart);
      setIsPremium(true);
    } else {
      setRecUserId(null);
      setIsPremium(false);
    }
  }, [userId]);

  if (isPremium) {
    // Pass the numeric ID down to children:
    return React.cloneElement(children, { userId: recUserId });
  }

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        border: "2px dashed #6b46c1",
        borderRadius: "8px",
        background: "#faf5ff",
      }}
    >
      <h2 style={{ color: "#6b46c1", marginBottom: "1rem" }}>Upgrade to Premium</h2>
      <p>Limited access for free users.</p>
      <p>
        To unlock all recommendations, search as <code>{PREFIX}&lt;your_user_id&gt;</code>
      </p>
    </div>
  );
}
