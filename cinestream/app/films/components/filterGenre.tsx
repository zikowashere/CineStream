"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const genre = [
  {
    value: "Comedy",
    label: "Comedy",
  },
  {
    value: "Comedy horror",
    label: "Comedy Horror",
  },
  {
    value: "Comedy mystery",
    label: "Comedy Mystery",
  },
  {
    value: "Concert film",
    label: "Concert Film",
  },
  {
    value: "Animation",
    label: "Animation",
  },
];

const FilterGenre = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  const getFilmsByGenre = async (genre: string) => {
    router.push(`/films/genre/${genre}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between bg-teal-100 "
        >
          {value
            ? genre.find((genre) => genre.value === value)?.label
            : "Select Movie Genre..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search genre..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {genre.map((genre) => (
              <CommandItem
                key={genre.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  getFilmsByGenre(currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === genre.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {genre.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default FilterGenre;
