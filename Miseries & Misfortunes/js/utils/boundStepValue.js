function boundStepValue(stepValue) {
  if (stepValue < 0) stepValue = 0;
  if (stepValue > 9) stepValue = 9;
  return stepValue;
}
