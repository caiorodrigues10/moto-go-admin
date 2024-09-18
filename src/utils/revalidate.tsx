'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

function useRevalidatePath(path: string) {
  const { refresh: refreshRouter } = useRouter();

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`/api/revalidate/${path}`);
      if (!res.ok) {
        console.error('Failed to revalidate path:', res.statusText);
        return;
      }
      console.log('Revalidation successful');
      refreshRouter();
    } catch (error) {
      console.error('Error during revalidation:', error);
    }
  }, [path, refreshRouter]);

  return { refresh };
}

export { useRevalidatePath };
