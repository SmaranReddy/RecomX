import React from 'react';

export default function PurchaseModal({ onClose, onPurchase }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', padding: 20, borderRadius: 6, width: 320,
        textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}>
        <h2>Upgrade to Premium</h2>
        <p>Pay <strong>$0.00</strong> to unlock personalized recommendations.</p>

        <button
          onClick={onPurchase}
          style={{
            margin: '10px 0',
            padding: '10px 16px',
            background: '#38a169',
            color: '#fff',
            border: 'none',
            borderRadius: 4
          }}
        >
          Pay $0.00
        </button>

        <br />
        <button onClick={onClose} style={{ marginTop: 8, border: 'none', background: 'transparent', color: '#555' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
