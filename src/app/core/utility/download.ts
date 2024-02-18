export const downloadCsv = (content: string, title: string) => {
  const csvContent = "data:text/csv;charset=utf-8," + content;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${title}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
