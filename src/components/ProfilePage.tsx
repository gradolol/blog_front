import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { State } from 'data/reducer'
import { Post } from 'components/Post'
import { Post as PostModel } from 'models'
import * as links from 'utils/links'
import { Link } from 'react-router-dom'

const Content = styled.div``
const Profile = styled.span`
  float: left;
  font-size: 45px;
`
const Button = styled(Link)``
export interface ProfileParams {
  params: { login?: string }
}

// interface ProfilePageProps extends ProfileParams {
//   login?: string
//   posts?: PostModel
// }

export const ProfilePage = connect((state: State, ownProps: any) => {
  const { users, posts } = state
  const reqLogin = ownProps.match.params.login
  const user = users && users.find(u => u.login === reqLogin)
  return {
    isLoading: users.length === 0,
    login: user && user.login,
    posts: user && posts && posts.filter(post => post.login === reqLogin),
  }
})(({ isLoading, login, posts }) => {
  return (
    <>
      {!isLoading && !login && <div>404</div>}
      {login && (
        <>
          <Profile>{login}</Profile>
          <Button to={links.post}>Создать пост</Button>
          <Content>
            {posts &&
              posts.map((post: PostModel, i: number) => (
                <Post isLoginHidden key={i} {...post} />
              ))}
          </Content>
        </>
      )}
    </>
  )
})
