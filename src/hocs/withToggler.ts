import { compose, withState } from 'recompose'

export interface WithTogglerProps {
  isToggled: boolean
  setToggle: (isToggled: any) => void
}

export const withToggler = withState('isToggled', 'setToggle', false)

interface TogglerProps {
  children: (args: WithTogglerProps) => JSX.Element
}

interface TogglerEnhancedProps extends TogglerProps, WithTogglerProps {}

export const Toggler = compose<TogglerEnhancedProps, TogglerProps>(withToggler)(
  ({ children, ...props }: TogglerEnhancedProps) => children(props),
)
