---
title: Dropbox
section: connectors
category: fileStore
tags: [connector, fileStore, dpuse-connector-dropbox]
audience: user
---

<ConnectorHeader title="Dropbox" category="File Store">
<template #icon><svg viewBox="0 0 235.45 200"><path fill="#0061ff" d="M58.86 75l58.87-37.5L58.86 0 0 37.5z" /><path fill="#0061ff" d="M176.59 75l58.86-37.5L176.59 0l-58.86 37.5z" /><path fill="#0061ff" d="M117.73 112.5L58.86 75 0 112.5 58.86 150z" /><path fill="#0061ff" d="M176.59 150l58.86-37.5L176.59 75l-58.86 37.5z" /><path fill="#0061ff" d="M176.59 162.5L117.73 125l-58.87 37.5 58.87 37.5z" /></svg></template>
</ConnectorHeader>

<Badge type="info" text="v0.2.495" /> <Badge type="info" text="Source" /> <Badge type="warning" text="Beta" />

Provides access to a user's Dropbox account(s) for downloading and uploading files. Dropbox is a cloud-based file storage solution that provides for the storage and sharing of files, as well as synchronising them across multiple devices. Requires the user to authenticate via OAuth 2.0 for each account connected; access is scoped to that account's files and folders only.

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
