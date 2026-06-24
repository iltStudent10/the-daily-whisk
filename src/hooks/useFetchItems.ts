import { useEffect, useState } from 'react'
import { getRecipes } from '../services/api'
import type { Recipe } from '../types'

interface UseFetchItemsResult {
  data: Recipe[] | null
  loading: boolean
  error: string | null
}

export function useFetchItems(): UseFetchItemsResult {
  const [data, setData] = useState<Recipe[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchRecipes() {
      try {
        setLoading(true)
        setError(null)
        const recipes = await getRecipes(controller.signal)
        setData(recipes)
      } catch (fetchError) {
        if (controller.signal.aborted) {
          return
        }

        const message =
          fetchError instanceof Error
            ? fetchError.message
            : 'Unexpected error while loading recipes.'
        setError(message)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchRecipes()

    return () => {
      controller.abort()
    }
  }, [])

  return { data, loading, error }
}