import QuilTextEditor from "./QuilTextEditor";
import Modal from "./Modal";

import React, { useState, useEffect, useRef } from "react";
function useKey(key, cb) {
  const callBackRef = useRef(cb);

  useEffect(() => {
    callBackRef.current = cb;
  });
  useEffect(() => {
    function handle(event) {
      console.log(event.key )
      console.log(event.ctrlKey)
      console.log(event.shiftKey)
      if (event.key === key && event.ctrlKey === true && event.shiftKey === true) {
        callBackRef.current(event);
      }
    }

    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key]);
}
function App() {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [senCount, setSenCount] = useState(0);
  const [paraCount, setParaCount] = useState(0);
  const [bigramsCount, setBigramsCount] = useState(0);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    let mainDiv = document.getElementsByClassName("ql-editor");
    mainDiv[0].contentEditable = `${!toggle}`;
  }, [toggle]);

  function handleEnter() {
    console.log("Key was pressed ");

    setToggle(!toggle);
  }

  useKey("C", handleEnter); // Shift+ctrl+Enter to open modal
  return (
    <div>
      <QuilTextEditor
        toggle={toggle}
        setCharCount={setCharCount}
        setWordCount={setWordCount}
        setSenCount={setSenCount}
        setParaCount={setParaCount}
        setBigramsCount={setBigramsCount}
        setToggle={setToggle}
      />
      {toggle ? (
        <Modal
          toggle={toggle}
          setToggle={setToggle}
          charCount={charCount}
          wordCount={wordCount}
          senCount={senCount}
          paraCount={paraCount}
          bigramsCount={bigramsCount}
        />
      ) : null}
    </div>
  );
}

export default App;
