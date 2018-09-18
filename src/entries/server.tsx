import * as React from 'react'
const Cookies = require('cookies')
import Helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import { routes } from 'routes'
import { reducer } from 'data/reducer'
import { configureStore } from 'data/store'
import { Html } from 'components/Layout/Html'
import { getCustomRoutesFields } from 'utils/getCustomRoutesFields'
import * as config from 'config'

const toArr = (x: string | string[]): string[] => (Array.isArray(x) ? x : [x])

// Server Middleware
// tslint:disable-next-line:no-default-export
export default function(allstats: any) {
  const stats = allstats.clientStats ? allstats.clientStats : allstats

  return async (req: any, res: any, next: any) => {
    const location = req.url
    const cookies = new Cookies(req, res)
    const store = configureStore({ cookies, reducer })

    // Prepare Assets
    let assets = [
      ...toArr(stats.assetsByChunkName.vendor as string),
      ...toArr(stats.assetsByChunkName.main as string),
    ]
    assets = assets.map(asset => `/${asset}`)
    const scripts = assets.filter(asset => /\.js$/.test(asset))

    // Load Data
    try {
      const { loadData, metas } = getCustomRoutesFields(location, routes, store)

      await loadData

      renderToString(
        <Provider store={store} key="provider">
          <>{metas}</>
        </Provider>,
      )

      const context: { url?: string } = {}
      const sheet = new ServerStyleSheet()
      const markup = renderToString(
        sheet.collectStyles(
          <Provider store={store} key="provider">
            <StaticRouter location={req.url} context={context}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>,
        ),
      )

      // Render Html Block
      const html = renderToString(
        <Html
          helmet={Helmet.renderStatic()}
          initialState={store.getState()}
          markup={markup}
          scripts={scripts}
          styleEl={sheet.getStyleElement()}
        />,
      )

      // Return Markup
      res.write(`<!doctype html>${html}`)

      res.end()
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err)

      if (config.isDev) {
        next(err)
      } else {
        res.status(500).send(`Internal Server Error`)
      }

      res.end()
    }
  }
}
