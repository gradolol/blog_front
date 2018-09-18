import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { recievePosts, createPost } from 'data/modules/posts'
import { State } from 'data/reducer'
import * as links from 'utils/links'
const serialize = require('form-serialize')

const Input = styled.input``
const Textarea = styled.textarea``

const Button = styled.button``

interface CreatePostPageProps {
  dispatch: Dispatch<State>
  login?: string
}

interface CreatePostPageState {
  isDone: boolean
}

export const CreatePostPage = connect(
  (state: State) => ({ login: state.auth.login }),
  dispatch => ({ dispatch }),
)(class extends React.PureComponent<CreatePostPageProps, CreatePostPageState> {
  constructor(props: CreatePostPageProps) {
    super(props)
    this.state = {
      isDone: false,
    }
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { dispatch, login } = this.props
    try {
      const res = await createPost(
        serialize(e.currentTarget, {
          hash: true,
        }),
      )(dispatch)
      if (res.post) {
        dispatch(recievePosts([{ ...res.post, login: String(login) }]))
        this.setState({ isDone: true })
      }
    } catch (err) {
      // console.error(err)
    }
  }

  render() {
    const { login } = this.props
    const { isDone } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        {!login && <Redirect to={links.home} />}
        {login && isDone && <Redirect to={links.profile(login)} />}
        <Input name="title" />
        <br />
        <Textarea name="content" />
        <br />
        <Button type="submit">Разместить</Button>
      </form>
    )
  }
} as any)
