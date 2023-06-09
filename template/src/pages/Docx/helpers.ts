export const saveBlobAsFile = (data: Blob, fileName: string): File => {
  const b: any = data;
  b.lastModifiedDate = new Date();
  b.name = fileName;

  return data as File;
};

export const downloadFile = (file: File): void => {
  let exportUrl = URL.createObjectURL(file);
  window.location.assign(exportUrl);
  URL.revokeObjectURL(exportUrl);
};
