import { cn } from '@repo/utils';
import type React from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type FileInputVariant = 'default';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  variant?: FileInputVariant;
  children?: ReactNode;
  onChange?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
}

const FILE_INPUT_STYLES: Record<FileInputVariant, string> = {
  default: 'bg-white border border-black text-black px-2',
};

export default function FileInput({
  variant = 'default',
  className,
  children,
  onChange,
  accept = 'image/*',
  multiple = false,
  ...rest
}: Props): React.JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.files);
    }
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
