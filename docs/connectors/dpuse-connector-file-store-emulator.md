---
title: DPUse File Store Emulator
section: connectors
category: fileStore
tags: [connector, fileStore, dpuse-connector-file-store-emulator]
audience: user
---

<ConnectorHeader title="DPUse File Store Emulator" category="File Store">
<template #icon><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-cog-icon lucide-folder-cog"><path stroke="#3b82f6" d="M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3"/><g stroke="#0d9488"><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="18" cy="18" r="3"/></g></svg></template>
</ConnectorHeader>

<Badge type="info" text="v0.2.645" /> <Badge type="warning" text="Beta" />

The File Store Emulator Connector is a read-only connector that provides access to a sample dataset simulating a hypothetical cloud-based file storage service such as Google Drive, Dropbox, or Microsoft OneDrive. It is intended for demonstration, evaluation, and testing, and is freely available to all users.

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

- **Identifier:** `dpuse-connector-file-store-emulator`
- [GitHub](https://github.com/dpuse/dpuse-connector-file-store-emulator)
