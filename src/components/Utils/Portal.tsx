import * as React from 'react'
import * as ReactDOM from 'react-dom'
import isBrowser from 'is-in-browser'

// Typings
interface PortalProps {
  children?: JSX.Element | JSX.Element[]
}

interface PortalState {
  el?: HTMLDivElement
}

let portalsRoot: HTMLElement | undefined
if (isBrowser) {
  const el = document.getElementById('root-portals')
  if (el) portalsRoot = el
}

// Component
export class Portal extends React.PureComponent<PortalProps, PortalState> {
  public state: PortalState = {}

  componentDidMount() {
    this.setState({ el: document.createElement('div') }, () => {
      if (portalsRoot && this.state.el) portalsRoot.appendChild(this.state.el)
    })
  }

  componentWillUnmount() {
    if (portalsRoot && this.state.el) {
      portalsRoot.removeChild(this.state.el)
    }
  }

  render() {
    const { children } = this.props
    const { el } = this.state
    return el ? ReactDOM.createPortal(children, el) : null
  }
}
