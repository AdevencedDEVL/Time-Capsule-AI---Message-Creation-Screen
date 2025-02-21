import React from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import InputTypeSelector from "./InputTypeSelector";
import TimelineSelector from "./TimelineSelector";
import TagSelector from "./TagSelector";

interface MessageComposerProps {
  onSubmit?: (message: {
    content: string;
    type: "text" | "voice" | "video";
    deliveryDate: Date;
    tags: Array<{ id: string; label: string }>;
  }) => void;
}

const MessageComposer = ({ onSubmit = () => {} }: MessageComposerProps) => {
  const [inputType, setInputType] = React.useState<"text" | "voice" | "video">(
    "text",
  );
  const [messageContent, setMessageContent] = React.useState("");
  const [deliveryDate, setDeliveryDate] = React.useState(new Date());
  const [tags, setTags] = React.useState([
    { id: "1", label: "Memory" },
    { id: "2", label: "Life Event" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      content: messageContent,
      type: inputType,
      deliveryDate,
      tags,
    });
  };

  const handleAddTag = (label: string) => {
    setTags([...tags, { id: Date.now().toString(), label }]);
  };

  const handleRemoveTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  return (
    <Card className="w-full h-full bg-white overflow-y-auto">
      <form onSubmit={handleSubmit} className="h-full flex flex-col">
        <InputTypeSelector
          selectedType={inputType}
          onTypeChange={setInputType}
        />

        <div className="flex-1 p-6">
          {inputType === "text" ? (
            <Textarea
              placeholder="Write your message to your future self..."
              className="min-h-[200px] resize-none"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          ) : inputType === "voice" ? (
            <div className="flex items-center justify-center h-[200px] border-2 border-dashed rounded-lg">
              <p className="text-gray-500">
                Voice recording feature coming soon
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] border-2 border-dashed rounded-lg">
              <p className="text-gray-500">
                Video recording feature coming soon
              </p>
            </div>
          )}

          <div className="mt-6">
            <TimelineSelector
              selectedDate={deliveryDate}
              onDateSelect={setDeliveryDate}
            />
          </div>

          <div className="mt-6">
            <TagSelector
              tags={tags}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              aiSuggestions={[
                { id: "ai1", label: "Reflection", isAISuggested: true },
                { id: "ai2", label: "Personal Growth", isAISuggested: true },
              ]}
              onAcceptSuggestion={(tag) => handleAddTag(tag.label)}
            />
          </div>
        </div>

        <div className="p-4 border-t">
          <Button type="submit" className="w-full" size="lg">
            <Send className="w-4 h-4 mr-2" />
            Send to Future Self
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default MessageComposer;
