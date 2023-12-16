export const currencyFormat = (value: number, currency = 'USD') => {
   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
   });
   const formattedValue = formatter.format(value);
   return formattedValue;
};
