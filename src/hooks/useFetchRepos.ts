import { useEffect, useState } from 'react'
import { repoItem } from '../types/repoItem'
import { getRepos } from '../api/search'

let page = 1;

export default function useFetchRepos(
  query: string,
  lastRepoId: string | undefined,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState<repoItem[] | []>([]);

  const fetchData = async (p: number, isReset = false) => {
    setIsLoading(true);
    try {
      const res = await getRepos(query, p);
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
    } else {
      page = 1
      fetchData(page, true)
    }
  }, [query]);

  useEffect(() => {
    if (lastRepoId !== '') fetchData(++page)
  }, [lastRepoId]);

  return { isLoading, repos }
}
