import Link from "next/dist/client/link";

const ConvUnit = ({ conversation }) => {
  return (
    <div>
      <div className="flex items-start justify-between border rounded px-5 py-2 text-gray-800 bg-gray-50">
        <div className="text-lg text-center">{conversation.partner.username}</div>
        <div className="text-sm">
          <div>{conversation.messages.length} messages</div>
          <div>Last message timestamp: ...</div>
        </div>
      </div>
    </div>
  );
};

export default ConvUnit;
