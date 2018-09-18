import * as React from 'react'
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config'
import { App } from 'components/Layout/App'
import { Header } from 'components/Layout/Header'
import {
  ScrollRestorer,
  ScrollStateProvider,
} from '@gnarlycode/react-scroll-state'

// Typings
interface AppContainerProps extends RouteConfigComponentProps<{}> {}

// Component
export const AppContainer = ({ route }: AppContainerProps) => {
  return (
    <ScrollStateProvider>
      <App>
        <ScrollRestorer />
        <Header />
        {route && renderRoutes(route.routes)}
      </App>
    </ScrollStateProvider>
  )
}
