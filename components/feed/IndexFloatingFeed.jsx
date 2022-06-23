import FloatingBubble from "../decorations/FloatingBubble";
import Link from "next/dist/client/link";
import { Layers } from "react-feather";

const IndexFloatingFeed = () => {
  return (
    <div className="md:flex justify-center items-center">
      <div className="hidden md:block relative h-80 w-20">
        <FloatingBubble addStyle="-top-4 -right-4" />
        <FloatingBubble addStyle="-top-4 right-5" />
        <FloatingBubble addStyle="-top-4 right-14" />
        <FloatingBubble addStyle="top-3 right-5" />
        <FloatingBubble addStyle="top-3 -right-4" />
        <FloatingBubble addStyle="top-3 right-14" />
        <FloatingBubble addStyle="top-10 right-14" />
        <FloatingBubble addStyle="top-10 right-5" />
      </div>
      <Link href="/feed">
        <div className="mx-auto md:mx-0 my-16 lg:my-20 w-11/12 md:w-3/5 lg:w-2/5 2xl:w-1/3 px-2 py-12 rounded-md bg-white hover:bg-gray-50 active:shadow-inner active:bg-blue-100 transition-colors cursor-pointer">
          <div className="text-gray-600 mx-auto">
            <Layers size={60} strokeWidth={1.5} className="mb-10 mx-auto" />
            <div className="text-center text-4xl font-medium">
              Latest insights
            </div>
          </div>
        </div>
      </Link>
      <div className="hidden md:block relative h-80 w-20">
        <FloatingBubble addStyle="-bottom-4 -left-4" />
        <FloatingBubble addStyle="-bottom-4 left-5" />
        <FloatingBubble addStyle="-bottom-4 left-14" />
        <FloatingBubble addStyle="bottom-3 left-5" />
        <FloatingBubble addStyle="bottom-3 -left-4" />
        <FloatingBubble addStyle="bottom-3 left-14" />
        <FloatingBubble addStyle="bottom-10 left-14" />
        <FloatingBubble addStyle="bottom-10 left-5" />
      </div>
    </div>
  );
};

export default IndexFloatingFeed;
