import React, { useState, ChangeEvent, useRef } from 'react';
import { useEffect } from 'react';
import RepoItem from './RepoItem';
import useFetchRepos from '../hooks/useFetchRepos';
import useDebounce from '../hooks/useDebounce';
import useOnScreen from '../hooks/useOnScreen';

const INIT_QUERY = 'tailwind';

export default function RepoList() {
  const sentinelRef = useRef<HTMLElement>(null);
  const lastRepoRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState(INIT_QUERY);
  const [lastRepoId, setLastRepoId] = useState<string | undefined>('');
  const isElementOnScreen = useOnScreen(sentinelRef);
  const debounceQuery = useDebounce(query, 200);
  const { isLoading, repos } = useFetchRepos(debounceQuery, lastRepoId);
  const repoItems = repos.map((item) => ({
    id: item.id,
    fullName: item.full_name,
    description: item.description,
    htmlUrl: item.html_url,
    starCount: item.stargazers_count,
    language: item.language
  }))

  useEffect(() => {
    if (isElementOnScreen && lastRepoRef.current) setLastRepoId(lastRepoRef.current.dataset.id);
  }, [isElementOnScreen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  
  return (
    <>
      <div className="w-4/6 flex flex-col items-center" data-testid="list">
        <input type="text" value={query} placeholder="text something" onChange={handleChange} />
        {
          repoItems.map((repo, index) => (index === repoItems.length - 1) ? <RepoItem key={index} ref={lastRepoRef} data-id={repoItems[index].id} {...repo} /> : <RepoItem key={index} {...repo} />)
        }
        <div ref={sentinelRef as React.RefObject<HTMLDivElement>} className="w-full h-[1px]" />
        {isLoading && <h3>loading</h3>}
      </div>
    </>
  );
}
