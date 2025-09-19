import { cn } from "@lib/utils";
import { Check, Circle } from "lucide-react";
import * as React from "react";

import type { IDropdownProps } from "@interface/common";

export function DropdownMenu({ trigger, items }: IDropdownProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-48 origin-top-right rounded-md border bg-white shadow-lg z-50",
          )}
        >
          <div className="py-1">
            {items.map((item, idx) =>
              item.type === "separator"
                ? (
                    <div key={idx} className="my-1 border-t border-gray-200" />
                  )
                : (
                    <div
                      key={idx}
                      onClick={() => {
                        item.onClick?.();
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 text-left hover:bg-gray-100",
                        item.disabled && "opacity-50 cursor-not-allowed",
                      )}
                    >
                      {item.type === "checkbox" && item.checked && <Check className="h-4 w-4" />}
                      {item.type === "radio" && item.checked && (
                        <Circle className="h-2 w-2 fill-current" />
                      )}
                      {item.icon}
                      {item.label}
                    </div>
                  ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
