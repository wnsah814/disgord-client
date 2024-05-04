import ChatChat from "../components/chat/ChatChat";
import ChatLayout from "../components/chat/ChatLayout";
import ChatParticipants from "../components/chat/ChatParticipants";

export default function Chat() {
  return (
    <div className="flex flex-row gap-4 h-full">
      <ChatLayout />
      <div className="flex flex-col gap-4 w-96 h-full">
        <ChatParticipants />
        <ChatChat />
      </div>
    </div>
  );
}
