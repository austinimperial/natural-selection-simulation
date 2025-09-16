'use client';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import cn from '@repo/utils/style/cn';

interface ToggleProps {
  value: string;
  onValueChange: (value: string) => void;
  left: { label: string; value: string };
  right: { label: string; value: string };
  className?: string;
}

function Toggle({ value, onValueChange, left, right, className }: ToggleProps) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(newValue) => onValueChange(newValue)}
      className={cn('flex', className)}
    >
      <ToggleGroup.Item
        value={left.value}
        className="m-0 cursor-pointer appearance-none rounded-l-[5px] border border-r-0 border-black bg-white p-1.5 outline-none data-[state=on]:bg-gray-200"
      >
        {left.label}
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value={right.value}
        className="m-0 cursor-pointer appearance-none rounded-r-[5px] border border-black bg-white p-1.5 outline-none data-[state=on]:bg-gray-200"
      >
        {right.label}
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}

export default Toggle;
