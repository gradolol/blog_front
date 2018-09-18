import { Reducer, combineReducers } from 'redux'
import { authReducer, AuthState } from 'data/modules/auth'
import { postsReducer, PostsState } from 'data/modules/posts'
import { usersReducer, UsersState } from 'data/modules/user'

export interface State {
  auth: AuthState
  posts: PostsState
  users: UsersState
}

export const reducer: Reducer<State> = combineReducers<State>({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
})
