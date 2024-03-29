export const trimUUID = (uuid: string) => {
  const lastIndex = uuid.lastIndexOf("-");
  if (lastIndex !== -1) {
    return uuid.substring(lastIndex + 1);
  }
  return uuid;
};
