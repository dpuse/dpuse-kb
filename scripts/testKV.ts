const BASE_URL = 'https://api.dpuse.app';
const key = process.argv[2] ?? 'nav/index';

const url = key === 'nav/index' ? `${BASE_URL}/kb/nav` : `${BASE_URL}/kb/doc/${key.replace(/^docs\//, '')}`;

const response = await fetch(url);

if (!response.ok) {
    console.error(`${String(response.status)} ${response.statusText}`);
    process.exit(1);
}

const text = await response.text();

try {
    console.log(JSON.stringify(JSON.parse(text), null, 2));
} catch {
    console.log(text);
}

