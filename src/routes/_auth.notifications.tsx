import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/notifications')({
  component: () => <div>Hello /notifications!</div>
})