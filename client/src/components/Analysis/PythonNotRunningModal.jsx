import React from 'react';

function PythonNotRunningModal({ isOpen, onClose }) {
  // Render the modal only if it's open
  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Python Not Running</h3>
        <p className="py-4">The Python server is not running. Please start the server and try again.</p>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
}

export default PythonNotRunningModal;
