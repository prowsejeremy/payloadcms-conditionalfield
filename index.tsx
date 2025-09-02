// Utils
import { findByID } from "./actions"
import { validateCondition, validateValue } from "./utils"

// Types
import type { CollapsibleField, Field as PayloadField } from "payload"
import type { ConditionsInterface } from "./types"
type Field = Exclude<PayloadField, CollapsibleField> // Exclude CollapsibleField as it is not supported yet

const ConditionalField = ({
  fieldProps,
  conditions,
}: {
  fieldProps: Field
  conditions: ConditionsInterface
}): Field => {

  const { compareField, compareProperty, targetValue, operator, collection } = conditions

  // Check if the field supports validation
  // @todo: add a check for if the field actually supports validation | @investigate
  let validateFunc = {}
  if (true) {
    validateFunc = {
      validate: async (value: any, { siblingData }: { siblingData: any }) => {

        const id = siblingData[compareField]

        // If the field is not required, or if there is no id, skip validation
        if (!id || !('required' in fieldProps) || !fieldProps?.required) return true

        const compareItem: any = await findByID({ id, collection })
        const compareValue = compareItem[compareProperty]

        const compareResult = validateCondition({
          compareValue,
          targetValue,
          operator
        })

        if (
          (!compareResult) ||
          (compareResult && validateValue(value))
        ) {
          return true
        }

        return 'This field is required.'
      }
    }
  }

  // Define the admin properties for the field
  const adminProps = {
    admin: {
      components: {
        Field: {
          path: '@/src/fields/conditionalField/clientComponent/client#ConditionalFieldClient',
          clientProps: {
            compareField,
            compareProperty,
            targetValue,
            operator,
            collection
          },
        },
      },
    }
  }

  if ('admin' in fieldProps) {
    adminProps.admin = {
      ...fieldProps.admin,
      ...adminProps.admin,
    }
  }

  return {
    ...fieldProps,
    ...validateFunc,
    ...adminProps
  }
}

export default ConditionalField