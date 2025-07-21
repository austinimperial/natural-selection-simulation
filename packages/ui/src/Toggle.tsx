"use client";

import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "@repo/utils";

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  leftLabel: string;
  rightLabel: string;
  className?: string;
}

function Toggle({ value, onValueChange, leftLabel, rightLabel, className }: ToggleProps) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value ? "right" : "left"}
      onValueChange={(newValue) => {
        if (newValue) {
          onValueChange(newValue === "right");
        }
      }}
      className={cn("flex", className)}
    >
      <ToggleGroup.Item
        value="left"
        className="m-0 appearance-none border border-black bg-white p-1.5 outline-none border-r-0 rounded-l-[5px] data-[state=on]:bg-gray-200"
      >
        {leftLabel}
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="right"
        className="m-0 appearance-none border border-black bg-white p-1.5 outline-none rounded-r-[5px] data-[state=on]:bg-gray-200"
      >
        {rightLabel}
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}

export default Toggle; 