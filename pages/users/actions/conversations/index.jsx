import { getLoggedUser } from "../../../../lib/serverSideMethods";
import { getUserConversations } from "../../../../lib/conversationMethods";

export const getServerSideProps = async (context) => {
  const loggedUser = await getLoggedUser(context);
  const conversations = await getUserConversations(
    loggedUser.data.user.id,
    context
  );
  return {
    props: {
      conversations: conversations.data,
    },
  };
};

const Conversations = ({ conversations }) => {
  return <div></div>;
};

export default Conversations;
