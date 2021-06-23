import { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
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
let words = document.querySelector(".ql-editor");
const QuilTextEditor = ({
  toggle,
  setWordCount,
  setCharCount,
  setSenCount,
  setParaCount,
  setBigramsCount,
  setToggle
}) => {
  const [quill, setQuill] = useState();
  const [text, setText] = useState("");
  // const wrapperRef = useRef();

  
  let options = {
    theme: "snow",
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder: "Write something amazing..",
    readOnly: toggle,
  };
  const senCount = (sentences) => {
    let count = 0;
    let chars = sentences.trim().replace(/\s/g, "").split("");
    for (let i = 0; i < chars.length; i++) {
      if (chars[i] === "." || chars[i] === "!" || chars[i] === "?") {
        count++;
      }
    }
    setSenCount(count);
    // How do you check for ? and !
  };
  const charCount = (string) => {
    // setCharCount(string.trim().length);
    setCharCount(string.replace(/\s/g, "").length);
  };
  const countWords = (allWords) => {
    setWordCount(allWords);

  };
  const countParagraphs = (allText)=>{
    let nums = 0;
    let h = document.querySelectorAll('p')
    let paras = Array.from(h)
    for ( let i = 0; i < paras.length; i++){
      let item = h[i];
      if(item.innerText.length > 1){
        nums++
      }
    }
    
    setParaCount(nums)
  }
  const bigrams = (allText)=>{
    let uniquePairs = {};
    let wordsArr = allText
      let count = 0 ;
      let right = 1;
      for(let i = 0; i < wordsArr.length; i++){
        let word = wordsArr[i]
          if(!uniquePairs[`${word} ${wordsArr[right]}`]){
          uniquePairs[`${word} ${wordsArr[right]}`] = 1 
            right++
          }
      }
      for( const key in uniquePairs){
          count++
      }
      setBigramsCount(count);
    
  }
  // const editorRef = useRef(document.querySelector(".ql-editor"));
  useEffect(() => {
    if (quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      
      let userWords = quill.getText(0);
      setText(quill.getText(0));
      let words = userWords.trim().replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\n/g, " ").split(" ").length
      countWords(words);
      charCount(userWords);
      senCount(userWords);
      countParagraphs()
      bigrams(userWords)
      
    };
    quill.on("text-change", handler);

    return () => quill.off("text-change", handler);
  }, [quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, options);
    setQuill(q);

  }, []);
  return <div className="container"  ref={wrapperRef}></div>;
};
export default QuilTextEditor;
