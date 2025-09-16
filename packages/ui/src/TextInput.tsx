import cn from '@repo/utils/style/cn';
import { omit } from 'es-toolkit';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormError from './FormError.tsx';
import Label from './Label.tsx';

type TextInputType = 'text' | 'search' | 'email' | 'url';

export type TextInputProps<T extends TextInputType> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'form' | 'type'
> & {
  form: UseFormReturn<any>;
  field: string;
  label?: ReactNode;
  suffix?: ReactNode;
  loading?: boolean;
  className?: string;
  type: T;
};

export default function TextInput<T extends TextInputType>({
  form,
  field,
  label,
  suffix,
  required,
  loading = false,
  className,
  id,
  ...props
}: TextInputProps<T>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const { type } = props;

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <Label htmlFor={inputId} required={required} type={type}>
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
                // biome-ignore lint/suspicious/noExplicitAny: --
                ...omit(props, ['type'] as any),
                ...controllerField,
                id: inputId,
                onChange(event: ChangeEvent<HTMLInputElement>) {
                  if (loading) {
                    return;
                  }

                  props.onChange?.(event);
                  return controllerField.onChange(event);
                },
                value: props.value ?? controllerField.value,
              };

              return <input {...componentProps} type={type} />;
            }}
          />

          {suffix && <span>{suffix}</span>}
        </div>

        <FormError form={form} field={field} className="mt-2" />
      </div>
    </div>
  );
}
