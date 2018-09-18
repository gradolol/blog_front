import * as React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { State } from 'data/reducer'
import * as links from 'utils/links'
import { logout } from 'data/modules/auth'
const { removeCookie } = require('redux-cookie')

const HeaderWrap = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`

const headerLinkStyle = css`
  display: block;
  padding: 20px;
  color: #333;
  font-weight: bold;
  cursor: pointer;
`

const HeaderButton = styled.div`
  ${headerLinkStyle};
`

const HeaderLink = styled(Link)`
  ${headerLinkStyle};
`

export const Header = connect(
  (state: State) => ({ login: state.auth.login }),
  dispatch => ({ dispatch }),
)(({ dispatch, login }) => {
  return (
    <HeaderWrap>
      <HeaderLink to={links.home}>Главная</HeaderLink>
      <HeaderLink to="">Поиск</HeaderLink>
      {!login && (
        <>
          <HeaderLink to={links.auth}>Вход</HeaderLink>
          <HeaderLink to={links.reg}>Регистрация</HeaderLink>
        </>
      )}
      {login && (
        <>
          <HeaderLink to={links.profile(login)}>{login}</HeaderLink>
          <HeaderButton
            onClick={() => {
              dispatch(removeCookie('token'))
              dispatch(logout())
            }}
          >
            Выйти
          </HeaderButton>
        </>
      )}
    </HeaderWrap>
  )
})
