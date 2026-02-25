import { useState } from "react";
import EmojiPlus from "@/public/img/icon/EmojiPlus";
import ReplyIcon from "@/public/img/icon/ReplyIcon";
import { useMessageReactMutation } from "@/src/redux/services/messageApi";
import { setReplyMessage } from "@/src/redux/slices/chatSlice";
import EmojiPicker from "emoji-picker-react";
import { useDispatch } from "react-redux";

export default function MessageOptions({ msg, isSender }) {
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();
  const [messageReact, msgReactRes] = useMessageReactMutation();

  const reactions = ["👍", "❤️", "😂", "😮"];

  const handleEmojiClick = (emojiData) => {
    messageReact({ id: msg.id, reaction: emojiData.emoji });
    setShowPicker(false);
  };

  const handleReply = () => {
    dispatch(setReplyMessage({ messageId: msg.id, message: msg.content }));
  };

  return (
    <div
      className={`absolute -top-7  ${
        isSender ? "right-0" : "left-0"
      }  flex items-center gap-2 bg-gray-800 text-white rounded-full shadow-lg px-3 py-1`}
    >
      {reactions.map((emoji, i) => (
        <button
          key={i}
          onClick={() => handleEmojiClick({ emoji })}
          className="transition-transform hover:scale-125"
        >
          {emoji}
        </button>
      ))}

      {/* More emoji button */}
      <div className="relative">
        <button
          onClick={() => setShowPicker((prev) => !prev)}
          className="flex transition-transform hover:scale-125"
        >
          <EmojiPlus />
        </button>

        {showPicker && (
          <div
            className={`absolute top-8 z-50 ${isSender ? "right-0" : "left-0"}`}
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      {/* Reply button */}
      <button
        onClick={handleReply}
        className="transition-transform hover:scale-110"
      >
        <ReplyIcon />
      </button>
    </div>
  );
}
