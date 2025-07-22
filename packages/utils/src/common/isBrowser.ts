export default function isBrowser(): boolean {
  return (
    typeof window !== 'undefined' && typeof window.location !== 'undefined'
  );
}
