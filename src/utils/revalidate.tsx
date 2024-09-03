'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

function useRevalidatePath(path: string) {
  const { refresh: refreshRouter } = useRouter()

  const refresh = useCallback(async () => {
    await fetch(`/api/revalidate?path=${path}`, {
      method: 'GET',
    })
    refreshRouter()
  }, [path, refreshRouter])

  return { refresh }
}

export { useRevalidatePath }
