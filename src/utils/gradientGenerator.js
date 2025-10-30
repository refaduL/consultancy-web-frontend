export const getGradientByIndex = (index) => {
  const gradients = [
    "bg-gradient-1",
    "bg-gradient-2",
    "bg-gradient-3",
  ];
  return gradients[index % gradients.length];
};
