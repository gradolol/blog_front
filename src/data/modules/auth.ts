import { Reducer } from 'redux'
import { get, post, withToken } from 'utils/api'
import { User } from 'models'

const RECIEVE_USER = 'RECIEVE_USER'
const LOGOUT = 'LOGOUT'

interface OutputStatus {
  output: {
    status: number
  }
}

export interface AuthState {
  login?: string
}

interface LoginArgs {
  login: string
  password: string
}

interface LoginResponse {
  currentUser: User
}

export const login = (args: LoginArgs) =>
  post<LoginResponse>('/authenticate', { body: JSON.stringify(args) })

interface RegisterResponse extends OutputStatus {
  user: User
}

export const register = (args: LoginArgs) =>
  post<RegisterResponse>('/users', { body: JSON.stringify(args) })

interface VerifyTokenResponse {
  user?: User
}

export const verifyToken = withToken<VerifyTokenResponse>(get, '/verify-token')

export const recieveUser = (user: User) => ({
  payload: user,
  type: RECIEVE_USER,
})

export const logout = () => ({ type: LOGOUT })

export const authReducer: Reducer<AuthState> = (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_USER:
      return {
        ...state,
        ...action.payload,
      }

    case LOGOUT:
      return {}

    default:
      return state
  }
}
