import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { login as loginRequest, recieveUser } from 'data/modules/auth'
import { State } from 'data/reducer'
import * as links from 'utils/links'
const serialize = require('form-serialize')
const { setCookie } = require('redux-cookie')

const Input = styled.input``

const Button = styled.button``

interface AuthPageProps {
  dispatch: Dispatch<State>
  login?: string
}

interface AuthPageState {}

export const AuthPage = connect(
  (state: State) => ({ login: state.auth.login }),
  dispatch => ({ dispatch }),
)(class extends React.PureComponent<AuthPageProps, AuthPageState> {
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { dispatch } = this.props
    try {
      const res = await loginRequest(
        serialize(e.currentTarget, {
          hash: true,
        }),
      )
      if (res.currentUser) {
        dispatch(recieveUser(res.currentUser))
        dispatch(setCookie('token', res.currentUser.token))
      }
    } catch (err) {
      // console.error(err)
    }
  }

  render() {
    const { login } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        {login && <Redirect to={links.profile(login)} />}
        <Input name="login" placeholder="login" />
        <Input name="password" type="password" placeholder="password" />
        <Button type="submit">Войти</Button>
      </form>
    )
  }
} as any)
