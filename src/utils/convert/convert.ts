export const convertDistance = (distance: number) => {
  if (distance < 1000) {
    return `${distance} m`;
  }

  return `${Math.floor(distance / 100) / 10} km`;
};
