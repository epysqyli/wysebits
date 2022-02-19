import dayjs from "dayjs";
import Link from "next/dist/client/link";
import { User } from "react-feather";
import Image from "next/dist/client/image";

const Conversation = ({ conversation }) => {
  return (
    <Link
      href={`/users/actions/conversations/${conversation.partner.username}-${conversation.id}-${conversation.partner.id}`}
    >
      <div className="flex justify-between items-start px-5 py-2">
        <div className="flex items-center gap-x-5">
          {conversation.partner.avatar_url !== null ? (
            <Image
              src={conversation.partner.avatar_url}
              className="animate-show-up-slow rounded-full"
              layout="fixed"
              width="38"
              height="38"
            />
          ) : (
            <User
              size={40}
              strokeWidth={1.5}
              color="gray"
              className="bg-gray-300 rounded-full p-2"
            />
          )}
          <div className="text-lg text-center">
            {conversation.partner.username}
          </div>
        </div>
        <div className="text-sm text-right">
          <div>{conversation.messages_count} message(s)</div>
          <div>
            {conversation.last_message !== undefined
              ? dayjs(conversation.last_message.created_at).toString()
              : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Conversation;
