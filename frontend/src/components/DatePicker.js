import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";

export default function DatePicker({ placeholder, setDate, date }) {
  const [selectedPreset, setSelectedPreset] = useState("");

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setSelectedPreset("");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{placeholder || "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          value={selectedPreset}
          onValueChange={(value) => {
            setDate(addDays(new Date(), parseInt(value)));
            setSelectedPreset(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Preset" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={moment(date).toDate()}
            onSelect={handleDateSelect}
            className="rounded-md"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

DatePicker.propTypes = {
  placeholder: PropTypes.string,
  setDate: PropTypes.func.isRequired,
  date: PropTypes.any,
};
