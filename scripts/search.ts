export {};

const ACCOUNT_ID = process.env['CLOUDFLARE_ACCOUNT_ID'];
const API_TOKEN = process.env['CLOUDFLARE_AI_SEARCH_TOKEN'];
const INSTANCE_ID = process.env['CLOUDFLARE_AI_SEARCH_INSTANCE_ID'];

if (!ACCOUNT_ID || !API_TOKEN || !INSTANCE_ID) {
    console.error('Missing required environment variables: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_AI_SEARCH_TOKEN, CLOUDFLARE_AI_SEARCH_INSTANCE_ID');
    process.exit(1);
}

const query = process.argv[2];
if (!query) {
    console.error('Usage: npm run search -- "your query here"');
    process.exit(1);
}

const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai-search/instances/${INSTANCE_ID}/search`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
});

if (!res.ok) {
    console.error(`${res.status} — ${await res.text()}`);
    process.exit(1);
}

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
