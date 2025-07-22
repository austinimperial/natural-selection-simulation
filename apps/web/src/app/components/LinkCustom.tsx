import keepParams from '@repo/utils/navigation/keepParams';
import Link from 'next/link';

/**
 * Custom <Link> component, which retains the `as` search param.
 */
export default function LinkCustom({
  href,
  ...props
}: Parameters<typeof Link>[0]) {
  return <Link {...props} href={keepParams(href as string, ['as'])} />;
}
