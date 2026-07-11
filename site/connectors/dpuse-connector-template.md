---
title: Connector Template
section: connectors
category: fileStore
tags: [connector, fileStore, dpuse-connector-template]
audience: user
---

<ConnectorHeader title="Connector Template" category="File Store">
<template #icon><svg viewBox="0 0 24 24" fill="none" stroke="#71717a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-dashed-icon lucide-square-dashed"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h1"/><path d="M14 3h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/></svg></template>
<template #iconDark><svg viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-dashed-icon lucide-square-dashed"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h1"/><path d="M14 3h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/></svg></template>
</ConnectorHeader>

<Badge type="info" text="v0.0.9" /> <Badge type="danger" text="Alpha" />

Template scaffold for building new DPUse connectors. Replace this description, and the sample action stubs in src/index.ts, with your connector's actual behaviour.

## Authentication

Does not require authentication and can be used without creating a DPUse Account.

## Supported Operations

Supports the following operations implemented by the Connector API.

|Action|Supported|
|:----|:-------:|
| Abort Operation |  |
| Audit Object Content |  |
| Create Object |  |
| Describe Connection |  |
| Drop Object |  |
| Find Object |  |
| Get Readable Stream |  |
| Get Record |  |
| List Nodes |  |
| Preview Object |  |
| Remove Records |  |
| Retrieve Chunks |  |
| Retrieve Records |  |
| Upsert Records |  |

## Links

- **Identifier:** `dpuse-connector-template`
- [GitHub](https://github.com/dpuse/dpuse-connector-template)
