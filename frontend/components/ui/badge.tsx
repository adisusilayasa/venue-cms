import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-none border px-3 py-1 text-xs font-light transition-colors",
  {
    variants: {
      variant: {
        zenDefault:
          "border-transparent bg-stone-100 text-stone-600",
        zenOutline:
          "text-stone-700 border-stone-300",
        zenSuccess:
          "border-transparent bg-emerald-50 text-emerald-700",
        zenWarning:
          "border-transparent bg-amber-50 text-amber-700",
        zenError:
          "border-transparent bg-red-50 text-red-700",
      },
    },
    defaultVariants: {
      variant: "zenDefault",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
