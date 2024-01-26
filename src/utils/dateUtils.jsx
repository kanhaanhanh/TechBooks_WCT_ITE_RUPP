// dateUtils.js
export const getFormattedDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  