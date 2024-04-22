import { Button } from '../Button'

export default function Questions() {
  return (
    <div>
      <Button
        primary={true}
        label="Ask Question"
        href="/accounts/create"
        className="mb-5"
      />
      <h3 className="text-2xl font-medium">Your Questions</h3>
    </div>
  )
}
