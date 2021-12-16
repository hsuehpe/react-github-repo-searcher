import React, { useState, ChangeEvent, useRef } from 'react';
import { useEffect } from 'react';
import RepoItem from './RepoItem';
import useFetchRepos from '../hooks/useFetchRepos';
import useDebounce from '../hooks/useDebounce';
import useOnScreen from '../hooks/useOnScreen';
import { repoItem } from '../types/repoItem';

const INIT_QUERY = 'tailwind'

export default function RepoList() {
  const sentinelRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState(INIT_QUERY);
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState<repoItem[] | []>([]);
  const isElementOnScreen = useOnScreen(sentinelRef);
  const debounceQuery = useDebounce(query, 500);
  const { isLoading, items, isQueryChanged } = useFetchRepos(debounceQuery, page);

  useEffect(() => {
    if (page <= 1 || isQueryChanged) { 
      setRepos([...items]);
      setPage(1);
    }
    else setRepos((previousRepos) => [...previousRepos, ...items]);
  }, [items, isQueryChanged, page]);



  useEffect(() => {
    if (repos.length === 0) return;
    if (isElementOnScreen) setPage((previousPage) => previousPage + 1);
  }, [isElementOnScreen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  
  return (
    <>
      <div className="w-[700px]">
        <input type="text" value={query} placeholder="text something" onChange={handleChange} />
        {
          repos.map((repo, index) => <RepoItem key={index} {...repo}  />)
        }
        <div ref={sentinelRef as React.RefObject<HTMLDivElement>} className="w-full h-[1px]" />
        {isElementOnScreen && <h3>on screen!</h3>}
        {isLoading && <h3>loading</h3>}
      </div>
    </>
  );
}