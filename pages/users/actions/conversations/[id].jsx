import { getMessages } from "../../../../lib/conversationMethods";

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const messages = await getMessages(id, context);

  return { props: { messages: messages.data.messages } };
};

const Conversation = ({ messages }) => {
  return <div></div>;
};

export default Conversation;
