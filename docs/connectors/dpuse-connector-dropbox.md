---
title: Dropbox
section: connectors
category: fileStore
tags: [connector, fileStore, dpuse-connector-dropbox]
audience: user
---

<div style="display:flex;align-items:center;gap:1rem">
<span style="width:48px;height:48px;flex-shrink:0;display:flex;align-items:center"><svg viewBox="0 0 235.45 200"><path fill="#0061ff" d="M58.86 75l58.87-37.5L58.86 0 0 37.5z" /><path fill="#0061ff" d="M176.59 75l58.86-37.5L176.59 0l-58.86 37.5z" /><path fill="#0061ff" d="M117.73 112.5L58.86 75 0 112.5 58.86 150z" /><path fill="#0061ff" d="M176.59 150l58.86-37.5L176.59 75l-58.86 37.5z" /><path fill="#0061ff" d="M176.59 162.5L117.73 125l-58.87 37.5 58.87 37.5z" /></svg></span>
<h1 style="margin:0;border:none;padding:0">Dropbox</h1>
</div>

File Store Connector

<Badge type="info" text="v0.2.492" /> <Badge type="info" text="Source" /> <Badge type="warning" text="Beta" />

Dropbox is a cloud-based file storage solution. It provides for the storage and sharing of files, as well as synchronising them across multiple devices.

## Authentication

This connector uses **OAuth 2.0** authentication.

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

- **Identifier:** `dpuse-connector-dropbox`
- [GitHub](https://github.com/dpuse/dpuse-connector-dropbox)
