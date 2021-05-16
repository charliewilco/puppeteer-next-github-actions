export function classNames(...arguments_: unknown[]): string {
  const result = new Set();

  for (const item of arguments_) {
    if (typeof item === "string") {
      if (item.length > 0) {
        result.add(item);
      }
    } else if (typeof item === "object") {
      if (item !== null) {
        for (const [key, value] of Object.entries(item)) {
          if (value) {
            result.add(key);
          }
        }
      }
    }
  }

  return [...result].join(" ");
}
