/** biome-ignore-all lint/suspicious/noExplicitAny: -- */

import cn from '@repo/utils/style/cn';
import { Upload, X } from 'lucide-react';
import type React from 'react';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { useId, useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import Button from './Button.tsx';
import FormError from './FormError.tsx';
import Label from './Label.tsx';

type FileInputType = 'file' | 'upload-no-thumbnail' | 'upload-thumbnail';

export type FileInputProps<T extends FileInputType> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'form' | 'type'
> & {
  form: UseFormReturn<any>;
  field: string;
  label?: ReactNode;
  suffix?: ReactNode;
  loading?: boolean;
  className?: string;
} & (T extends 'upload-thumbnail'
    ? {
        type: T;
        clearable?: boolean;
        showThumbnail?: boolean;
      }
    : T extends 'upload-no-thumbnail'
      ? {
          type: T;
          clearable?: boolean;
          showThumbnail?: boolean;
        }
      : {
          type: T;
          clearable?: never;
          showThumbnail?: never;
        });

export default function FileInput<T extends FileInputType>({
  form,
  field,
  label,
  suffix,
  required,
  loading = false,
  className,
  id,
  ...props
}: FileInputProps<T>) {
  const generatedId = useId();
  id = id ?? generatedId;
  const { type, clearable, showThumbnail } = props;

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <Label htmlFor={id} required={required} type={type}>
          {label}
        </Label>
      )}

      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Controller
            control={form.control}
            name={field}
            render={({ field: controllerField }) => {
              const {
                type: _,
                clearable: __,
                showThumbnail: ___,
                ...restComponentProps
              } = props;
              const componentProps = {
                ...restComponentProps,
                ...controllerField,
                id,
                async onChange(event: ChangeEvent<HTMLInputElement>) {
                  if (loading) {
                    return;
                  }

                  const file = event.target.files?.[0];
                  if (
                    file &&
                    (type === 'upload-thumbnail' ||
                      type === 'upload-no-thumbnail')
                  ) {
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
                },
                value: props.value ?? controllerField.value,
              };

              const componentMap: Partial<
                Record<FileInputType, React.ReactElement>
              > = {
                'upload-no-thumbnail': (
                  <ImageInput
                    {...componentProps}
                    clearable={clearable ?? false}
                    showThumbnail={showThumbnail ?? false}
                    form={form}
                    field={field}
                  />
                ),
                'upload-thumbnail': (
                  <ImageInput
                    {...componentProps}
                    clearable={clearable ?? false}
                    showThumbnail={showThumbnail ?? true}
                    form={form}
                    field={field}
                  />
                ),
              };

              return (
                componentMap[type] ?? <input {...componentProps} type={type} />
              );
            }}
          />

          {suffix && <span>{suffix}</span>}
        </div>

        <FormError form={form} field={field} className="mt-2" />
      </div>
    </div>
  );
}

function ImageInput({
  form,
  field,
  clearable = false,
  showThumbnail = true,
  ...props
}: Omit<
  FileInputProps<'upload-thumbnail' | 'upload-no-thumbnail'>,
  'type' | 'clearable' | 'showThumbnail'
> & {
  form: UseFormReturn;
  field: string;
  clearable?: boolean;
  showThumbnail?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const fieldValue = form.getValues()[field];
  const src = typeof fieldValue === 'string' ? fieldValue : undefined;

  return (
    <>
      <div className="flex flex-col items-start gap-1">
        <div className="flex flex-wrap items-center gap-4">
          {showThumbnail && (src || props.defaultValue) && (
            <div className="relative">
              {src && clearable && (
                <button
                  className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                  type="button"
                  onClick={() => {
                    form.setValue(field, undefined, { shouldTouch: true });
                    // Reset the file input to allow re-uploading the same file
                    if (ref.current) {
                      ref.current.value = '';
                    }
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
              <img
                src={src || (props.defaultValue as string)}
                className={cn('h-9', props.className)}
                alt="Uploaded image"
              />
            </div>
          )}

          <Button
            variant="default"
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
        accept="image/png,image/webp,image/jpeg,image/gif"
        className="hidden"
        id={props.id}
        name={field}
        onChange={props.onChange}
        ref={ref}
        type="file"
      />
    </>
  );
}
