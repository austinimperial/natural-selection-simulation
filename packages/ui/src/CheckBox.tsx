import * as Checkbox from '@radix-ui/react-checkbox';
import cn from '@repo/utils/style/cn';
import { omit } from 'es-toolkit';
import type { ReactNode } from 'react';
import { useId } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormError from './FormError.tsx';
import Label from './Label.tsx';

export type CheckBoxProps = {
  // biome-ignore lint/suspicious/noExplicitAny: <form component>
  form: UseFormReturn<any>;
  field: string;
  label?: ReactNode;
  loading?: boolean;
  className?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  checkboxClassName?: string;
  onCheckedChange?: (checked: boolean) => void;
};

const CheckBox = ({
  form,
  field,
  label,
  loading = false,
  className,
  id,
  required,
  disabled,
  checkboxClassName,
  onCheckedChange,
  ...props
}: CheckBoxProps) => {
  const generatedId = useId();
  id = id ?? generatedId;

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Controller
            control={form.control}
            name={field}
            render={({ field: controllerField }) => {
              const componentProps = {
                ...omit(props, []),
                ...controllerField,
                id,
                disabled: disabled || loading,
                className: cn(
                  'flex h-4 w-4 appearance-none items-center justify-center rounded border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600',
                  checkboxClassName
                ),
                checked: controllerField.value ?? false,
                onCheckedChange: (checked: boolean) => {
                  if (loading) {
                    return;
                  }

                  onCheckedChange?.(checked);
                  controllerField.onChange(checked);
                },
              };

              return (
                <div className="flex items-center space-x-2">
                  <Checkbox.Root {...componentProps}>
                    <Checkbox.Indicator className="text-white">
                      <span className="text-xs">✓</span>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  {label && (
                    <Label
                      htmlFor={id}
                      className="relative m-0 cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {label}
                    </Label>
                  )}
                </div>
              );
            }}
          />
        </div>

        <FormError form={form} field={field} className="mt-2" />
      </div>
    </div>
  );
};

export default CheckBox;
