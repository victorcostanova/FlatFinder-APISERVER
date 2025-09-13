const crypto = require('crypto');

// Generate a secure random JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log('Generated JWT Secret for .env file:');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log('\nCopy this into your .env file to replace the current JWT_SECRET');
console.log('\nSecret length:', jwtSecret.length, 'characters');
console.log('Secret (base64):', crypto.randomBytes(64).toString('base64'));