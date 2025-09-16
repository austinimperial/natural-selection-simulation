import cn from '@repo/utils/style/cn';
import type * as React from 'react';

type Props = React.ComponentProps<'label'> & {
  required?: boolean;
  type?: 'checkbox' | 'radio' | (string & {});
  htmlFor?: string;
};

export default function Label({
  children,
  className,
  required = false,
  type,
  htmlFor,
  ...props
}: Props) {
  return (
    <label
      data-slot="label"
      htmlFor={htmlFor}
      className={cn(
        'wrap absolute -mt-6 flex items-center gap-1 whitespace-nowrap',
        (type === 'checkbox' || type === 'radio') &&
          'relative mt-0 text-gray-900',
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="text-red-500">
          *
        </span>
      )}
    </label>
  );
}
