import { nanoid } from 'nanoid'
import type { IWebsite } from './types'

export const webList: IWebsite[] = [
  {
    id: nanoid(),
    name: '煎蛋',
    url: 'http://jandan.net/top',
    icon: 'http://cdn.jandan.net/static/img/favicon.ico',
    default: true,
  },
  {
    id: nanoid(),
    name: 'github',
    url: 'https://github.com/trending',
    icon: 'https://github.githubassets.com/pinned-octocat.svg',
    default: true,
  },
  {
    id: nanoid(),
    name: '博客',
    url: 'https://webb1an.github.io/',
    icon: 'https://webb1an.github.io/favicon.ico',
    default: true,
  },
]
