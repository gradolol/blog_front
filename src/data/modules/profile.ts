import { Reducer } from 'redux'
import { get } from 'utils/api'
import { Post } from 'models'

const RECIEVE_POSTS = 'RECIEVE_POSTS'

export interface PostsState {
  posts?: Post[]
}

interface GetPostsResponse {
  posts: Post[][]
}

export const loadUser = (login: string) =>
  get<GetPostsResponse>(`/users/${login}`)

export const recievePosts = (posts: Post[]) => ({
  payload: posts,
  type: RECIEVE_POSTS,
})

export const postsReducer: Reducer<PostsState> = (state = {}, action) => {
  // console.log(action)
  switch (action.type) {
    case RECIEVE_POSTS:
      return { ...state, posts: action.payload }

    default:
      return state
  }
}
