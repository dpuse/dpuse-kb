---
title: File Store Emulator
section: connectors
category: fileStore
tags: [connector, fileStore, dpuse-connector-file-store-emulator]
audience: user
---

<ConnectorHeader title="File Store Emulator" category="File Store">
<template #icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-cog-icon lucide-file-cog"><g stroke="#3b82f6"><path d="M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z"/><path d="M20 8v12a2 2 0 0 1-2 2h-4.182"/><path d="M4 10.592V4a2 2 0 0 1 2-2h8"/></g><g stroke="#ca8a04"><path d="m3.305 19.53.923-.382"/><path d="m4.228 16.852-.924-.383"/><path d="m5.852 15.228-.383-.923"/><path d="m5.852 20.772-.383.924"/><path d="m8.148 15.228.383-.923"/><path d="m8.53 21.696-.382-.924"/><path d="m9.773 16.852.922-.383"/><path d="m9.773 19.148.922.383"/><circle cx="7" cy="18" r="3"/></g></svg></template>
</ConnectorHeader>

<Badge type="info" text="v1.0.335" /> <Badge type="warning" text="Beta" />

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
| Get Info |  |
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
