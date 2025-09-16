import * as RadixSelect from '@radix-ui/react-select';
import cn from '@repo/utils/style/cn';
import { Check, ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import React from 'react';
import type {
  FieldPath,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormError from './FormError.tsx';
import Label from './Label.tsx';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type Option<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

interface SelectContentProps {
  className?: string;
  children: ReactNode;
  position?: 'popper' | 'item-aligned';
}

interface SelectItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

interface SelectTriggerProps {
  className?: string;
  children: ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={cn(
      'flex items-center justify-between border border-black bg-white px-3 ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 py-1',
      className
    )}
    {...props}
  >
    {children}
    <RadixSelect.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
));
SelectTrigger.displayName = RadixSelect.Trigger.displayName;

const SelectValue = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Value>,
  SelectValueProps
>(({ className, ...props }, ref) => (
  <RadixSelect.Value ref={ref} className={cn('', className)} {...props} />
));
SelectValue.displayName = RadixSelect.Value.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  SelectContentProps
>(({ className, children, position = 'popper', ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-black bg-white text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      position={position}
      sideOffset={4}
      {...props}
    >
      <RadixSelect.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Portal>
));
SelectContent.displayName = RadixSelect.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm p-1 px-3 outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="flex mr-2 h-3.5 w-3.5 items-center justify-center">
      <RadixSelect.ItemIndicator>
        <Check className="h-4 w-4" />
      </RadixSelect.ItemIndicator>
    </span>

    <RadixSelect.ItemText className="ml-2">{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));
SelectItem.displayName = RadixSelect.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>
>(({ className, ...props }, ref) => (
  <RadixSelect.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-gray-100', className)}
    {...props}
  />
));
SelectSeparator.displayName = RadixSelect.Separator.displayName;

// Convenience component for common use cases
interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  className?: string;
  label?: ReactNode;
  loading?: boolean;
}

// Form-integrated Select component
interface FormSelectProps<T extends FieldValues = FieldValues> {
  options: SelectOption[];
  form: UseFormReturn<T>;
  field: Path<T>;
  label?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  className?: string;
}

function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select an option...',
  disabled,
  required,
  name,
  className,
  ...props
}: SelectProps): React.JSX.Element {
  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
      name={name}
      {...props}
    >
      <div className={cn('relative', className)}></div>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </RadixSelect.Root>
  );
}

function FormSelect<T extends FieldValues = FieldValues>({
  options,
  form,
  field,
  label,
  placeholder = 'Select an option...',
  disabled,
  required,
  loading = false,
  className,
}: FormSelectProps<T>): React.JSX.Element {
  const generatedId = React.useId();
  const selectId = `select-${field}-${generatedId}`;

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <Label htmlFor={selectId} required={required}>
          {label}
        </Label>
      )}

      <div className="flex flex-col">
        <Controller
          control={form.control}
          name={field}
          render={({ field: controllerField }) => {
            const componentProps = {
              ...controllerField,
              onValueChange: (value: string) => {
                if (loading) {
                  return;
                }
                controllerField.onChange(value);
              },
              value: controllerField.value || '',
            };

            return (
              <RadixSelect.Root
                {...componentProps}
                disabled={disabled || loading}
                required={required}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </RadixSelect.Root>
            );
          }}
        />

        <FormError
          form={form as UseFormReturn<FieldValues>}
          field={field as FieldPath<FieldValues>}
          className="mt-2"
        />
      </div>
    </div>
  );
}

export default Select;

export {
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  FormSelect,
};
