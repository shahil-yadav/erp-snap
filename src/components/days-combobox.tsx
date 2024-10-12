import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { WeeksType } from "@/routes/_auth/time-table/-components/periods"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"

const days: {
    label: WeeksType
    value: WeeksType
}[] = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
]

export function Days({
    value,
    setValue,
}: {
    value: string
    setValue: React.Dispatch<React.SetStateAction<WeeksType | null>>
}) {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value ? days.find((entry) => entry.value === value)?.label : "Select day..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    {/* <CommandInput placeholder="Search in days..." /> */}
                    <CommandList>
                        {/* <CommandEmpty>Not Found</CommandEmpty> */}
                        <CommandGroup>
                            {days.map((day) => (
                                <CommandItem
                                    key={day.value}
                                    value={day.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue as WeeksType)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === day.value ? "opacity-100" : "opacity-0",
                                        )}
                                    />
                                    {day.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
