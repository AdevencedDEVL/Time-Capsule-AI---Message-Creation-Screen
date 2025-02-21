import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, Tag } from "lucide-react";

interface PreviewModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  messageContent?: string;
  messageType?: "text" | "voice" | "video";
  deliveryDate?: Date;
  tags?: Array<{ id: string; label: string }>;
}

const PreviewModal = ({
  open = true,
  onOpenChange = () => {},
  messageContent = "This is a preview of your future message. Remember this moment and reflect on how far you've come.",
  messageType = "text",
  deliveryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  tags = [
    { id: "1", label: "Memory" },
    { id: "2", label: "Life Event" },
  ],
}: PreviewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Message Preview</DialogTitle>
          <DialogDescription>
            This is how your time capsule message will appear when it's opened
            in the future.
          </DialogDescription>
        </DialogHeader>

        <Card className="p-6 my-4 bg-white space-y-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Will be delivered on {format(deliveryDate, "PPPP")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="min-h-[200px] p-4 rounded-lg bg-gray-50">
            {messageType === "text" && (
              <div className="prose">
                <p>{messageContent}</p>
              </div>
            )}
            {messageType === "voice" && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    🎤
                  </div>
                  <p className="text-gray-600">Voice Message</p>
                </div>
              </div>
            )}
            {messageType === "video" && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    🎥
                  </div>
                  <p className="text-gray-600">Video Message</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
