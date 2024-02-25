export const trimUUID = (uuid: string) => {
  const lastIndex = uuid.lastIndexOf("-");
  if (lastIndex !== -1) {
    return uuid.substring(lastIndex + 1);
  }
  return uuid;
};

export const removePrefix = (prefix: string, input: string) => {
  if (input.startsWith(prefix)) {
    return input.slice(prefix.length);
  } else {
    return input;
  }
};
