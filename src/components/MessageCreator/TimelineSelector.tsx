import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface TimelineSelectorProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const TimelineSelector = ({
  selectedDate = new Date(),
  onDateSelect = () => {},
}: TimelineSelectorProps) => {
  const presetOptions = [
    {
      label: "1 Month",
      value: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
    {
      label: "1 Year",
      value: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
    {
      label: "5 Years",
      value: new Date(new Date().setFullYear(new Date().getFullYear() + 5)),
    },
  ];

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">
        When should this message be delivered?
      </h3>

      <div className="flex flex-wrap gap-3 mb-6">
        {presetOptions.map((option) => (
          <Button
            key={option.label}
            variant="outline"
            className={cn(
              "flex-1",
              selectedDate.getTime() === option.value.getTime()
                ? "border-primary"
                : "",
            )}
            onClick={() => onDateSelect(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onDateSelect(date)}
              initialFocus
              disabled={(date) =>
                date < new Date() || date > new Date("2100-01-01")
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Your message will be delivered on {format(selectedDate, "PPPP")}
      </div>
    </div>
  );
};

export default TimelineSelector;
