import dayjs from "dayjs";

const Message = ({ message, currentUserId }) => {
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

  return (
    <div
      className={
        boxAlignment(message.user.id) +
        " my-5 rounded p-2 w-4/5 bg-gray-100 shadow"
      }
    >
      <div className={textAlignment(message.user.id)}>
        <div>{message.content}</div>
        <div className="mt-2 text-xs text-gray-400">{dayjs(message.created_at).toString()}</div>
      </div>
    </div>
  );
};

export default Message;
