import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ui')({
  component: () => <div>Hello /ui!</div>
})