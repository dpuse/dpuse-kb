import fs from "fs";
import path from "path";

const SRC = path.resolve(import.meta.dirname, "../../docs");
const DEST = path.resolve(import.meta.dirname, "../kb");

function copyDir(src: string, dest: string) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else if (entry.name.endsWith(".md")) {
            const content = fs.readFileSync(srcPath, "utf-8");
            fs.writeFileSync(destPath, transform(content));
        }
    }
}

function transform(content: string): string {
    // Minimal pass-through — add transformations here as needed
    return content;
}

fs.rmSync(DEST, { recursive: true, force: true });
copyDir(SRC, DEST);
console.log(`Transformed docs from ${SRC} → ${DEST}`);
