import React from "react";

const PREFIX = "test_user_";

export default function Paywall({ userId, children }) {
  const isPremium = userId.startsWith(PREFIX);

  if (isPremium) {
    // Pass the full userId down
    return React.cloneElement(children, { userId });
  }

  // Free‑tier UI
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
      <h2 style={{ color: "#6b46c1", marginBottom: "1rem" }}>
        Upgrade to Premium
      </h2>
      <p>Limited access for free users.</p>
      <p>
        To unlock all recommendations, search as{" "}
        <code>{PREFIX}&lt;your_user_id&gt;</code>
      </p>
    </div>
  );
}
