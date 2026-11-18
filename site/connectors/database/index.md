---
title: Database Connectors
section: connectors
---

# Database Connectors

- [DuckDB](/connectors/dpuse-connector-duckdb-wasm) — Stores data views for investigation in a DuckDB database saved in the browser's private file system (OPFS). Data stays on this device. Only one tab can use it at a time. Faster than SQLite for grouping large data, but a larger download (about 8 MB) and more memory (about 200–400 MB).
- [IndexedDB (Dexie)](/connectors/dpuse-connector-dexie-js) — Provides access to local IndexedDB databases in the browser via the Dexie.js wrapper library. It is intended for local-first, offline-capable data storage and supports read/write operations. Each database may optionally be synced with Dexie Cloud, in which case access is governed by that database's own authentication and realm permissions; unsynced databases require no authentication and are scoped to the local device only. It can also keep data views for investigation, which every tab can use at once. It answers grouping and sorting in memory, so it suits smaller data than SQLite or DuckDB.
- [SQLite](/connectors/dpuse-connector-sqlite-wasm) — Stores data views for investigation in a SQLite database saved in the browser's private file system (OPFS). Data stays on this device. Only one tab can use it at a time. Lighter than DuckDB: a small download and little memory, with slower grouping on large data.
