export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-gray-900">Event Details</h1>
      <p className="text-gray-500 text-sm mt-1">ID: {id}</p>
    </div>
  )
}
