'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function DropActions({ dropId }: { dropId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this drop? Products will be unassigned from it.')
    if (!confirmed) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/drops/${dropId}`, {
        method: 'DELETE',
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete drop')
      }
      toast.success('Drop deleted')
      router.refresh()
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete drop'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Link href={`/admin/drops/${dropId}`} className="text-blue-600 hover:underline">
        Edit
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="text-red-600 hover:underline disabled:opacity-50"
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}
