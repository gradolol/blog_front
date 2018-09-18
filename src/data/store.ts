import {
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Reducer,
} from 'redux'
import * as config from 'config'
const { createCookieMiddleware } = require('redux-cookie')

interface ConfigureStoreArgs<S> {
  init?: S
  reducer: Reducer<S>
  cookies: any
}

export const configureStore = <S>({
  init,
  reducer,
  cookies,
}: ConfigureStoreArgs<S>) => {
  // Middlewares
  const middlewares: Middleware[] = [createCookieMiddleware(cookies)]

  // Dev Middlewares
  if (config.isDev && config.browser) {
    const { createLogger } = require('redux-logger')
    const logger = createLogger()
    middlewares.push(logger)
  }

  // Redux Dev Tools
  const composeEnhancers =
    (config.isDev &&
      typeof window === 'object' &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose

  // Create and return Store
  return createStore(
    reducer,
    init,
    composeEnhancers(applyMiddleware(...middlewares)),
  )
}
