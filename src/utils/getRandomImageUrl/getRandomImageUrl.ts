export const getRandomImageUrl = () => {
  return `https://source.unsplash.com/collection/${Math.floor(Math.random() * 100)}`;
};
