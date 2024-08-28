import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/time-table')({
  component: () => <div>Hello /time-table!</div>
})