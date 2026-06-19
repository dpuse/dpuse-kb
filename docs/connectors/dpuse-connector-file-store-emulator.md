---
title: DPUse File Store Emulator
section: connectors
category: fileStore
tags: [connector, fileStore, dpuse-connector-file-store-emulator]
audience: user
---

<div style="display:flex;align-items:center;gap:1rem">
<span style="width:48px;height:48px;flex-shrink:0;display:flex;align-items:center"><svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-cog-icon lucide-folder-cog"><path d="M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3"/><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="18" cy="18" r="3"/></svg></span>
<h1 style="margin:0;border:none;padding:0">DPUse File Store Emulator</h1>
</div>

File Store Connector

<Badge type="info" text="v0.2.501" /> <Badge type="info" text="Source" /> <Badge type="warning" text="Beta" />

Provides access to a sample set of read-only data simulating a hypothetical cloud-based file storage solution. It is intended for demonstration, evaluation, and testing and is freely available to all users. Since no authentication is required, it supports only a single connection.

## Authentication

Does not require authentication and can be used without creating a DPUse Account.

## Supported Operations

Supports the following operations implemented by the Connector API.

| Operation | Supported |
| --------- | --------- |
| Abort Operation | ✓ |
| Audit Object Content | ✓ |
| Create Object |  |
| Describe Connection |  |
| Drop Object |  |
| Find Object | ✓ |
| Get Readable Stream | ✓ |
| Get Record |  |
| List Nodes | ✓ |
| Preview Object | ✓ |
| Remove Records |  |
| Retrieve Chunks |  |
| Retrieve Records | ✓ |
| Upsert Records |  |

## Links

- **Identifier:** `dpuse-connector-file-store-emulator`
- [GitHub](https://github.com/dpuse/dpuse-connector-file-store-emulator)
