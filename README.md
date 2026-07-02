>? *🎴 Personal fork — BungGhost/manifest  
> This is a fork of [Manifest](https://github.com/mnfst/manifest) with targeted patches for use with **Hermes Agent** and **PT-PT (Portuguese) routing**.

### Why this fork?

Complexity-based routing is essential for our setup, and this fork ensures it continues working as we need. The patches address:

- **Hermes Agent scoring fix** — Hermes appends memory context (`[System note: ...]`) at the end of each message, which inflated the score of short PT-PT messages and routed them to expensive tiers.
- **Deprecation banner removed** — irrelevant for a fork where complexity routing is the primary feature.
- **Always-visible complexity toggle** — the `legacyComplexityVisible` gate is removed so the toggle is never hidden.

### What was changed

| Patch | File | Description |
|-----|-----|---------|
| Envelope peeler | `scoring/envelope-peeler.ts` | New `stripTrailingContext()` strips Hermes context from end of messages before scoring |
| Deprecation notice | `components/RoutingDeprecationNotice.tsx` + section files | Empty component, removed rendering |
| Toggle always visible | `pages/Routing.tsx` | `showComplexityToggle={() => true}` |

**Commit:* `a88f8f09a`

### Upstream

[mnfst/manifest](https://github.com/mnfst/manifest) — MIT-licensed, all credit to the original authors.

---


Obligado, segue o original debaixo intacto.