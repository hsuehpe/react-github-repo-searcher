import { useState, useMemo, ChangeEvent, useRef, MutableRefObject } from 'react'
import { useEffect } from 'react'
import RepoItem from './RepoItem'
import useFetchRepos from '../hooks/useFetchRepos'
import useDebounce from '../hooks/useDebounce'
import { repoItem } from '../types/repoItem'

export default function RepoList() {
  const [query, setQuery] = useState('react');
  const [repos, setRepos] = useState<repoItem[] | []>([])
  const debounceQuery = useDebounce(query, 500);
  const { isLoading, items, hasError } = useFetchRepos(debounceQuery);
  
  useEffect(() => {
    setRepos((previousRepos) => [...previousRepos, ...items])
    console.log(repos)
  }, [items])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  
  return (
    <>
      <div className="w-[700px]">
        {isLoading && <h3>loading</h3>}
        <input type="text" value={query} placeholder="text something" onChange={handleChange} />
      </div>
    </>
  )
}