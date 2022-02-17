import { MessageCircle } from "react-feather";
import { getMessages } from "../../../../lib/conversationMethods";
import { useState } from "react";
import Message from "../../../../components/conversations/Message";
import MessageForm from "../../../../components/conversations/MessageForm";
import Link from "next/dist/client/link";

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
      conversationId: id,
    },
  };
};

const Conversation = ({ messages, partner, userState, conversationId }) => {
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
          <MessageCircle
            size={36}
            strokeWidth={1.5}
            className="text-gray-700"
          />
          <div className="text-gray-800 text-2xl">
            Conversation with{" "}
            <span className="underline hover:text-gray-600 active:text-gray-800">
              <Link href={`/creators/${partner}`}>{partner}</Link>
            </span>
          </div>
        </div>

        <div className="mt-10 lg:w-4/5 mx-auto h-1/2 max-h-96 overflow-y-scroll pr-3">
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
