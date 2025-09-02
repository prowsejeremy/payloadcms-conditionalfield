'use server'

// Core
import { getPayload } from 'payload'
import payloadConfig from '@/src/payload.config'

// Types
import type { CollectionSlug } from 'payload'

export const findByID = async ({ id, collection }: { id: string; collection: CollectionSlug }) => {
  if (!id) {
    return null
  }

  const payload = await getPayload({ config: payloadConfig })

  const compareItem = await payload
    .findByID({
      collection,
      id,
      depth: 2,
    })
    .then((result) => {
      return result
    })
    .catch((error) => {
      console.error('Error fetching item by ID:', error)
      return null
    })

  return compareItem
}
