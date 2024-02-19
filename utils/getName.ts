export function getFileNameFromUrl(url: any) {
  const urlParts = url.split("/");
  const fileName = urlParts[urlParts.length - 1];
  return fileName;
}
