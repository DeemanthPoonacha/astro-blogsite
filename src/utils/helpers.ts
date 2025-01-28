export function updateQueryString(
  existingQueryString: string,
  field: string,
  value: string,
  replace: boolean = false,
) {
  // Parse the existing query string into an object
  const params = new URLSearchParams(existingQueryString);

  // Check if the field already exists in the query string
  if (params.has(field)) {
    if (replace) {
      params.set(field, value);
      return params.toString();
    }
    // Get the existing values of the field
    const existing = params.get(field);
    const existingValues = existing?.split(",") || [];

    // Remove the value if it already exists
    const updatedValues = existingValues.includes(value)
      ? existingValues.filter((v) => v !== value)
      : [...existingValues, value];

    // Set the field with the updated values
    if (updatedValues.length > 0) {
      params.set(field, updatedValues.join(","));
    } else {
      params.delete(field);
    }
  }
  // If the field doesn't exist, simply append the new value
  else params.append(field, value);

  // Convert the updated parameters object back to a query string
  return params.toString();
}

export function getDateString(date: Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
