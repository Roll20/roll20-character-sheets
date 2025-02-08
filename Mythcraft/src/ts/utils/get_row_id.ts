const getReprowid = (trigger: string) => {
  const split = trigger.split("_");
  return `${split[0]}_${split[1]}_${split[2]}`;
};
