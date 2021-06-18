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
          <h4 className="modal-title"> Modal title</h4>
        </div>
        <div className="modal-Grid">
          <ul>
            <li>Character Count:{charCount}</li>
            <li>Word Count:{wordCount}</li>
            <li>Sentence Count:{senCount}</li>
            <li>Paragraph Count:{paraCount}</li>
            <li>Bigrams:{bigramsCount}</li>
          </ul>
        </div>
        <div className="modal-footer">
          <button className="button" onClick={() => setToggle(!toggle)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
