import { FetcherWithComponents } from "@remix-run/react";

export const isFetcherLoading = (fetcher: FetcherWithComponents<unknown>) => {
    return fetcher.state === "loading" || fetcher.state === "submitting";
}