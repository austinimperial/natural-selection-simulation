import cn from '@repo/utils/style/cn';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Select as SelectPrimitive } from 'radix-ui';
import { useEffect, useState } from 'react';

export type Option<T extends string | null> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type SelectVariant = 'default' | 'attached';

export type SelectProps<
  TValue extends string | null,
  TClearable extends boolean = false,
> = {
  'data-testid'?: string;
  className?: string;
  clearable?: TClearable;
  disabled?: boolean;
  id?: string;
  loading?: boolean;
  onChange: (
    value: TClearable extends true ? TValue | undefined : TValue
  ) => void;
  options: Option<TValue>[];
  placeholder?: string;
  value?: TValue;
  variant: SelectVariant;
};

export default function Select<
  TValue extends string | null,
  TClearable extends boolean = false,
>({
  'data-testid': dataTestId,
  className,
  clearable = false as TClearable,
  disabled = false,
  id,
  loading = false,
  onChange,
  options,
  placeholder = 'Select option',
  value,
  variant = 'default',
}: SelectProps<TValue, TClearable>) {
  const [key, setKey] = useState(+Date.now());

  const selectedOption = options.find((option) => option.value === value);

  function stringifyValue(val: TValue | undefined) {
    if (val === undefined) return undefined;
    if (val === null) return '__null__';
    return val;
  }

  function parseValue(str: string) {
    if (str === '__clear__' && clearable) {
      return undefined;
    }
    if (str === '__null__') {
      return null as TValue;
    }
    return str as TValue;
  }

  function handleValueChange(newValue: string) {
    const parsedValue = parseValue(newValue);
    onChange(
      parsedValue as TClearable extends true ? TValue | undefined : TValue
    );
  }

  useEffect(() => {
    // force a re-render when the value is cleared
    if (value === undefined) {
      setKey(+Date.now());
    }
  }, [value]);

  return (
    <SelectPrimitive.Root
      key={key}
      value={stringifyValue(selectedOption?.value)}
      disabled={disabled || loading}
      onValueChange={handleValueChange}
    >
      <SelectTrigger
        data-testid={dataTestId}
        id={id}
        className={className}
        variant={variant}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          data-slot="select-content"
          className="relative z-10 max-h-(--radix-select-content-available-height) min-w-[8rem] translate-y-1 overflow-hidden rounded-md border bg-white shadow-md"
          position="popper"
        >
          <SelectPrimitive.ScrollUpButton
            data-slot="select-scroll-up-button"
            className="flex cursor-default items-center justify-center"
          >
            <ChevronUp absoluteStrokeWidth strokeWidth={1.5} size={16} />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] p-1">
            {clearable && value !== undefined && (
              <SelectItem
                value="__clear__"
                prefix={
                  <X
                    absoluteStrokeWidth
                    strokeWidth={1.5}
                    size={16}
                    className="absolute left-2 text-red-500"
                  />
                }
                className="text-gray-500"
              >
                Clear
              </SelectItem>
            )}
            {options.map((option) => (
              <SelectItem
                key={stringifyValue(option.value)!}
                value={stringifyValue(option.value)!}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton
            data-slot="select-scroll-down-button"
            className="flex cursor-default items-center justify-center"
          >
            <ChevronDown absoluteStrokeWidth strokeWidth={1.5} size={16} />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

const SELECT_TRIGGER_STYLES: Record<SelectVariant, string> = {
  default: '',
  attached: 'rounded-r-[999px] border-l-0 ',
};

function SelectTrigger({
  className,
  children,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  variant?: SelectVariant;
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        'bg-white select-trigger relative flex h-6 flex-1 text-sm items-center justify-between border px-3',
        'data-[placeholder]:text-black [&>span]:line-clamp-1 [&>span]:text-left',
        SELECT_TRIGGER_STYLES[variant],
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown
          absoluteStrokeWidth
          strokeWidth={1.5}
          size={13}
          className="shrink-0 text-black ml-3"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectItem({
  className,
  children,
  prefix,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Item>, 'prefix'> & {
  prefix?: React.ReactNode;
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-pointer items-center rounded-sm pr-2 pl-8 text-sm outline-hidden select-none hover:bg-gray-100 focus:bg-gray-100 data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check
            absoluteStrokeWidth
            strokeWidth={1.5}
            size={16}
            className="text-gray-900"
          />
        </SelectPrimitive.ItemIndicator>
      </span>
      {prefix}
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
