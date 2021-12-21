# Github Repositories Searcher

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
1. Create a `.env.local` file in the root directory of your project.
2. Create GitHub API Access Token (https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
```
REACT_APP_GITHUB_TOKEN=put your GitHub API Access Token here
```
```
$ git clone https://github.com/hsuehpe/react-github-repo-searcher.git
$ yarn
$ yarn start
```

## Features
* Github API for searching repositories (https://docs.github.com/en/rest/reference/search#search-repositories)
* Infinite Scroll
* Virtualized List

## How It Works

### Debounce text input
Because input `change` event will trigger API calls too often, use `debounce` function that makes sure only triggered API call once per user input.

### Implementing Infinite Scroll
To do an infinite scroll, we need to increment page number count when last repository item of the list is visible to user. This will be done by `IntersectionObserver` API.

`IntersectionObserver` will observe if the last element is visible or not, if it is, we will increment the page number by 1 and load more data.

### Virtualized List
Use [react-window](https://github.com/bvaughn/react-window) component for rendering large lists efficiently.
