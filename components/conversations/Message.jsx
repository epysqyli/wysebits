const Message = ({ message, currentUserId }) => {
  const userMsg = "ml-auto";
  const partnerMsg = "mr-auto";

  const msgType = (messageSenderId) => {
    if (messageSenderId === currentUserId) {
      return userMsg;
    }
    return partnerMsg;
  };

  return (
    <div className={msgType(message.user.id) + " my-5 rounded p-2 w-4/5 bg-gray-100 shadow"}>
      <div>{message.content}</div>
      <div className="mt-2 text-xs text-gray-400">{message.created_at}</div>
    </div>
  );
};

export default Message;
