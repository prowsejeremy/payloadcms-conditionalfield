# Conditional Field

This field component is used to compare against a field value within a relationship field. By default, Payload only returns the ID for relationship fields, in order to check against other values associated with this field, we need to do some lookups via the [Local API](https://payloadcms.com/docs/local-api/overview).

Similar functionality can be achieved by linking a virtual field to a relationship field, then querying / writing conditions based on the value of said virtual field, [as outlined here](https://payloadcms.com/docs/fields/relationship#linking-virtual-fields-with-relationships). The purpose of this solution is to provide the ability to query any attributes of a relationship field, without the need of a separate virtual field for every property to be queried. This also helps with the [current limitation](https://github.com/payloadcms/payload/issues/12817) of virtual fields within nested blocks / arrays - where that virtual field was intended for conditionally rendering.

### Primary contact / Author

- [Jeremy Prowse](https://jpd.nz)

### Status

alpha

### Config / Properties

- fieldProps: a valid field object for a Payload field. This should support all fields that support a [validate](https://payloadcms.com/docs/fields/overview#validation) object.
- conditions
  - compareField: the relationship field you wish to query,
  - compareProperty: the property on the `compareField` you wish to compare against.
  - operator: 'equals' | 'not-equals' | 'contains' | 'not-contains' | 'greater-than' | 'less-than'
  - targetValue: the value you wish to compare to the value of `compareProperty`.

### Supported Payload Versions

- 2.x.x
- Tested up to 3.48.0

### Todo

- No current support for CollapsibleField, as this throws an error when it comes to the custom component admin option required for this to work.
- Support multiple conditions.
- Extend to support relationship fields set to `hasMany`.
  - Will need to itterate over all selected options in the `compareField` and check each options `compareProperty`.
  - This will need to be performed in both the root `index.tsx` component as well as the `./clientComponent/client.tsx` files.
  - Potentially extend `utils.tsx#validateCondition` to run the loop so that it can just be written once.
- Resolve any remaining ts compile errors as tagged in files using `@investigate`
