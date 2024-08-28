import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/notifications')({
  component: () => <div>Hello /notifications!</div>
})