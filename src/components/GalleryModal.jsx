import React from "react";
import "../assets/styles/components/gallery_modal.css";
import Modal from "react-modal";

const GalleryModal = ({ isOpen, onRequestClose, images }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="gallery-modal"
      overlayClassName="gallery-overlay"
      contentLabel="Gallery Modal"
    >
      <button onClick={onRequestClose} className="close-button">
        ×
      </button>
      <div className="gallery-content">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image.image_url} alt={`Gallery item ${index + 1}`} />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default GalleryModal;
