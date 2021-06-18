import { useCallback, useEffect } from "react";
import Quil from "quill";
import "quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const QuilTextEditor = ({ toggle }) => {
  //   const wrapperRef = useRef();
  let options = {
    theme: "snow",
    modules: { toolbar: toolbarOptions },
    placeholder: "Write something amazing..",
    readOnly: toggle,
  };

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    new Quil(editor, options);
  }, []);
  //   useEffect(() => {
  //     let mainDiv = document.getElementsByClassName("ql-editor");
  //     mainDiv[0].contentEditable = toggle;
  //   }, []);
  return <div className="container" ref={wrapperRef}></div>;
};
export default QuilTextEditor;
