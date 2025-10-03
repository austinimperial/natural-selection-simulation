/** biome-ignore-all lint/suspicious/noExplicitAny: -- */

import cn from '@repo/utils/style/cn';
import { Upload, X } from 'lucide-react';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { useId, useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import Button from './Button.tsx';
import Label from './Label.tsx';

export type FileInputProps = {
  form: UseFormReturn<any>;
  field: string;
  label?: ReactNode;
  loading?: boolean;
  className?: string;
  clearable?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'form'>;

export default function FileInput({
  form,
  field,
  label,
  required,
  loading = false,
  className,
  id,
  clearable = false,
  ...props
}: FileInputProps) {
  const generatedId = useId();
  id = id ?? generatedId;
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <Label htmlFor={id} required={required} type="file">
          {label}
        </Label>
      )}

      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Controller
            control={form.control}
            name={field}
            render={({ field: controllerField }) => {
              const fieldValue = form.getValues()[field];
              const src =
                typeof fieldValue === 'string' ? fieldValue : undefined;

              return (
                <>
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex flex-wrap items-center gap-4">
                      {src && (
                        <div className="relative">
                          {clearable && (
                            <button
                              className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                              type="button"
                              onClick={() => {
                                form.setValue(field, undefined, {
                                  shouldTouch: true,
                                });
                                if (ref.current) {
                                  ref.current.value = '';
                                }
                              }}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                          <img src={src} className="h-9" alt="Uploaded image" />
                        </div>
                      )}

                      <Button
                        color="blue-transparent"
                        type="button"
                        className="rounded-none p-1 px-3 outline-hidden"
                        onClick={() => {
                          ref.current?.click();
                        }}
                      >
                        <Upload size={16} className="mr-1" />
                        Upload Image
                      </Button>
                    </div>
                  </div>

                  <input
                    {...props}
                    accept="image/png,image/webp,image/jpeg,image/gif"
                    className="hidden"
                    id={id}
                    name={field}
                    onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                      if (loading) {
                        return;
                      }

                      const file = event.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const dataUrl = e.target?.result as string;
                          controllerField.onChange(dataUrl);
                        };
                        reader.readAsDataURL(file);
                      } else {
                        controllerField.onChange(event);
                      }

                      props.onChange?.(event);
                    }}
                    ref={ref}
                    type="file"
                  />
                </>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
