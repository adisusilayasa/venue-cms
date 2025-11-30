import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-none border border-stone-200/80 bg-stone-50 px-4 py-3.5 text-sm font-light text-stone-800 placeholder:text-stone-400 transition-all duration-200 ease-out hover:border-stone-300 focus:border-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-400/10 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
