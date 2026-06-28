export default async function ApplicantsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-gray-900">Applicants</h1>
      <p className="text-gray-500 text-sm mt-1">Event ID: {id}</p>
    </div>
  )
}
