import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

const roles = [
  {
    value: "user",
    label: "User",
    icon: "👤",
  },
  {
    value: "teacher",
    label: "Teacher",
    icon: "👨‍🏫",
  },
  {
    value: "admin",
    label: "Admin",
    icon: "👑",
  },
];

interface RoleComboboxProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function RoleCombobox({ value, onChange, disabled }: RoleComboboxProps) {
  const [open, setOpen] = useState(false);

  const selectedRole = roles.find((role) => role.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-[130px] justify-between text-sm h-9"
        >
          <span className="flex items-center gap-1.5">
            {selectedRole?.icon} {selectedRole?.label}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>Không tìm thấy.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role.value}
                  value={role.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === role.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex items-center gap-1.5">
                    {role.icon} {role.label}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
