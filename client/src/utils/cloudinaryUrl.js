export const transformCloudinaryUrl = (url, width, height = width) => {
  if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) {
    return url;
  }

  return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`);
};
