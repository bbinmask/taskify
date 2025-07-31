export const fetcher = (url: string) =>
  fetch(`/api${url}`).then((res) => res.json());
