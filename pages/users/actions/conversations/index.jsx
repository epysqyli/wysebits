import { getLoggedUser } from "../../../../lib/serverSideMethods";
import { getUserConversations } from "../../../../lib/conversationMethods";
import Conversation from "../../../../components/conversations/Conversation";
import { MessageSquare } from "react-feather";
import Pagination from "../../../../components/navigation/Pagination";
import WelcomeTop from "../../../../components/users/WelcomeTop";

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

const Conversations = ({ conversations, pagy }) => {
  const clientUrl = "users/actions/conversations";

  return (
    <div>
      <WelcomeTop text="Your conversations" bcgImg="bg-conversations" />
      <div className="w-5/6 md:w-3/5 2xl:w-1/2 mx-auto py-10">
        <div className="my-10 ">
          {conversations.map((conv) => (
            <div
              className="my-2 shadow cursor-pointer hover:shadow-md transition-shadow rounded-md text-gray-800 bg-gray-50 border-2 border-transparent hover:border-blue-300"
              key={conv.id}
            >
              <Conversation conversation={conv} />
            </div>
          ))}
        </div>

        <Pagination clientUrl={clientUrl} pagy={pagy} />
      </div>
    </div>
  );
};

export default Conversations;
