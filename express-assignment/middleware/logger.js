/**
 * Custom middleware to log request details
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const logger = (req, res, next) => {
const timestamp = new Date().toISOString();
const method = req.method;
const url = req.url;

console.log(`[${timestamp}] ${method} ${url}`);

// Measure response time
const start = Date.now();
res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${method} ${url} ${res.statusCode} - ${duration}ms`);
});

next();
};

module.exports = logger;