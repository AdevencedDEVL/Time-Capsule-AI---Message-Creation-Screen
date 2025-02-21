import React from "react";
import MessageComposer from "./MessageCreator/MessageComposer";
import AIAssistant from "./MessageCreator/AIAssistant";
import PreviewModal from "./MessageCreator/PreviewModal";

interface MessageData {
  content: string;
  type: "text" | "voice" | "video";
  deliveryDate: Date;
  tags: Array<{ id: string; label: string }>;
}

const Home = () => {
  const [messageData, setMessageData] = React.useState<MessageData>({
    content: "",
    type: "text",
    deliveryDate: new Date(),
    tags: [],
  });
  const [showPreview, setShowPreview] = React.useState(false);

  const handleMessageSubmit = (data: MessageData) => {
    setMessageData(data);
    setShowPreview(true);
  };

  const handleSuggestionClick = (suggestion: {
    id: string;
    type: string;
    text: string;
  }) => {
    if (suggestion.type === "prompt" || suggestion.type === "content") {
      setMessageData((prev) => ({
        ...prev,
        content: prev.content
          ? `${prev.content}\n\n${suggestion.text}`
          : suggestion.text,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-[1512px] mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Create Your Time Capsule Message
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">
          <MessageComposer onSubmit={handleMessageSubmit} />

          <AIAssistant onSuggestionClick={handleSuggestionClick} />
        </div>

        <PreviewModal
          open={showPreview}
          onOpenChange={setShowPreview}
          messageContent={messageData.content}
          messageType={messageData.type}
          deliveryDate={messageData.deliveryDate}
          tags={messageData.tags}
        />
      </div>
    </div>
  );
};

export default Home;
