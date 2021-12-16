import { useEffect, useState } from 'react'
import { repoItem } from '../types/repoItem'
import { getRepos } from '../api/search'

export default function useFetchRepos(
  query: string,
  page: number
) {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<repoItem[] | []>([])
  const [isQueryChanged, setIsQueryChanged] = useState(false)

  const fetchData = async (p: number) => {
    setIsLoading(true);
    try {
      const res = await getRepos(query, p);
      setItems([...res.data.items]);
    } catch (err) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (query === '') {
      setItems([]);
    } else {
      fetchData(1)
    }

    setIsQueryChanged(true)
  }, [query]);

  useEffect(() => {
    fetchData(page)
    setIsQueryChanged(false)
  }, [page])

  return { isLoading, items, isQueryChanged }
}