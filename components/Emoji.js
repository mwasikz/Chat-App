import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
  
export default function EmojiInput() {
  const [text, setText] = useState("");
  
  return (
    <div>
    <br/>
    <br/>
    <br/>
    <br/>
    <InputEmoji
      value={text}
      onChange={setText}
      cleanOnEnter
      placeholder="Type a message"
    />
    </div>
  );
}