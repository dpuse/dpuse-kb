export {};

const baseUrl = process.env['DPUSE_API_URL'] ?? 'https://api.dpuse.app';

const response = await fetch(`${baseUrl}/ping`);
const body = await response.json();

console.log(`status: ${response.status}`);
console.log(JSON.stringify(body, null, 2));
