import IconAndTitle from "../../../../components/layout/IconAndTitle";
import { getLoggedUser } from "../../../../lib/serverSideMethods";
import { getUserConversations } from "../../../../lib/conversationMethods";
import Conversation from "../../../../components/conversations/Conversation";
import Pagination from "../../../../components/navigation/Pagination";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import ExploreMore from "../../../../components/navigation/ExploreMore";

export const getServerSideProps = async (context) => {
  const loggedUser = await getLoggedUser(context);
  const conversations = await getUserConversations(loggedUser.data.user.id, context);
  return {
    props: {
      conversations: conversations.data.conversations,
      pagy: conversations.data.pagy
    }
  };
};

const Conversations = ({ conversations, pagy }) => {
  const clientUrl = "users/actions/conversations";

  if (conversations.length === 0) {
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle title='Conversations with other users' />

        <WelcomeTop text='Your conversations' bcgImg='bg-conversations' />
        <ExploreMore
          message='You have no conversations yet'
          body='Keep exploring book insights and see if you want to engage in a deep and thougthful conversation with anybody'
          exortation='Start exploring books now!'
        />
      </div>
    );
  }

  return (
    <div className='pt-10 lg:pt-16'>
      <IconAndTitle title='Conversations with other users' />

      <WelcomeTop text='Your conversations' bcgImg='bg-conversations' />
      <div className='w-5/6 md:w-3/5 2xl:w-1/2 mx-auto py-10'>
        <div className='my-10 '>
          {conversations.map((conv) => (
            <div
              className='my-2 shadow cursor-pointer hover:shadow-md transition-shadow rounded-md text-gray-800 bg-gray-50 border-2 border-transparent hover:border-blue-300'
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
