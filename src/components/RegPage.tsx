import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { register, recieveUser } from 'data/modules/auth'
import { recieveUsers } from 'data/modules/user'
import { State } from 'data/reducer'
import * as links from 'utils/links'
const serialize = require('form-serialize')
const { setCookie } = require('redux-cookie')

const Input = styled.input``

const Button = styled.button``

interface RegPageProps {
  dispatch: Dispatch<State>
  login?: string
}

interface RegPageState {}

export const RegPage = connect(
  (state: State) => ({ login: state.auth.login }),
  dispatch => ({ dispatch }),
)(class extends React.PureComponent<RegPageProps, RegPageState> {
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { dispatch } = this.props
    try {
      const res = await register(
        serialize(e.currentTarget, {
          hash: true,
        }),
      )
      if (res.output.status === 1) {
        dispatch(recieveUser(res.user))
        dispatch(recieveUsers([res.user]))
        dispatch(setCookie('token', res.user.token))
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
        <Input name="login" />
        <Input name="password" type="password" />
        <Button type="submit">Зарегаться</Button>
      </form>
    )
  }
} as any)
