import { Button } from '../Button'

export default function Articles() {
  return (
    <div>
      <Button
        primary={true}
        label="Create Article"
        href="/accounts/create"
        className="mb-5"
      />
      <h3 className="text-2xl font-medium">Your Articles</h3>
    </div>
  )
}
