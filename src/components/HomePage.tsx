import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Post } from 'components/Post'
// import { Link } from 'react-router-dom'
import { State } from 'data/reducer'
// import * as links from 'utils/links'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const HomePage = connect((state: State) => ({
  posts: state.posts,
}))(({ posts }) => {
  return (
    <Content>
      {posts && posts.map((post, i) => <Post key={i} {...post} />)}
    </Content>
  )
})
