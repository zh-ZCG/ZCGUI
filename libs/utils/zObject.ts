import { get, set } from '../../libs/lodash'
import type { Entries } from 'type-fest'
import type { Arrayable } from '../../libs/zType'

export { hasOwn } from '@vue/shared'
export const keysOf = <T extends object>(arr: T) =>
  Object.keys(arr) as Array<keyof T>
export const entriesOf = <T extends object>(arr: T) =>
  Object.entries(arr) as Entries<T>

export const getProp = <T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: any
): { value: T } => {
  return {
    get value() {
      return get(obj, path, defaultValue)
    },
    set value(val: any) {
      set(obj, path, val)
    },
  }
}
