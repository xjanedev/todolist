import "./TodoEditor.css";
import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from "../TodoContext";

export default function TodoEditor() {
  const { onCreate } = useContext(TodoDispatchContext);

  const inputRef = useRef();
  const [content, setContent] = useState("");

  const onChangeContent = e => {
    setContent(e.target.value);
  };

  const onClick = () => {
    if (content === "") {
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeydown = e => {
    if (e.keyCode === 13) {
      onClick();
    }
  };

  return (
    <div className='TodoEditor'>
      <input
        ref={inputRef}
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeydown}
        placeholder='새로운 Todo ...'
      />
      <button onClick={onClick}>추가</button>
    </div>
  );
}
