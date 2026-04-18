const MAGIC_SIGNATURES = [
  {
    mime: 'image/jpeg',
    test: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8,
  },
  {
    mime: 'image/png',
    test: (bytes) => bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47,
  },
  {
    mime: 'image/webp',
    test: (bytes) =>
      bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50,
  },
  {
    mime: 'image/gif',
    test: (bytes) => bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46,
  },
  {
    mime: 'application/pdf',
    test: (bytes) => bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46,
  },
  {
    mime: 'video/mp4',
    test: (bytes) => bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70,
  },
  {
    mime: 'video/webm',
    test: (bytes) => bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3,
  },
  {
    mime: 'video/quicktime',
    test: (bytes) =>
      bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70 &&
      bytes[8] === 0x71 && bytes[9] === 0x74,
  },
];

const matchesCategory = (mime, accept) => {
  if (!accept || accept.length === 0) return true;
  return accept.some((allowed) => {
    if (allowed.endsWith('/*')) {
      return mime.startsWith(`${allowed.slice(0, -1)}`);
    }
    return allowed === mime;
  });
};

export const detectFileMimeFromMagicBytes = async (file) => {
  const buffer = await file.slice(0, 16).arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const match = MAGIC_SIGNATURES.find((signature) => signature.test(bytes));
  return match?.mime || null;
};

export const validateFileForUpload = async (file, accept = []) => {
  const detectedMime = await detectFileMimeFromMagicBytes(file);
  if (!detectedMime) {
    throw new Error('Unsupported or unrecognized file format.');
  }

  if (!matchesCategory(detectedMime, accept)) {
    throw new Error(`Invalid file type: ${detectedMime}.`);
  }

  return detectedMime;
};
