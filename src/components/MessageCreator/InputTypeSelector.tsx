import React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Mic, Video, Type } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

interface InputTypeSelectorProps {
  selectedType?: "text" | "voice" | "video";
  onTypeChange?: (type: "text" | "voice" | "video") => void;
}

const InputTypeSelector = ({
  selectedType = "text",
  onTypeChange = () => {},
}: InputTypeSelectorProps) => {
  return (
    <Card className="w-full bg-white p-4 border-b">
      <TooltipProvider>
        <div className="flex justify-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={selectedType === "text"}
                onPressedChange={() => onTypeChange("text")}
                aria-label="Text input"
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <Type className="h-5 w-5" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Text message</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={selectedType === "voice"}
                onPressedChange={() => onTypeChange("voice")}
                aria-label="Voice input"
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <Mic className="h-5 w-5" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Voice message</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={selectedType === "video"}
                onPressedChange={() => onTypeChange("video")}
                aria-label="Video input"
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <Video className="h-5 w-5" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Video message</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </Card>
  );
};

export default InputTypeSelector;
