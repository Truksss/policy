// Small utility helpers used across the app

/**
 * Concatenate class names conditionally.
 * Accepts strings, undefined, null, booleans, or objects with boolean values.
 */
export function cn(...inputs: Array<string | false | null | undefined | Record<string, boolean>>): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) continue
    if (typeof input === 'string') {
      classes.push(input)
      continue
    }
    if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }

  return classes.join(' ')
}

export default cn
