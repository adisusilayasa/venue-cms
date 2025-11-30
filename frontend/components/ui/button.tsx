import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 ease-out font-light tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/20 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        zenPrimary:
          "bg-stone-800 text-white rounded-none hover:bg-stone-700 active:bg-stone-900",
        zenSecondary:
          "bg-white text-stone-700 border border-stone-300 rounded-none hover:bg-stone-50 hover:border-stone-400 active:bg-stone-100",
        zenOutline:
          "border border-stone-300 bg-transparent text-stone-700 rounded-none hover:bg-stone-50 active:bg-stone-100",
        zenGhost:
          "text-stone-700 hover:bg-stone-50 hover:text-stone-900",
        zenLink:
          "text-stone-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-3",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-11 px-8 py-3.5 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "zenPrimary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
