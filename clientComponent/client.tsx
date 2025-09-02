'use client'

// Core
import React, { useEffect, useState } from 'react'
import { allFieldComponents, useFormFields } from '@payloadcms/ui'

// Utils
import { findByID } from '../actions'
import { validateCondition } from '../utils'

// Types
import type { ClientField } from 'payload'
import type { ConditionsInterface } from '../types'

export const ConditionalFieldClient = ({
  field,
  path,
  compareField,
  compareProperty,
  targetValue,
  operator,
  collection
  // Not too sure why we need to add name and required here. | @investigate
}: { field: ClientField & { name: string, required?: boolean }, path: string } & ConditionsInterface
): React.ReactElement | null => {
  const [compareItem, setcompareItem] = useState<any>(null)

  const selectedField = useFormFields(([fields]) => {
    const compareFieldPath = path.replace(field.name, compareField)
    if (
      !field ||
      !(compareFieldPath in fields)
    ) return null

    return fields[compareFieldPath]
  })

  // @ts-expect-error - `value` changes depending on where the conditional field is rendered,
  // for example on array / block fields, the actual value of the relationship field is 
  // nested one level deeper than usual.
  // This also needs to check for different types of value as well though, i.e: number, boolean, ... | @investigate
  const selectedFieldValue: string = selectedField?.value?.value || selectedField?.value || ''

  useEffect(() => {
    const fetchFieldData = async (id: string) => {
      const compareItem = await findByID({ id, collection })
      setcompareItem(compareItem)
    }

    if (selectedField && 'value' in selectedField) {
      fetchFieldData(selectedFieldValue)
    }
  }, [selectedFieldValue])

  if (
    !field ||
    !field.type ||
    !selectedField ||
    !compareItem ||
    !(compareProperty in compareItem)
  ) return null

  const FieldComponent = allFieldComponents[field.type]
  const compareValue = compareItem[compareProperty]

  const compareResult = validateCondition({
    compareValue,
    targetValue,
    operator
  })

  if ("required" in field && field.required) {
    field.required = compareResult
  }

  return !compareResult ? null : (
    <FieldComponent
      field={{
        ...field
      }}
    />
  )
}