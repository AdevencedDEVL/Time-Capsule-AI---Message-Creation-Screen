import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";

interface Tag {
  id: string;
  label: string;
  isAISuggested?: boolean;
}

interface TagSelectorProps {
  tags?: Tag[];
  aiSuggestions?: Tag[];
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tagId: string) => void;
  onAcceptSuggestion?: (tag: Tag) => void;
}

const TagSelector = ({
  tags = [
    { id: "1", label: "Memory" },
    { id: "2", label: "Life Event" },
  ],
  aiSuggestions = [
    { id: "ai1", label: "Reflection", isAISuggested: true },
    { id: "ai2", label: "Personal Growth", isAISuggested: true },
  ],
  onAddTag = () => {},
  onRemoveTag = () => {},
  onAcceptSuggestion = () => {},
}: TagSelectorProps) => {
  const [newTag, setNewTag] = React.useState("");

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag("");
    }
  };

  return (
    <div className="w-full p-4 space-y-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="px-3 py-1 flex items-center gap-1"
            >
              {tag.label}
              <button
                onClick={() => onRemoveTag(tag.id)}
                className="ml-1 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <form onSubmit={handleAddTag} className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </form>

      {aiSuggestions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">AI Suggestions</h4>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((suggestion) => (
              <Badge
                key={suggestion.id}
                variant="outline"
                className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                onClick={() => onAcceptSuggestion(suggestion)}
              >
                {suggestion.label}
                <Plus className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;
