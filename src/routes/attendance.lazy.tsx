import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/attendance')({
  component: () => <div>Hello /attendance!</div>
})