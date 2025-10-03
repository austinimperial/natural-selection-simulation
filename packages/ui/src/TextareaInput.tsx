import cn from '@repo/utils/style/cn';
import type { ChangeEvent, ReactNode, TextareaHTMLAttributes } from 'react';
import { useId } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import Label from './Label.tsx';

export type TextareaInputProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'form'
> & {
  form: UseFormReturn<any>;
  field: string;
  label?: ReactNode;
  loading?: boolean;
  className?: string;
};

export default function TextareaInput({
  form,
  field,
  label,
  required,
  loading = false,
  className,
  id,
  ...props
}: TextareaInputProps) {
  const generatedId = useId();
  id = id ?? generatedId;
  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <Label htmlFor={id} required={required} type="textarea">
          {label}
        </Label>
      )}

      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Controller
            control={form.control}
            name={field}
            render={({ field: controllerField }) => (
              <textarea
                {...controllerField}
                id={id}
                value={props.value ?? controllerField.value}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  if (loading) {
                    return;
                  }

                  props.onChange?.(event);
                  return controllerField.onChange(event);
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
