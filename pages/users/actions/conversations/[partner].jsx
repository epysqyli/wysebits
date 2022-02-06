import { MessageCircle } from "react-feather";
import { getMessages } from "../../../../lib/conversationMethods";

export const getServerSideProps = async (context) => {
  const query = context.params.partner;
  const partner = query.split("-").slice(0, query.split("-").length - 1).join("-")
  const id = query.split("-")[query.split("-").length - 1];
  const messages = await getMessages(id, context);

  return {
    props: {
      messages: messages.data.messages,
      partner: partner,
    },
  };
};

const Conversation = ({ messages, partner }) => {
  return (
    <div className="w-5/6 md:w-4/6 lg:w-11/12 xl:w-5/6 mx-auto py-10">
      <div className="flex justify-between items-center md:justify-around md:border-b-2 md:border-gray-300 md:pb-10">
        <MessageCircle size={36} strokeWidth={1.5} className="text-gray-800" />
        <div className="text-gray-800 text-2xl">
          Conversation with {partner}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
