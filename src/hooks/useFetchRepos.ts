/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getRepos } from '../api/search'
import { cancelRequest } from '../api/search';

let page = 1;

export default function useFetchRepos(
  query: string,
  lastRepoId: string | undefined,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState<any[] | []>([]);
  const [hasMoreRepos, setHasMoreRepos] = useState(false);

  const fetchData = async (p: number, isReset = false) => {
    setIsLoading(true);
    try {
      const res = await getRepos(query, p);
      setHasMoreRepos(res.data.items.length > 0);
      (isReset) ? setRepos(res.data.items) : setRepos((previousRepos => [...previousRepos, ...res.data.items]));
    } catch (err) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (query === '') {
      setRepos([]);
      cancelRequest();
    } else {
      if (isLoading) return;
      page = 1;
      fetchData(page, true)
    }
  }, [query]);

  useEffect(() => {
    if (lastRepoId !== '') fetchData(++page)
  }, [lastRepoId]);

  return { isLoading, repos, hasMoreRepos }
}
