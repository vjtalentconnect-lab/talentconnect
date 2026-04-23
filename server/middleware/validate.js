export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // Format errors in a more readable way
    const fieldErrors = result.error.flatten().fieldErrors;
    const formattedErrors = {};
    
    Object.keys(fieldErrors).forEach(key => {
      // Take first error message for each field (most relevant)
      formattedErrors[key] = fieldErrors[key].map(msg => {
        // Clean up common Zod error messages
        return msg
          .replace('Expected ', '')
          .replace('Received ', 'value ')
          .replace(/^string$/, 'text');
      });
    });
    
    console.warn('[Validation Error]', formattedErrors);
    return res.status(400).json({
      message: 'Validation failed. Please check your input.',
      errors: formattedErrors,
    });
  }

  req.body = result.data;
  return next();
};
