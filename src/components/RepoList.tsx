import { useState, ChangeEvent, useRef, useCallback } from 'react';
import RepoItem from './RepoItem';
import { isMobile } from 'react-device-detect';
import { FixedSizeList as List } from 'react-window';
import useFetchRepos from '../hooks/useFetchRepos';
import useDebounce from '../hooks/useDebounce';

const INIT_QUERY = 'tailwind';

export default function RepoList() {
  const observer = useRef<IntersectionObserver>();
  const [query, setQuery] = useState(INIT_QUERY);
  const [lastRepoId, setLastRepoId] = useState<string | undefined>('');
  const [isNeedReload, setIsNeedReload] = useState(false);
  const debounceQuery = useDebounce(query, 200);
  const { isLoading, repos, hasMoreRepos, isLoadFail } = useFetchRepos(debounceQuery, lastRepoId, isNeedReload);
  const repoItems = repos.map((item) => ({
    id: item.id,
    fullName: item.full_name,
    description: item.description,
    htmlUrl: item.html_url,
    starCount: item.stargazers_count,
    language: item.language
  }))

  const lastRepoRef = useCallback(node => {
    if (isLoading) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (hasMoreRepos) {
          setLastRepoId(node.dataset.id);
          setIsNeedReload(false);
        }
        if (isLoadFail) {
          setIsNeedReload(true);
        }
      } else {
        setIsNeedReload(false);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMoreRepos, isLoading, isLoadFail]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  
  return (
    <>
      <div className="w-4/6 h-full flex flex-col items-center" data-testid="list">
        <input className="border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200" type="text" value={query} placeholder="Search" onChange={handleChange} />
        {
          <List
            height={window.innerHeight - 60}
            width={(isMobile) ? window.innerWidth : 600}
            itemCount={repos.length}
            itemSize={246}
            itemData={repos}
          >
            {
              ({ index, style }) => {
                if (index === repoItems.length - 1) {
                  return <div style={style} ref={lastRepoRef} data-id={repoItems[index].id}>
                    <RepoItem key={index} {...repoItems[index]} />
                    {isLoading && <div className="flex justify-center items-center space-x-1 py-2 text-sm text-gray-700">
                      <svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                        <path clipRule='evenodd'
                          d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                          fill='currentColor' fillRule='evenodd' />
                      </svg>
                    <div>Loading ...</div>
                  </div>}
                  </div>
                } else {
                  return <div style={style}><RepoItem key={index} {...repoItems[index]} /></div>
                }
              }
            }
          </List>
        }
      </div>
    </>
  );
}
