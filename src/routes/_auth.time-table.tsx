import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/time-table')({
  component: () => <div>Hello /time-table!</div>
})