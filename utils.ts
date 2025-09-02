import { ConditionsInterface } from './types'

export const validateCondition = ({
  compareValue,
  targetValue,
  operator,
}: {
  compareValue: string | number | boolean
} & Pick<ConditionsInterface, 'targetValue' | 'operator'>): boolean => {
  // If targetValue is an array, check if compareValue matches any of the values
  if (Array.isArray(targetValue)) {
    return targetValue.some((value) =>
      validateCondition({ compareValue, targetValue: value, operator }),
    )
  }

  switch (operator) {
    case 'equals':
      return Boolean(compareValue === targetValue)
    case 'not-equals':
      return Boolean(compareValue !== targetValue)
    case 'contains':
      return Boolean(
        typeof compareValue === 'string' &&
          typeof targetValue === 'string' &&
          compareValue.includes(targetValue),
      )
    case 'not-contains':
      return Boolean(
        typeof compareValue === 'string' &&
          typeof targetValue === 'string' &&
          !compareValue.includes(targetValue),
      )
    case 'greater-than':
      return Boolean(compareValue > targetValue)
    case 'less-than':
      return Boolean(compareValue < targetValue)
    default:
      return false
  }
}

export const validateValue = (value: any): boolean => {
  switch (typeof value) {
    case 'string':
      return value.length > 0
    case 'number':
      return !isNaN(value)
    case 'object':
      return value !== null && Object.keys(value).length > 0
    case 'boolean':
      return value === true
    default:
      return false
  }
}
