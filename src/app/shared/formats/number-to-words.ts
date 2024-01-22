export function numberToWords(num: number): string {
  const units = ["", "Thousand", "Million", "Billion", "Trillion"];
  const below20 = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function convertLessThanThousand(n: number): string {
    if (n === 0) {
      return "";
    } else if (n < 20) {
      return below20[n] + " ";
    } else if (n < 100) {
      return tens[Math.floor(n / 10)] + " " + convertLessThanThousand(n % 10);
    } else {
      return (
        below20[Math.floor(n / 100)] +
        " Hundred " +
        convertLessThanThousand(n % 100)
      );
    }
  }

  function convert(num: number): string {
    if (num === 0) {
      return "Zero";
    }

    let result = "";
    let i = 0;

    while (num > 0) {
      if (num % 1000 !== 0) {
        result = convertLessThanThousand(num % 1000) + units[i] + " " + result;
      }
      num = Math.floor(num / 1000);
      i++;
    }

    return result.trim();
  }

  const dollars = Math.floor(num);
  const cents = Math.round((num - dollars) * 100);

  let result = convert(dollars);
  if (cents > 0) {
    result += " and " + convertLessThanThousand(cents) + " Cents";
  }

  return result;
}
