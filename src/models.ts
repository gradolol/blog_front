export interface User {
  id: number
  login: string
  token: string
}

export interface Post {
  content: string
  title: string
  login: string
  userId: number
  created_at: string
}
