import React from "react";

const Modal = ({
  setToggle,
  toggle,
  charCount,
  wordCount,
  senCount,
  paraCount,
  bigramsCount,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title"> Results</h4>
        </div>
        <div className="modal-Grid">
          <ul>
            <li  className="items">Character Count(no spaces):</li>
            <li  className="items_2">{charCount}</li>
            <li className="items">Word Count:</li>
            <li className="items_2">{wordCount}</li>
            <li className="items">Sentence Count:</li>
            <li className="items_2">{senCount}</li>
            <li className="items">Paragraph Count:</li>
            <li className="items_2">{paraCount}</li>
            <li className="items">Bigrams:</li>
            <li className="items_2">{bigramsCount}</li>
          </ul>
        </div>
        <div className="modal-footer">
          <button className="close-modal-btn" onClick={() => setToggle(!toggle)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
