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
  const debounceQuery = useDebounce(query, 200);
  const { isLoading, repos, hasMoreRepos } = useFetchRepos(debounceQuery, lastRepoId);
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
      if (entries[0].isIntersecting && hasMoreRepos) {
        setLastRepoId(node.dataset.id);
      }
    })
    if (node) observer.current.observe(node)
  }, [hasMoreRepos, isLoading]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  
  return (
    <>
      <div className="w-4/6 h-full flex flex-col items-center" data-testid="list">
        <input type="text" value={query} placeholder="text something" onChange={handleChange} />
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
                    {isLoading && <h3>loading</h3>}
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
