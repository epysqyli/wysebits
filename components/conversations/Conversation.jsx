import dayjs from "dayjs";
import Link from "next/dist/client/link";
import Avatar from "../users/Avatar";

const Conversation = ({ conversation }) => {
  return (
    <Link
      href={`/users/actions/conversations/${conversation.partner.username}-${conversation.id}-${conversation.partner.id}`}
    >
      <div className='flex justify-between items-start px-5 py-2'>
        <div className='flex items-center gap-x-5'>
          <Avatar avatarUrl={conversation.partner.avatar_url} size={40} />
          <div className='text-lg text-center'>{conversation.partner.username}</div>
        </div>
        <div className='text-sm text-right'>
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
