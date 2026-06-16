const BASE_URL = 'https://api.dpuse.app';
const key = process.argv[2] ?? 'nav/index';

const url = key === 'nav/index'
    ? `${BASE_URL}/kb/nav`
    : `${BASE_URL}/kb/doc/${key.replace(/^docs\//, '')}`;

const res = await fetch(url);

if (!res.ok) {
    console.error(`${res.status} ${res.statusText}`);
    process.exit(1);
}

const text = await res.text();

try {
    console.log(JSON.stringify(JSON.parse(text), null, 2));
} catch {
    console.log(text);
}

export {};
