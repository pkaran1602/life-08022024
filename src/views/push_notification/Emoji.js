import React, { useState } from 'react';
import { Picker } from 'emoji-mart';
// import 'emoji-mart/css/emoji-mart.css';


function Emoji({ onEmojiSelect }) {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    onEmojiSelect(emoji.native);
    setShowPicker(false);
  };

  return (
    <div>
      <button onClick={() => setShowPicker(!showPicker)}>😀</button>
      {showPicker && <Picker onSelect={handleEmojiSelect} />}
    </div>
  );
}

export default Emoji;
