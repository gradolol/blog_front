import { RouteConfig, DataLoader } from 'react-router-config'
import { AuthPage } from 'components/AuthPage'
import { HomePage } from 'components/HomePage'
import { RegPage } from 'components/RegPage'
import { CreatePostPage } from 'components/CreatePostPage'
import { ProfilePage } from 'components/ProfilePage'
import { AppContainer } from 'components/Layout/AppContainer'
import * as links from 'utils/links'
import { recieveUser, verifyToken } from 'data/modules/auth'
import { loadPosts, recievePosts } from 'data/modules/posts'
import { loadUsers, recieveUsers } from 'data/modules/user'
import { State } from 'data/reducer'
const { getCookie } = require('redux-cookie')

const checkAuth: DataLoader<State, any> = state =>
  new Promise(async resolve => {
    if (!state.getState().auth.login) {
      const token = state.dispatch(getCookie('token'))
      if (token) {
        const res = await verifyToken(state.dispatch)
        if (res.user) state.dispatch(recieveUser(res.user))
      }
    }
    resolve()
  })

const loadPostsData: DataLoader<State, any> = store =>
  new Promise(async resolve => {
    if (store.getState().posts.length === 0) {
      const posts = await loadPosts()
      store.dispatch(recievePosts(posts.posts[0]))
    }
    resolve()
  })

const loadUsersData: DataLoader<State, any> = store =>
  new Promise(async resolve => {
    if (store.getState().users.length === 0) {
      const users = await loadUsers()
      store.dispatch(recieveUsers(users.users[0]))
    }
    resolve()
  })

const loadGeneralData: DataLoader<State, any> = (store, match) =>
  Promise.all([
    checkAuth(store, match),
    loadPostsData(store, match),
    loadUsersData(store, match),
  ])

export const routes: RouteConfig[] = [
  {
    component: AppContainer,
    loadData: loadGeneralData,
    routes: [
      {
        component: HomePage,
        exact: true,
        path: links.home,
      },
      { component: RegPage, exact: true, path: links.reg },
      { component: AuthPage, exact: true, path: links.auth },
      { component: CreatePostPage, exact: true, path: links.post },
      {
        component: ProfilePage,
        exact: true,
        path: links.profile(':login'),
      },
    ],
  },
]
