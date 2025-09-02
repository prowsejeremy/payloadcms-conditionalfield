import type { CollectionSlug } from 'payload'

export interface ConditionsInterface {
  compareField: string
  compareProperty: string
  targetValue: string | number | boolean | (string | number | boolean)[]
  operator: 'equals' | 'not-equals' | 'contains' | 'not-contains' | 'greater-than' | 'less-than'
  collection: CollectionSlug
}
