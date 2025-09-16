import cn from '@repo/utils/style/cn';
import type { ChangeEvent, ReactNode, TextareaHTMLAttributes } from 'react';
import { useId } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormError from './FormError.tsx';
import Label from './Label.tsx';

export type TextareaInputProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'form'
> & {
  form: UseFormReturn<any>;
  field: string;
  label?: ReactNode;
  suffix?: ReactNode;
  loading?: boolean;
  className?: string;
};

export default function TextareaInput({
  form,
  field,
  label,
  suffix,
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
            render={({ field: controllerField }) => {
              const componentProps = {
                ...controllerField,
                id,
                onChange(event: ChangeEvent<HTMLTextAreaElement>) {
                  if (loading) {
                    return;
                  }

                  props.onChange?.(event);
                  return controllerField.onChange(event);
                },
                value: props.value ?? controllerField.value,
              };

              return <textarea {...componentProps} />;
            }}
          />

          {suffix && <span>{suffix}</span>}
        </div>

        <FormError form={form} field={field} className="mt-2" />
      </div>
    </div>
  );
}
