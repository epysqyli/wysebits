import { MessageCircle } from "react-feather";
import { getMessages } from "../../../../lib/conversationMethods";
import Message from "../../../../components/conversations/Message";

export const getServerSideProps = async (context) => {
  const query = context.params.partner;
  const partner = query
    .split("-")
    .slice(0, query.split("-").length - 1)
    .join("-");
  const id = query.split("-")[query.split("-").length - 1];
  const messages = await getMessages(id, context);

  return {
    props: {
      messages: messages.data.messages,
      partner: partner,
    },
  };
};

const Conversation = ({ messages, partner, userState }) => {
  return (
    <div className="w-5/6 md:w-4/6 xl:w-3/5 2xl:w-1/2 mx-auto py-10">
      <div className="flex justify-between items-center md:justify-around md:border-b-2 md:border-gray-300 md:pb-10">
        <MessageCircle size={36} strokeWidth={1.5} className="text-gray-800" />
        <div className="text-gray-800 text-2xl">
          Conversation with {partner}
        </div>
      </div>

      <div className="mt-10 lg:w-4/5 mx-auto">
        {messages.map((msg) => {
          return <Message message={msg} currentUserId={userState.user.id} />;
        })}
      </div>
    </div>
  );
};

export default Conversation;
