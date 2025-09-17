import cn from '@repo/utils/style/cn';
import { get } from 'es-toolkit/compat';
import type { ReactNode } from 'react';
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

type FormErrorProps = {
  className?: string;
} & (
  | {
      form: UseFormReturn<FieldValues, unknown, FieldValues>;
      field: FieldPath<FieldValues>;
      children?: never;
    }
  | {
      form?: never;
      field?: never;
      children: ReactNode;
    }
);

export default function FormError({
  form,
  field,
  children,
  className,
}: FormErrorProps) {
  const errorMessage = children ?? getFieldError(form, field);

  if (!errorMessage) {
    return null;
  }

  return (
    <>
      {field && <div className="hidden" data-form-error={field} />}

      <div
        className={cn(
          'rounded-md border border-red-500 bg-red-50 px-3 py-2 leading-relaxed text-red-600',
          className
        )}
      >
        {errorMessage}
      </div>
    </>
  );
}

function getFieldError(
  form: UseFormReturn<FieldValues, unknown, FieldValues> | undefined,
  field: FieldPath<FieldValues> | undefined
): string | undefined {
  if (!form || !field) {
    return undefined;
  }

  const error = get(form.formState.errors, field);
  return error?.message as string | undefined;
}
