export const required = (value, fieldName = "Field") => {
  if (value === undefined || value === null || value === "") {
    return `${fieldName} is required`;
  }
  return "";
};

export const isValidDate = (value, fieldName = "Date") => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) {
    return `${fieldName} is invalid`;
  }
  return "";
};
