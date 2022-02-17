import dayjs from "dayjs";
import { useEffect, useRef } from "react";

const Message = ({ message, currentUserId, isLastMsg }) => {
  const msgRef = useRef();

  const boxAlignment = (messageSenderId) => {
    if (messageSenderId === currentUserId) {
      return "ml-auto";
    }
    return "mr-auto";
  };

  const textAlignment = (messageSenderId) => {
    if (messageSenderId === currentUserId) {
      return "text-right";
    }
    return "";
  };

  if (isLastMsg(message)) {
    useEffect(() => {
      msgRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }, []);

    return (
      <div
        ref={msgRef}
        className={
          boxAlignment(message.user.id) +
          " my-5 rounded p-2 w-4/5 bg-gray-100 shadow"
        }
      >
        <div className={textAlignment(message.user.id)}>
          <div>{message.content}</div>
          <div className="mt-2 text-xs text-gray-400">
            {dayjs(message.created_at).toString()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        boxAlignment(message.user.id) +
        " my-5 rounded p-2 w-4/5 bg-gray-100 shadow"
      }
    >
      <div className={textAlignment(message.user.id)}>
        <div>{message.content}</div>
        <div className="mt-2 text-xs text-gray-400">
          {dayjs(message.created_at).toString()}
        </div>
      </div>
    </div>
  );
};

export default Message;
