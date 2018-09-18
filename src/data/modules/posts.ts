import { Reducer } from 'redux'
import { get, post, withToken } from 'utils/api'
import { Post } from 'models'

const RECIEVE_POSTS = 'RECIEVE_POSTS'

export type PostsState = Post[]

interface GetPostsResponse {
  posts: Post[][]
}

export const loadPosts = () => get<GetPostsResponse>('/getallposts')

export const recievePosts = (posts: Post[]) => ({
  payload: posts,
  type: RECIEVE_POSTS,
})

export const postsReducer: Reducer<PostsState> = (state = [], action) => {
  switch (action.type) {
    case RECIEVE_POSTS:
      return [...action.payload, ...state]

    default:
      return state
  }
}

interface PostParams extends Post {}

interface CreatePostResponse {
  post: Post
}

export const createPost = (args: PostParams) =>
  withToken<CreatePostResponse>(post, '/posts', { body: JSON.stringify(args) })
