import * as React from 'react'
import styled from 'styled-components'
import { Post as PostModel } from 'models'

const PostWrap = styled.div`
  width: 25%;
  padding: 20px;
`
const PostTitle = styled.h1``
const Text = styled.p`
  color: red;
`
const ArticleDate = styled.span``
const User = styled.span``

interface PostProps extends PostModel {
  isLoginHidden?: boolean
}

export const Post = (p: PostProps) => {
  return (
    <PostWrap>
      <PostTitle>{p.title}</PostTitle>
      <Text>{p.content}</Text>
      <User>Автор {p.login}</User>
      <br />
      <ArticleDate>Создано в {p.created_at}</ArticleDate>
    </PostWrap>
  )
}
