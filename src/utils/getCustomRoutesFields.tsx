import * as React from 'react'
import { Store } from 'redux'
import { RouteConfig, matchRoutes } from 'react-router-config'

export const getCustomRoutesFields = <S extends {}>(
  path: string,
  routes: RouteConfig[],
  store: Store<S | undefined>,
) => {
  const branch = matchRoutes(routes, path)
  return {
    loadData: Promise.all(
      branch.map(
        ({ route, match }) =>
          route.loadData ? route.loadData(store, match) : Promise.resolve(),
      ),
    ),
    metas: branch.map(({ route, match }, i) => <div key={i}>{route.meta}</div>),
  }
}
