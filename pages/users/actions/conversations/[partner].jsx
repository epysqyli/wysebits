import IconAndTitle from "../../../../components/layout/IconAndTitle";
import { getMessages } from "../../../../lib/conversationMethods";
import { getAvatar } from "../../../../lib/avatarMethods";
import { useState } from "react";
import Message from "../../../../components/conversations/Message";
import MessageForm from "../../../../components/conversations/MessageForm";
import Link from "next/dist/client/link";
import Avatar from "../../../../components/users/Avatar";

export const getServerSideProps = async (context) => {
  const query = context.params.partner;
  const partner = query
    .split("-")
    .slice(0, query.split("-").length - 2)
    .join("-");
  const conversationId = query.split("-")[query.split("-").length - 2];
  const partnerId = query.split("-")[query.split("-").length - 1];

  const [messages, avatar] = await Promise.all([
    getMessages(conversationId, context),
    getAvatar(partnerId),
  ]);

  return {
    props: {
      messages: messages.data.messages,
      partner: partner,
      conversationId: conversationId,
      avatarUrl: avatar.data,
    },
  };
};

const Conversation = ({
  messages,
  partner,
  userState,
  conversationId,
  avatarUrl,
}) => {
  const [messagesState, setMessagesState] = useState(messages);

  const isLastMsg = (msg) => {
    const length = messagesState.length;
    if (messagesState.indexOf(msg) == length - 1) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-11/12 md:w-4/6 xl:w-3/5 2xl:w-1/2 mx-auto pt-16">
      <IconAndTitle title={`Conversation with ${partner}`}/>
      <div>
        <div className="flex justify-around items-center md:justify-around md:border-b-2 md:border-gray-300 md:pb-10">
          <Avatar avatarUrl={avatarUrl} size={60} />
          <div className="text-gray-50 text-2xl">
            Conversation with{" "}
            <div className="underline hover:text-gray-600 active:text-gray-800 text-right">
              <Link href={`/creators/${partner}`}>{partner}</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:w-4/5 mx-auto h-1/2 max-h-96 overflow-auto px-3 shadow-inner rounded-md">
          {messagesState.map((msg) => {
            return (
              <Message
                message={msg}
                isLastMsg={isLastMsg}
                currentUserId={userState.user.id}
                key={msg.id}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-16">
        <MessageForm
          messagesState={messagesState}
          setMessagesState={setMessagesState}
          partner={partner}
          conversationId={conversationId}
          userId={userState.user.id}
        />
      </div>
    </div>
  );
};

export default Conversation;
