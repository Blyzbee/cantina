export const durationParsing = (minutes) => {
  let hours = Math.floor(minutes / 60);
  let newMinutes = minutes - hours * 60;
  let duration = `${hours}h ${newMinutes}min`;
  if (hours <= 0) return minutes + "min";
  return duration;
};
