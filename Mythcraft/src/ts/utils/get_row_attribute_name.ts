const getReprowAttributeName = (key: string) => {
  const reprowid = getReprowid(key);
  return key.split(`${reprowid}_`)[1];
};
