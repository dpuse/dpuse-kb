import type { ConnectorActionName } from '@dpuse/dpuse-shared';
import { getConnectorActionsTable } from '@dpuse/dpuse-shared';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';

const BASE_URL = 'https://api.dpuse.app';
const CONNECTORS_DIRECTORY = path.join(import.meta.dirname, '..', 'docs', 'connectors');

// ── Types ─────────────────────────────────────────────────────────────────────────────────────────────────────────────

interface ConnectorImplementationDocument {
    authMethodId: string;
    label?: { en?: string };
}

interface PublicConnectorDocument {
    id: string;
    label: { en?: string };
    description: { en?: string[] };
    version: string;
    categoryId: string;
    statusId: string | null;
    operations: string[];
    implementations: Record<string, ConnectorImplementationDocument>;
    icon: string | null;
    iconDark: string | null;
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

// ── Markdown Generation ───────────────────────────────────────────────────────────────────────────────────────────────

function generateMarkdown(connector: PublicConnectorDocument): string {
    const title = connector.label.en ?? connector.id;
    const rawDescription = connector.description.en ?? [];
    const description = (Array.isArray(rawDescription) ? rawDescription : [rawDescription]).join('\n\n');
    const category = CATEGORY_LABELS[connector.categoryId] ?? connector.categoryId;
    const status = connector.statusId ? (STATUS_LABELS[connector.statusId] ?? connector.statusId) : 'Unknown';
    const statusBadge = connector.statusId ? (STATUS_BADGE[connector.statusId] ?? 'info') : 'info';
    const tags = ['connector', connector.categoryId, connector.id];

    const header = generateHeader(connector, title, category);

    let md = `---
title: ${title}
section: connectors
category: ${connector.categoryId}
tags: [${tags.join(', ')}]
audience: user
---

${header}

<Badge type="info" text="v${connector.version}" /> <Badge type="${statusBadge}" text="${status}" />

${description}
`;

    const impls = Object.entries(connector.implementations).filter(([, impl]) => impl.authMethodId !== 'none');
    md += `\n## Authentication\n\n`;
    if (impls.length === 0) {
        md += `Does not require authentication and can be used without creating a DPUse Account.\n`;
    } else if (impls.length === 1) {
        const [, impl] = impls[0];
        md += `This connector uses **${AUTH_LABELS[impl.authMethodId] ?? impl.authMethodId}** authentication.\n`;
    } else {
        for (const [implId, impl] of impls) {
            const implLabel = impl.label?.en ?? implId;
            md += `- **${implLabel}**: ${AUTH_LABELS[impl.authMethodId] ?? impl.authMethodId}\n`;
        }
    }

    md += `\n## Supported Operations\n\nSupports the following operations implemented by the Connector API.\n\n`;
    md += getConnectorActionsTable(connector.operations as ConnectorActionName[]);

    const links = [`- **Identifier:** \`${connector.id}\``, `- [GitHub](https://github.com/dpuse/${connector.id})`];
    if (connector.vendorHomeURL) links.push(`- [Vendor website](${connector.vendorHomeURL})`);
    if (connector.vendorDocumentationURL) links.push(`- [Vendor documentation](${connector.vendorDocumentationURL})`);
    if (connector.vendorAccountURL) links.push(`- [Manage account](${connector.vendorAccountURL})`);
    md += `\n## Links\n\n${links.join('\n')}\n`;

    return md;
}

/** The page header: the connector's own header component where it has an icon, otherwise a plain title. */
function generateHeader(connector: PublicConnectorDocument, title: string, category: string): string {
    if (!connector.icon) return `# ${title}\n${category} Connector`;

    const iconDarkSlot = connector.iconDark ? `\n<template #iconDark>${connector.iconDark}</template>` : '';
    return `<ConnectorHeader title="${title}" category="${category}">\n<template #icon>${connector.icon}</template>${iconDarkSlot}\n</ConnectorHeader>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

const response = await fetch(`${BASE_URL}/public/connectors`);
if (!response.ok) {
    console.error(`Failed to fetch connectors: ${String(response.status)} ${await response.text()}`);
    process.exit(1);
}

const connectors = (await response.json()) as PublicConnectorDocument[];
console.log(`Fetched ${String(connectors.length)} connectors\n`);

await mkdir(CONNECTORS_DIRECTORY, { recursive: true });

let failed = 0;
for (const connector of connectors) {
    const md = generateMarkdown(connector);
    const filePath = path.join(CONNECTORS_DIRECTORY, `${connector.id}.md`);
    try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename -- The path is this repository's own docs folder.
        await writeFile(filePath, md, 'utf-8');
        console.log(`generated: ${connector.id}`);
    } catch (error) {
        console.error(`failed:    ${connector.id} — ${error instanceof Error ? error.message : String(error)}`);
        failed++;
    }
}

console.log(`\nConnectors: ${String(connectors.length - failed)} generated, ${String(failed)} failed`);
if (failed > 0) process.exit(1);
