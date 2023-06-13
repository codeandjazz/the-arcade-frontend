/* Add helper functions here, its nice */
export const formatDate = (string) => {
  const dateString = string;
  const date = new Date(dateString);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
};
