/**
 * Wrapper to catch async errors and pass them to Express error handler
 * @param {Function} fn - The async controller function
 * @returns {Function} Express middleware function
 */
export const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
