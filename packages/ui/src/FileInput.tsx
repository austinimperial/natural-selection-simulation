'use client';

import { cn } from '@repo/utils';
import type React from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type FileInputVariant = 'default';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  variant?: FileInputVariant;
  children?: ReactNode;
  accept?: string;
  multiple?: boolean;
  onChange?: (file: File | null) => void;
}

const FILE_INPUT_STYLES: Record<FileInputVariant, string> = {
  default: 'bg-white border border-black text-black px-2',
};

export default function FileInput({
  variant = 'default',
  className,
  children,
  accept = 'image/*',
  multiple = false,
  onChange,
  ...rest
}: Props): React.JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);
  };

  return (
    <div className="flex">
      <label
        className={cn(
          FILE_INPUT_STYLES[variant],
          'relative cursor-pointer items-center justify-center h-6 text-sm appearance-none rounded-0 overflow-hidden',
          'flex items-center justify-center',
          className
        )}
      >
        {children || 'choose file'}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          {...rest}
        />
      </label>
    </div>
  );
}
