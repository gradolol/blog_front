import * as React from 'react'
import * as ReactDOM from 'react-dom'

// Typings
export interface OutsideEventProps extends React.HTMLAttributes<HTMLElement> {
  children?: JSX.Element | JSX.Element[]
  click?: boolean
  handler?: (e?: MouseEvent | TouchEvent) => void
  mouseDown?: boolean
  touchEnd?: boolean
  touchStart?: boolean
}

// Component
export class OutsideEvent extends React.PureComponent<OutsideEventProps, {}> {
  public componentDidMount(): void {
    const { click, mouseDown, touchEnd, touchStart } = this.props
    if (click) {
      document.addEventListener('click', this.handleOutsideEvent, false)
    }
    if (mouseDown) {
      document.addEventListener('mousedown', this.handleOutsideEvent, false)
    }
    if (touchEnd) {
      document.addEventListener('touchend', this.handleOutsideEvent, false)
    }
    if (touchStart) {
      document.addEventListener('touchstart', this.handleOutsideEvent, false)
    }
  }

  public componentWillUnmount(): void {
    const { click, mouseDown, touchEnd, touchStart } = this.props
    if (click) {
      document.removeEventListener('click', this.handleOutsideEvent, false)
    }
    if (mouseDown) {
      document.removeEventListener('mousedown', this.handleOutsideEvent, false)
    }
    if (touchEnd) {
      document.removeEventListener('touchend', this.handleOutsideEvent, false)
    }
    if (touchStart) {
      document.removeEventListener('touchstart', this.handleOutsideEvent, false)
    }
  }

  public render() {
    return this.props.children
  }

  private handleOutsideEvent = (e: MouseEvent | TouchEvent): void => {
    const { handler } = this.props
    if (handler && !ReactDOM.findDOMNode(this).contains(e.target as Node)) {
      handler(e)
    }
  }
}
