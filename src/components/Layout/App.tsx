import styled, { injectGlobal } from 'styled-components'
import { colors } from 'utils/styles'
import {
  defaultBodyLockClass,
  defaultHtmlLockClass,
} from '@gnarlycode/react-scroll-state'

// Styles
injectGlobal`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, img, ins, kbd, q, s, samp,
  small, strike, sub, sup, tt, var, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  th,
  td {
    text-align: left;
  }

  textarea {
    resize: none;
  }

  address {
    font-style: normal;
  }

  input, textarea, button, select {
    outline: none;
    font: inherit;
    box-sizing: border-box;
    -webkit-font-smoothing: inherit;
    -webkit-appearance: none;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  html,
  body {
    min-height: 100%;
    display: flex;
    width: 100%;
    background-color: ${colors.bg};
    color: ${colors.text};
    overflow-x: hidden;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
  }

  html {
    overflow-y: scroll;
    box-sizing: border-box;
  }

  a {
    color: ${colors.brand};
    text-decoration: none;
  }

  #root {
    display: flex;
    width: 100%;
    min-height: 100%;
  }

  * {
    min-width: 0;
    min-height: 0;
  }

  html.${defaultHtmlLockClass} {
    overflow-y: scroll;
  }

  body.${defaultBodyLockClass} {
    overflow: hidden;
    position: fixed;
  }
`

export const App = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.bg};
`
