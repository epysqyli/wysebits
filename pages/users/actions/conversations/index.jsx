import { getLoggedUser } from "../../../../lib/serverSideMethods";
import { getUserConversations } from "../../../../lib/conversationMethods";
import Conversation from "../../../../components/conversations/Conversation";
import Pagination from "../../../../components/navigation/Pagination";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoItem from "../../../../components/users/NoItem";
import SearchInput from "../../../../components/navigation/SearchInput";

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

  if (conversations.length === 0) {
    return (
      <div>
        <WelcomeTop text="Your conversations" bcgImg="bg-conversations" />
        <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 xl:w-2/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
          <NoItem message="You have no conversations yet" />
          <div className="border px-5 pt-3 md:px-8 md:pt-5 mt-20 lg:mt-32 bg-gray-50 rounded-md shadow group transition-all hover:shadow-md">
            <div>
              Keep exploring book insights and see if you want to engage in a deep and thougthful conversation with anybody
              <br />
              <br />{" "}
              <div className="text-center mt-5">Start exploring books now!</div>
            </div>
            <div className="mt-10 mb-3">
              <SearchInput
                pageDest="/books/search/"
                placeholder="Any book in mind?"
                searchMode="books"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
