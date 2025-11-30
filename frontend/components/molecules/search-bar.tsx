"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch: (query: string) => void
  onClear: () => void
  placeholder?: string
  defaultValue?: string
}

export function SearchBar({
  onSearch,
  onClear,
  placeholder = "Search by name or location...",
  defaultValue = "",
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }

  const handleClear = () => {
    setValue("")
    onClear()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-32"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <Button type="submit" variant="zenPrimary" size="sm">
            Search
          </Button>
          <Button type="button" variant="zenSecondary" size="sm" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </form>
  )
}
