export function getParams(link) {
  const { searchParams } = new URL(link);
  return Object.fromEntries(searchParams);
}
