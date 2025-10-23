import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/admin/_pages/integration/api-keys/~components/create-api-key-button',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_app/admin/_pages/integration/api-keys/~components/create-api-key-button"!
    </div>
  )
}
