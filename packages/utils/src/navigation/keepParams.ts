import isBrowser from '../common/isBrowser.ts';

export default function keepParams(
  path: string,
  retainedSearchParams: string[]
): string {
  if (!isBrowser()) {
    return path;
  }

  const searchParams = new URLSearchParams(window.location.search);

  const retainedParams = retainedSearchParams
    .filter((param) => searchParams.has(param))
    .reduce(
      (acc, param) => {
        acc[param] = searchParams.get(param)!;
        return acc;
      },
      {} as Record<string, string>
    );

  if (Object.keys(retainedParams).length === 0) {
    return path;
  }

  const queryString = new URLSearchParams(retainedParams).toString();
  return `${path}?${queryString}`;
}
