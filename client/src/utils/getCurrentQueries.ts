import { Queries } from "../types/typings";

export const getCurrentQueries = (
  searchParams: URLSearchParams,
  queries: Queries
) => {
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  queries.searchName
    ? current.set("searchName", queries.searchName)
    : current.delete("searchName");
  queries.sort ? current.set("sort", queries.sort) : current.delete("sort");
  queries.type ? current.set("type", queries.type) : current.delete("type");
  queries.parking ? current.set("parking", "true") : current.delete("parking");
  queries.furnished
    ? current.set("furnished", "true")
    : current.delete("furnished");
  const query = current.toString();
  return query;
};
