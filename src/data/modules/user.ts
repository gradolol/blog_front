import { Reducer } from 'redux'
import { get } from 'utils/api'
import { User } from 'models'

const RECIEVE_USERS = 'RECIEVE_USERS'

export type UsersState = User[]

interface GetUsersResponse {
  users: User[][]
}

export const loadUsers = () => get<GetUsersResponse>('/getallusers')

export const recieveUsers = (Users: User[]) => ({
  payload: Users,
  type: RECIEVE_USERS,
})

export const usersReducer: Reducer<UsersState> = (state = [], action) => {
  switch (action.type) {
    case RECIEVE_USERS:
      return [...action.payload, ...state]

    default:
      return state
  }
}
