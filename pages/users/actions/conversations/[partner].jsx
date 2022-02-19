import { User } from "react-feather";
import { getMessages } from "../../../../lib/conversationMethods";
import { getAvatar } from "../../../../lib/avatarMethods";
import { useState } from "react";
import Message from "../../../../components/conversations/Message";
import MessageForm from "../../../../components/conversations/MessageForm";
import Link from "next/dist/client/link";
import Image from "next/image";

export const getServerSideProps = async (context) => {
  const query = context.params.partner;
  const partner = query
    .split("-")
    .slice(0, query.split("-").length - 2)
    .join("-");
  const conversationId = query.split("-")[query.split("-").length - 2];
  const partnerId = query.split("-")[query.split("-").length - 1];
  const messages = await getMessages(conversationId, context);
  const avatar = await getAvatar(partnerId);

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
    <div className="w-5/6 md:w-4/6 xl:w-3/5 2xl:w-1/2 mx-auto pt-10">
      <div>
        <div className="flex justify-around items-center md:justify-around md:border-b-2 md:border-gray-300 md:pb-10">
          {avatarUrl !== null ? (
            <Image
              src={avatarUrl}
              className="animate-show-up-slow rounded-full"
              layout="fixed"
              width="60"
              height="60"
            />
          ) : (
            <User
              size={60}
              strokeWidth={1.5}
              color="gray"
              className="bg-gray-300 rounded-full p-2"
            />
          )}
          <div className="text-gray-800 text-2xl">
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
