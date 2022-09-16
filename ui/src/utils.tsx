type Queries = { [key: string]: string | number };
export const urlBuilder = (baseUrl: string, queries?: Queries): string => {
  let queryParams = "";

  if (!!queries) {
    Object.keys(queries).forEach((query, index) => {
      index === 0
        ? (queryParams += `?${query}=${queries[query]}`)
        : (queryParams += `&${query}=${queries[query]}`);
    });
  }
  return `${baseUrl}${queryParams}`;
};
