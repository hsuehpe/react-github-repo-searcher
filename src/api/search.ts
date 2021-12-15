import axios, { AxiosPromise } from 'axios';
import { SEARCH_REPO_URL } from '../constants/github-api';

export function getRepos(query: string, page: number = 1): AxiosPromise<any> {
  return axios.get(SEARCH_REPO_URL, {
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
    params: {
      q: query,
      sort: 'stars',
      per_page: 10,
      page,
    },
  });
}
