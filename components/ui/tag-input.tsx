"use client";

import * as React from "react";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TagInputProps {
  /** Initial tags to display */
  initialTags?: string[];
  /** Callback when tags change */
  onChange?: (tags: string[]) => void;
  /** Placeholder for the input */
  placeholder?: string;
  /** Custom class for the wrapper */
  className?: string;
}

export function TagInput({
  initialTags = [],
  onChange,
  placeholder = "New tag...",
  className,
}: TagInputProps) {
  const [tags, setTags] = React.useState<string[]>(initialTags);
  const [isInputActive, setIsInputActive] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Sync with initialTags if they change externally (optional, but good practice)
  React.useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const handleAddTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      const newTags = [...tags, trimmedValue];
      setTags(newTags);
      onChange?.(newTags);
    }
    setInputValue("");
    setIsInputActive(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === "Escape") {
      setIsInputActive(false);
      setInputValue("");
    }
  };

  // Focus input when it becomes active
  React.useEffect(() => {
    if (isInputActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="h-8 px-2 text-sm font-medium"
        >
          {tag}
          <button
            type="button"
            className="ml-2 hover:bg-muted rounded-full p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => handleRemoveTag(tag)}
            aria-label={`Remove ${tag} tag`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {isInputActive ? (
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleAddTag} // Commit on blur (clicking outside)
          className="h-8 w-[120px] px-2 text-sm"
          placeholder={placeholder}
        />
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 border-dashed"
          onClick={() => setIsInputActive(true)}
        >
          <Plus className="mr-2 h-3 w-3" />
          New Tag
        </Button>
      )}
    </div>
  );
}
