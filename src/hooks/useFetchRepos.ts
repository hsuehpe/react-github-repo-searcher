import { useEffect, useState } from 'react'
import { repoItem } from '../types/repoItem'
import { getRepos } from '../api/search'

export default function useFetchRepos(
  query: string
) {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [items, setItems] = useState<repoItem[] | []>([])

  useEffect(() => {
    (async function fetchdata() {
      setIsLoading(true);
      try {
        const res = await getRepos(query);
        setItems([...res.data.items]);
      } catch (err) {
        setHasError(true);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    })()
  }, [query]);

  return { isLoading, items, hasError }
}