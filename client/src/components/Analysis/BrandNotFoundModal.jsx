import React from 'react';

function BrandNotFoundModal({ isOpen, onClose }) {
  // Render the modal only if it's open
  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Brand Not Found</h3>
        <p className="py-4">The specified brand could not be found in our records. Please try another keyword.</p>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
}

export default BrandNotFoundModal;
