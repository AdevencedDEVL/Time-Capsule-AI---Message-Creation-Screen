import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, Sparkles, MessageCircle } from "lucide-react";

interface Suggestion {
  id: string;
  type: "prompt" | "emotional" | "content";
  text: string;
}

interface AIAssistantProps {
  suggestions?: Suggestion[];
  onSuggestionClick?: (suggestion: Suggestion) => void;
}

const AIAssistant = ({
  suggestions = [
    {
      id: "1",
      type: "prompt",
      text: "What advice would you give to your future self?",
    },
    {
      id: "2",
      type: "emotional",
      text: "Your message seems reflective and hopeful",
    },
    {
      id: "3",
      type: "content",
      text: "Consider adding specific goals you hope to achieve",
    },
    { id: "4", type: "prompt", text: "What do you hope will change by then?" },
    {
      id: "5",
      type: "emotional",
      text: "This message carries a sense of optimism",
    },
  ],
  onSuggestionClick = () => {},
}: AIAssistantProps) => {
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "prompt":
        return <Lightbulb className="h-5 w-5" />;
      case "emotional":
        return <Sparkles className="h-5 w-5" />;
      case "content":
        return <MessageCircle className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  return (
    <Card className="h-full bg-white p-6 flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">AI Assistant</h2>
        <p className="text-gray-600">
          Let me help you create a more meaningful message
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion.id}
              variant="outline"
              className="w-full justify-start text-left h-auto p-4 hover:bg-gray-50"
              onClick={() => onSuggestionClick(suggestion)}
            >
              <div className="flex gap-3">
                <div className="text-primary">
                  {getSuggestionIcon(suggestion.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {suggestion.text}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {suggestion.type} suggestion
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          AI suggestions are generated based on your message content and context
        </p>
      </div>
    </Card>
  );
};

export default AIAssistant;
