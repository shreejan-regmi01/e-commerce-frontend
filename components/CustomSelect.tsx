import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

export default function CustomSelect({
  open,
  setOpen,
  selectedOptionValue,
  setSelectedOptionValue,
  existingOptions,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedOptionValue: string;
  setSelectedOptionValue: (selectedOptionValue: string) => void;
  existingOptions: any[];
}) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !selectedOptionValue && "text-muted-foreground"
          )}
        >
          {selectedOptionValue
            ? existingOptions.find(
                (c) => c.id.toString() === selectedOptionValue
              )?.name
            : "Select (Optional)"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="none"
                onSelect={() => {
                  setSelectedOptionValue("");
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedOptionValue === "" ? "opacity-100" : "opacity-0"
                  )}
                />
                --
              </CommandItem>
              {existingOptions.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => {
                    setSelectedOptionValue(option.id.toString());
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedOptionValue === option.id.toString()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
