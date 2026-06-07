# Privacy Policy

**Last updated: 2026-06-07**

This Privacy Policy explains what Waffle ("we", "us") collects when you use the Waffle mobile app, why we collect it, and what choices you have. We try to keep it short and plain.

If anything here is unclear, email us at **support@waffle.app**.

## 1. Who we are

Waffle is a small social app for sharing short video and audio messages — "waffles" — with a fixed circle of friends in private groups. The service is operated by Yegin.

## 2. What we collect

You give us the following directly:

- **Account info** — your email address, display name, username, and timezone. Your email is used for sign-in via Supabase Auth.
- **Waffles** — the audio and video recordings you create and send to your groups.
- **Messages** — short text messages you send in group chat.
- **Friend graph** — who you've added as a friend and which groups you belong to.
- **Group activity** — group membership and message-read timestamps (so we can tell when you've seen something).
- **Push notification tokens** — a device-specific token from Firebase Cloud Messaging so we can deliver notifications to your phone.
- **Reports and blocks** — if you report a waffle, message, or person, or block another user, we store that action (and any reason you give) so we can keep the service safe and make blocks take effect.

We also collect a small amount of activity and technical data automatically:

- **View tracking** — which waffles you have watched, so each group can show "seen" state.
- **Notification history** — a record of recent notifications we sent you. This table auto-expires after 30 days.
- **Crash and diagnostic data** — when the app crashes or hits an error, we send a diagnostic report to our error-monitoring provider (Sentry). It includes the error details, your device model, operating-system version, app version, and your account's user ID, so we can find and fix problems.
- **IP address** — when your app talks to our servers, we briefly process the request's IP address to enforce rate limits and prevent abuse. These rate-limit records are deleted automatically within minutes.

We do **not** collect: contacts from your address book, precise location, photo-library contents, advertising identifiers, or behavioural analytics that track you across other apps and websites.

## 3. Why we collect it

- To run the service — let you sign in, find your friends, post waffles, receive notifications, and see what's new.
- To enforce our Terms of Service — investigate reports of abuse and remove violating content.
- To communicate with you about the service itself (e.g. security or account issues). We do not send marketing email.

## 4. Who we share it with

We use a small number of trusted processors. Your content does not leave these systems.

| Processor | What they do for us | Where data may be stored |
|---|---|---|
| **Supabase** | Authentication and Postgres database | EU and US regions |
| **Cloudflare R2** | Storage of your waffle audio/video files | Global edge, US-anchored |
| **Firebase Cloud Messaging** | Delivers push notifications to your device | US |
| **Sentry** | Crash and error diagnostics, so we can fix bugs | US |

We do **not** sell your data. We do not share it with advertisers. We do not allow third parties to track you across other apps.

## 5. International transfers

Waffle is based in the UK. Some of the processors above operate in the United States. By using Waffle you accept that your data may be transferred to and stored in the US under appropriate safeguards (standard contractual clauses where required by UK GDPR / EU GDPR).

## 6. Notifications and quiet hours

By default we only send push notifications between **08:00 and 22:00 in your device's local timezone**, and you can adjust these quiet hours in the app. We will never push you in the middle of the night unless you change this yourself.

## 7. Retention and deletion

- **Your account and content.** You can permanently delete your account from inside the app: **Settings → Profile → Delete my account**. This cascade-deletes your account record, your waffles, your messages, your push tokens, your friend links, and your group memberships.
- **Notifications.** The notification history table auto-expires after 30 days.
- **Stored media.** Waffle audio/video objects live in Cloudflare R2. We are working on automatic deletion of orphaned media; in the meantime you can request deletion of any specific media by emailing **support@waffle.app**.

## 8. Your rights (UK & EU)

If you are in the UK or EU, GDPR gives you the right to:

- access the personal data we hold about you,
- correct it if it's wrong,
- delete it (the in-app "Delete my account" flow is the fastest route),
- restrict or object to processing,
- export your data in a portable format,
- complain to a supervisory authority (in the UK, the [ICO](https://ico.org.uk)).

To exercise any of these rights, email **support@waffle.app**.

## 9. Security

We use TLS in transit and rely on Supabase and Cloudflare for at-rest encryption of their respective stores. No system is perfectly secure; if you discover a vulnerability, please email **support@waffle.app**.

## 10. Children

Waffle is not directed at children under 13 (or under 16 in the European Economic Area). We do not knowingly collect personal data from children. If you believe a child has created an account, email us and we will delete it.

## 11. Changes to this policy

If we change this policy we will update the "Last updated" date at the top and, where the change is material, surface it in the app before it takes effect.

## 12. Contact

Questions, requests, or complaints: **support@waffle.app**.
