import { getLoggedUser } from "../../../../lib/serverSideMethods";
import { getUserConversations } from "../../../../lib/conversationMethods";
import Conversation from "../../../../components/conversations/Conversation";
import { MessageSquare } from "react-feather";

export const getServerSideProps = async (context) => {
  const loggedUser = await getLoggedUser(context);
  const conversations = await getUserConversations(
    loggedUser.data.user.id,
    context
  );
  return {
    props: {
      conversations: conversations.data.conversations,
      pagy: conversations.data.pagy,
    },
  };
};

const Conversations = ({ conversations }) => {
  return (
    <div className="w-5/6 md:w-3/5 2xl:w-1/2 mx-auto py-10">
      <div className="flex justify-between items-center md:justify-around md:border-b-2 md:border-gray-300 md:pb-10">
        <MessageSquare size={36} strokeWidth={1.5} className="text-gray-800" />
        <div className="text-gray-800 text-2xl">Your conversations</div>
      </div>

      <div className="my-10 ">
        {conversations.map((conv) => (
          <div
            className="my-2 shadow cursor-pointer hover:shadow-md transition-shadow"
            key={conv.id}
          >
            <Conversation conversation={conv} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversations;
