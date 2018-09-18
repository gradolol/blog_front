import { createBrowserHistory, Action, Location } from 'history'
import * as React from 'react'
const Cookies = require('js-cookie')
import { hydrate, render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { routes } from 'routes'
import { reducer } from 'data/reducer'
import { configureStore } from 'data/store'
import { loadDeferredStyles } from 'utils/loadDeferredStyles'
import { getCustomRoutesFields } from 'utils/getCustomRoutesFields'

// Data Init
const store = configureStore({
  cookies: Cookies,
  init: (window as any).__INITIAL_STATE__,
  reducer,
})
const rootEl = document.getElementById('root')
const helmetPlaceholder = document.getElementById('helmet-placeholder')

const actualizeData = async (l: Location, action?: Action) => {
  const { loadData, metas } = getCustomRoutesFields(l.pathname, routes, store)
  render(<div>{metas}</div>, helmetPlaceholder)
  await loadData
}

const history = createBrowserHistory()
history.listen(actualizeData)
actualizeData(history.location)

hydrate(
  <Provider store={store}>
    <Router history={history}>{renderRoutes(routes)}</Router>
  </Provider>,
  rootEl,
)

loadDeferredStyles()
