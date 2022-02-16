import dayjs from "dayjs";
import Link from "next/dist/client/link";

const ConvUnit = ({ conversation }) => {
  return (
    <Link
      href={`/users/actions/conversations/${conversation.partner.username}-${conversation.id}`}
    >
      <div className="flex justify-between items-start border rounded px-5 py-2 text-gray-800 bg-gray-50">
        <div className="text-lg text-center">
          {conversation.partner.username}
        </div>
        <div className="text-sm">
          <div className="text-right">{conversation.messages_count} message(s)</div>
          <div>
            {conversation.last_message !== undefined
              ? "Last: " + dayjs(conversation.last_message.created_at).toString()
              : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConvUnit;
