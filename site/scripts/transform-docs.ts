import fs from 'fs';
import path from 'path';

const SRC = path.resolve(import.meta.dirname, '../../docs');
const DEST = path.resolve(import.meta.dirname, '../guide');

function copyDir(src: string, dest: string, exclude: string[] = []) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        if (exclude.includes(entry.name)) continue;
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else if (entry.name.endsWith('.md')) {
            const content = fs.readFileSync(srcPath, 'utf-8');
            fs.writeFileSync(destPath, transform(content));
        }
    }
}

function transform(content: string): string {
    // Minimal pass-through — add transformations here as needed
    return content;
}

fs.rmSync(DEST, { recursive: true, force: true });
copyDir(SRC, DEST, ['connect']); // connect/ has its own pipeline below
console.log(`Transformed docs from ${SRC} → ${DEST}`);

const CONNECTORS_SRC = path.resolve(import.meta.dirname, '../../docs/connect');
const CONNECTORS_DEST = path.resolve(import.meta.dirname, '../connect');

if (fs.existsSync(CONNECTORS_SRC)) {
    fs.rmSync(CONNECTORS_DEST, { recursive: true, force: true });
    copyDir(CONNECTORS_SRC, CONNECTORS_DEST);
    console.log(`Transformed connect from ${CONNECTORS_SRC} → ${CONNECTORS_DEST}`);
}
