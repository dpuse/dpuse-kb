---
title: Account Setup
section: Getting Started
tags: [account, authentication, tokens, preferences]
audience: user
---

## Creating an account

DPUse accounts are created through the authentication flow accessed from the session button in the top right of the application. During sign-up you will provide an email address and create credentials. Once created, your account persists across sessions.

## Signing in

Select the session button to open the authentication dialog. Enter your credentials to sign in. DPUse maintains a secure session token that refreshes automatically while you are active; you will be prompted to re-authenticate if your session expires.

## Account settings

Once signed in, your account is accessible from the session menu. It is organised into several panels:

**Personal details**
Your name and contact information associated with the account.

**Subscription**
Your current plan and usage limits. This determines which features and data volumes are available to you.

**Tokens and access**
DPUse uses token-based authentication for API access. From this panel you can:
- View your current session token status
- Generate personal access tokens for use with the API or external integrations
- Set token lifetimes and revoke tokens you no longer need

**Access control**
Manage permissions associated with your account. Depending on your plan, this may include sharing access with teammates or setting role-based restrictions.

**Preferences**
Application-level settings including:
- Dark mode toggle
- Language / locale selection

**Data service tokens**
Tokens specific to connecting DPUse to external data services. These are separate from your personal access tokens and are used when establishing connections to partner data sources.

**Activity**
A log of recent account activity for audit and security review purposes.

**Sessions**
Active sessions associated with your account. You can view and terminate individual sessions from here.

## Account deletion

Account deletion is available from the account settings panel. Deleting your account is permanent and will remove all associated configurations, data views, and history. This action cannot be undone.

## Related

- [Quick Start](./quick-start.md)
- [Tokens and Access](../account/tokens-and-access.md)
