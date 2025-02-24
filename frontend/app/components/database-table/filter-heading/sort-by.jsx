"use client"

import * as React from "react"

import { Button } from "../../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@radix-ui/react-dropdown-menu"
import { ChevronDown } from "lucide-react"
// import { DropdownMenu } from "@/components/ui/dropdown-menu"

const items = [
    {
        label: "Name",
        value: "name"
    },
    {
        label: "Scanned Date",
        value: "scanned_at"
    },
    {
        Category: "Category",
        value: "category_id"
    }
]

const SortBy = () => {
  const [sortBy, setSortBy] = React.useState("scanned_at")

  return (
    <DropdownMenu>
      <div className="flex items-center space-x-1">
        <p className="text-md font-semibold font-Ovo text-[#102258]">
            Sort By:
        </p>
        <DropdownMenuTrigger asChild>
        <div className = "flex items-center space-x-1 cursor-pointer">
            <p className="text-primary font-semibold text-[#1c4de3] tex-md font-Ovo">
                {items.find(item => item.value == sortBy)?.label}
            </p>
                <ChevronDown className="ml-2 h-4 w-4" />
            </div>
        {/* <Button variant="ghost" size="sm" className="text-primary font-semibold">
             {items.find(item => item.value == sortBy)?.label}
             <ChevronDown className="ml-2 h-4 w-4" />
         </Button> */}
        </DropdownMenuTrigger>

      </div>

      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>
            Sort By
        </DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy} className="font-Ovo text-[#102258]">
            {items.map(item => <DropdownMenuRadioItem value ={item.value}
                key = {item.value}
            >
                {item.label}
            </DropdownMenuRadioItem>)}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortBy
