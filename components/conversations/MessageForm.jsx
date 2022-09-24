import { useState } from "react";
import { sendMessage } from "../../lib/conversationMethods";
import { Send } from "react-feather";

const MessageForm = ({ messagesState, setMessagesState, partner, conversationId, userId }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
  };

  const cleanForm = () => setMessage("");

  const sendMsg = async () => {
    const res = await sendMessage(conversationId, message, userId);
    if (res.status === 200) {
      const newMessage = res.data.message;
      setMessagesState([...messagesState, newMessage]);
      cleanForm();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMsg();
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-x-5 items-center'>
      <label htmlFor='newMessage'>
        <div></div>
      </label>
      <textarea
        type='text'
        name='newMessage'
        id='newMessage'
        onChange={handleChange}
        placeholder={`Write something to ${partner}`}
        className='w-full mx-auto my-10 block rounded border-none'
        rows='5'
        value={message}
        required
      ></textarea>
      <button
        className='border p-2 rounded-md bg-gray-50 hover:bg-gray-200 hover:shadow-md active:shadow-inner group'
        type='submit'
      >
        <Send
          size={26}
          strokeWidth={1.75}
          className='text-gray-600 group-hover:scale-90 group-active:scale-75 transition-transform'
        />
      </button>
    </form>
  );
};

export default MessageForm;
