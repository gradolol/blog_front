import 'react-router-config'
import { match } from 'react-router'
import { Store } from 'redux'

declare module 'react-router-config' {
  export type PageMeta = React.SFC<any> | React.ComponentClass<any>
  export type DataLoader<S, T = {}> = <T>(
    store: Store<S>,
    match: match<T>,
  ) => Promise<any>

  export interface RouteConfig {
    loadData?: DataLoader<any, any>
    meta?: PageMeta
  }
}
