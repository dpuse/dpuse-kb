import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = 'https://api.dpuse.app';
const CONNECTORS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'connectors');

// ── Types ─────────────────────────────────────────────────────────────────────────────────────────────────────────────

interface ConnectorImplementationDoc {
    authMethodId: string;
    label?: { en?: string };
}

interface PublicConnectorDoc {
    id: string;
    label: { en?: string };
    description: { en?: string };
    version: string;
    categoryId: string;
    usageId: string;
    statusId: string | null;
    operations: string[];
    implementations: Record<string, ConnectorImplementationDoc>;
    icon: string | null;
    vendorHomeURL: string | null;
    vendorDocumentationURL: string | null;
    vendorAccountURL: string | null;
}

// ── Label Maps ────────────────────────────────────────────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
    application: 'Application',
    curatedDataset: 'Curated Dataset',
    database: 'Database',
    fileStore: 'File Store'
};

const USAGE_LABELS: Record<string, string> = {
    source: 'Source',
    destination: 'Destination',
    bidirectional: 'Bidirectional',
    unknown: 'Unknown'
};

const STATUS_LABELS: Record<string, string> = {
    generalAvailability: 'General Availability',
    releaseCandidate: 'Release Candidate',
    beta: 'Beta',
    alpha: 'Alpha',
    preAlpha: 'Pre-Alpha',
    proposed: 'Proposed',
    underReview: 'Under Review',
    unavailable: 'Unavailable',
    notApplicable: 'N/A'
};

const STATUS_BADGE: Record<string, string> = {
    generalAvailability: 'tip',
    releaseCandidate: 'tip',
    beta: 'warning',
    alpha: 'danger',
    preAlpha: 'danger',
    proposed: 'info',
    underReview: 'info',
    unavailable: 'danger',
    notApplicable: 'info'
};

const AUTH_LABELS: Record<string, string> = {
    oAuth2: 'OAuth 2.0',
    apiKey: 'API Key',
    none: 'None required',
    disabled: 'Disabled'
};

const OPERATION_LABELS: Record<string, string> = {
    abortOperation: 'Abort Operation',
    auditObjectContent: 'Audit Object Content',
    createObject: 'Create Object',
    describeConnection: 'Describe Connection',
    dropObject: 'Drop Object',
    findObject: 'Find Object',
    getReadableStream: 'Get Readable Stream',
    getRecord: 'Get Record',
    listNodes: 'List Nodes',
    previewObject: 'Preview Object',
    removeRecords: 'Remove Records',
    retrieveChunks: 'Retrieve Chunks',
    retrieveRecords: 'Retrieve Records',
    upsertRecords: 'Upsert Records'
};

// ── Markdown Generation ───────────────────────────────────────────────────────────────────────────────────────────────

function generateMarkdown(connector: PublicConnectorDoc): string {
    const title = connector.label.en ?? connector.id;
    const description = connector.description.en ?? '';
    const category = CATEGORY_LABELS[connector.categoryId] ?? connector.categoryId;
    const usage = USAGE_LABELS[connector.usageId] ?? connector.usageId;
    const status = connector.statusId ? (STATUS_LABELS[connector.statusId] ?? connector.statusId) : 'Unknown';
    const statusBadge = connector.statusId ? (STATUS_BADGE[connector.statusId] ?? 'info') : 'info';
    const tags = ['connector', connector.categoryId, connector.id];

    const header = connector.icon
        ? `<div style="display:flex;align-items:center;gap:1rem">\n<span style="width:48px;height:48px;flex-shrink:0;display:flex;align-items:center">${connector.icon}</span>\n<h1 style="margin:0;border:none;padding:0">${title}</h1>\n</div>\n\n${category} Connector`
        : `# ${title}\n${category} Connector`;

    let md = `---
title: ${title}
section: connectors
category: ${connector.categoryId}
tags: [${tags.join(', ')}]
audience: user
---

${header}

<Badge type="info" text="v${connector.version}" /> <Badge type="info" text="${usage}" /> <Badge type="${statusBadge}" text="${status}" />

${description}
`;

    const impls = Object.entries(connector.implementations).filter(([, impl]) => impl.authMethodId !== 'none');
    md += `\n## Authentication\n\n`;
    if (impls.length === 0) {
        md += `Does not require authentication and can be used without creating a DPUse Account.\n`;
    } else if (impls.length === 1) {
        const [, impl] = impls[0]!;
        md += `This connector uses **${AUTH_LABELS[impl.authMethodId] ?? impl.authMethodId}** authentication.\n`;
    } else {
        for (const [implId, impl] of impls) {
            const implLabel = impl.label?.en ?? implId;
            md += `- **${implLabel}**: ${AUTH_LABELS[impl.authMethodId] ?? impl.authMethodId}\n`;
        }
    }

    const supported = new Set(connector.operations);
    md += `\n## Supported Operations\n\nSupports the following operations implemented by the Connector API.\n\n`;
    md += `| Operation | Supported |\n`;
    md += `| --------- | --------- |\n`;
    for (const [id, label] of Object.entries(OPERATION_LABELS)) {
        md += `| ${label} | ${supported.has(id) ? '✓' : ''} |\n`;
    }

    const links: string[] = [];
    links.push(`- **Identifier:** \`${connector.id}\``);
    links.push(`- [GitHub](https://github.com/dpuse/${connector.id})`);
    if (connector.vendorHomeURL) links.push(`- [Vendor website](${connector.vendorHomeURL})`);
    if (connector.vendorDocumentationURL) links.push(`- [Vendor documentation](${connector.vendorDocumentationURL})`);
    if (connector.vendorAccountURL) links.push(`- [Manage account](${connector.vendorAccountURL})`);
    md += `\n## Links\n\n${links.join('\n')}\n`;

    return md;
}

// ── Main ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

const res = await fetch(`${BASE_URL}/public/connectors`);
if (!res.ok) {
    console.error(`Failed to fetch connectors: ${res.status} ${await res.text()}`);
    process.exit(1);
}

const connectors = (await res.json()) as PublicConnectorDoc[];
console.log(`Fetched ${connectors.length} connectors\n`);

await mkdir(CONNECTORS_DIR, { recursive: true });

let failed = 0;
for (const connector of connectors) {
    const md = generateMarkdown(connector);
    const filePath = join(CONNECTORS_DIR, `${connector.id}.md`);
    try {
        await writeFile(filePath, md, 'utf-8');
        console.log(`generated: ${connector.id}`);
    } catch (err) {
        console.error(`failed:    ${connector.id} — ${err instanceof Error ? err.message : err}`);
        failed++;
    }
}

console.log(`\nConnectors: ${connectors.length - failed} generated, ${failed} failed`);
if (failed > 0) process.exit(1);
