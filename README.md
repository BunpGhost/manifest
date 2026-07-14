> 🍴 **Personal fork — BunpGhost/manifest**  
> This is a fork of [Manifest](https://github.com/mnfst/manifest) with targeted patches for use with **Hermes Agent** and **PT-PT (Portuguese) routing**.

---

## Why this fork?

Complexity-based routing is essential for our setup, and this fork ensures it continues working as we need. The patches address:

- **Hermes Agent scoring fix** — Hermes appends memory context (`[System note: ...]`) at the end of each message, which inflated the score of short PT-PT messages and routed them to expensive tiers.
- **PT-PT multilingual routing** — Portuguese keywords added to the classifier for accurate complexity detection on short PT-PT messages.
- **Deprecation banner removed** — irrelevant for a fork where complexity routing is the primary feature.
- **Always-visible complexity toggle** — the `legacyComplexityVisible()` gate is removed so the toggle is never hidden.
- **Tier breakdown chart** — visual pie/bar chart in the Global Overview showing tier distribution (simple/standard/complex/reasoning).
- **50K context override removed** — upstream hardcoded a 50K context limit; removed to allow full provider context windows (e.g. 1M for DeepSeek V4).
- **`max_tokens` scoring removed** — `max_tokens` is a technical infra parameter, not a content signal. Removed from `scoreExpectedOutputLength()` so Hermes' `reasoning_effort: xhigh` (sending `max_tokens:65536`) no longer inflates every request score.

## What was changed

| Patch | File(s) | Description |
|-------|------|-------------|
| PT-PT multilingual keywords | `scoring/` | Portuguese scoring patterns for accurate complexity classification in PT-PT |
| Bilingual EN+PT mode | `scoring/keywords/complexity.ts` | Merge EN + PT keywords so both languages are scored simultaneously — set `MANIFEST_LANGUAGE=bilingual` |
| Envelope peeler | `scoring/envelope-peeler.ts` | `stripTrailingContext()` strips Hermes context from end of messages before scoring |
| Deprecation banner removed | `components/RoutingDeprecationNotice.tsx` + `RoutingDefaultTierSection.tsx` + `RoutingSpecificitySection.tsx` | Empty component, removed all rendering call sites |
| Toggle always visible | `pages/Routing.tsx` | `showComplexityToggle={() => true}` |
| Tier breakdown chart | `components/GlobalOverview.tsx` | Pie/bar chart in Global Overview showing tier distribution |
| `max_tokens` scoring removed | `scoring/dimensions/contextual-dimensions.ts` + `scoring/index.ts` | Removed `maxTokens` from `scoreExpectedOutputLength()` — `max_tokens` is not a content signal; was inflating scores due to Hermes' `reasoning_effort: xhigh` |
| 50K context override removed | Manifest admin config | Removed `max_tokens` override so providers use native context limits |

**Latest commit:** `478b8e0e4`

## Setup notes

- **Provider:** OpenCode Go subscription — DeepSeek V4 Flash (simple/standard), DeepSeek V4 Pro (complex/reasoning)
- **Language:** `MANIFEST_LANGUAGE=bilingual` — EN + PT keywords merged for mixed-language scoring
- **SEED_DATA:** disabled (`SEED_DATA=false`) — clean DB, only production data
- **API keys:** separate keys per Hermes agent profile (Cló, Tikita, Finus, Fri)
- **Database:** PostgreSQL, schema managed via Manifest migrations

## Upstream

[mnfst/manifest](https://github.com/mnfst/manifest) — MIT-licensed, all credit to the original authors.

---

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mnfst/manifest/HEAD/.github/assets/logo-white.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/mnfst/manifest/HEAD/.github/assets/logo-dark.svg" />
    <img src="https://raw.githubusercontent.com/mnfst/manifest/HEAD/.github/assets/logo-dark.svg" alt="Manifest" height="53" title="Manifest"/>
  </picture>
</p>
<p align="center">
Plug your AI agents into any provider
</p>

![manifest-gh](https://github.com/user-attachments/assets/7dd74fc2-f7d6-4558-a95a-014ed754a125)

<p align="center">
  <a href="https://render.com/deploy?repo=https://github.com/mnfst/manifest" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Deploy%20on-Render-46E3B7?style=for-the-badge&amp;logo=render&amp;logoColor=white" alt="Deploy on Render" /></a>
  <a href="https://railway.com/deploy/wild-wild" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Deploy%20on-Railway-0B0D0E?style=for-the-badge&amp;logo=railway&amp;logoColor=white" alt="Deploy on Railway" /></a>
  <a href="https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?stackName=manifest&amp;templateURL=https%3A%2F%2Fmnfst-manifest-deploy-templates.s3.us-east-1.amazonaws.com%2Fmanifest.yaml" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Deploy%20on-AWS-232F3E?style=for-the-badge&amp;logo=amazonwebservices&amp;logoColor=white" alt="Deploy on AWS" /></a>
  <a href="https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https%3A%2F%2Fgithub.com%2Fmnfst%2Fmanifest&amp;cloudshell_workspace=deploy%2Fgcp&amp;cloudshell_tutorial=TUTORIAL.md&amp;cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image&amp;shellonly=true" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Deploy%20on-GCP-4285F4?style=for-the-badge&amp;logo=googlecloud&amp;logoColor=white" alt="Deploy on GCP" /></a>
</p>

<p align="center">
  <span><img src="https://img.shields.io/badge/status-beta-yellow" alt="beta" /></span>
  &nbsp;
  <a href="https://github.com/mnfst/manifest/stargazers"><img src="https://img.shields.io/github/stars/mnfst/manifest?style=flat" alt="GitHub stars" /></a>
  &nbsp;
  <a href="https://hub.docker.com/r/manifestdotbuild/manifest"><img src="https://img.shields.io/docker/pulls/manifestdotbuild/manifest?color=2496ED&label=docker%20pulls" alt="Docker pulls" /></a>
  &nbsp;
  <a href="https://hub.docker.com/r/manifestdotbuild/manifest/tags"><img src="https://img.shields.io/docker/image-size/manifestdotbuild/manifest/latest?color=2496ED&label=image%20size" alt="Docker image size" /></a>
  &nbsp;
  <a href="https://github.com/mnfst/manifest/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/mnfst/manifest/ci.yml?branch=main&label=CI" alt="CI status" /></a>
  &nbsp;
  <a href="https://app.codecov.io/gh/mnfst/manifest"><img src="https://img.shields.io/codecov/c/github/mnfst/manifest?label=coverage" alt="Codecov" /></a>
  &nbsp;
  <a href="LICENSE"><img src="https://img.shields.io/github/license/mnfst/manifest?color=blue" alt="license" /></a>
  &nbsp;
  <a href="https://discord.gg/FepAked3W7"><img src="https://img.shields.io/badge/Discord-Join-5865F2?logo=discord&logoColor=white" alt="Discord" /></a>
</p>

<p align="center">
<a href="https://trendshift.io/repositories/12890" target="_blank"><img src="https://trendshift.io/api/badge/repositories/12890" alt="mnfst%2Fmanifest | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
</p>

## What is Manifest?

Manifest is an open-source model router for AI agents and apps. Connect your API keys, subscriptions, and local models to one OpenAI-compatible endpoint, and each query goes to the right model. No single-provider lock-in.

- 🔀 Routing based on complexity, specificity and custom HTTP headers
- 🎛️ Mix your providers: API keys, Subscriptions, Local models, Custom providers
- 📊 Track every single dollar, setup notifications and limits
- 🚑 Fallback on different models when queries fails

## Quick start

### Cloud version

Go to [app.manifest.build](https://app.manifest.build) and follow the guide.

### Self-hosted

Manifest ships as a [Docker image](https://hub.docker.com/r/manifestdotbuild/manifest). One command:

```bash
bash <(curl -sSL https://raw.githubusercontent.com/mnfst/manifest/main/docker/install.sh)
```

Open [http://localhost:2099](http://localhost:2099) and sign up — the first account you create becomes the admin. Full self-hosting guide: [docker/DOCKER_README.md](docker/DOCKER_README.md).

### Deploy with one click

| Platform | Notes |
| --- | --- |
| [Railway](https://railway.com/deploy/wild-wild) | Best path. Template includes Manifest and PostgreSQL. |
| [Render](https://render.com/deploy?repo=https://github.com/mnfst/manifest) | Blueprint includes Manifest and Render PostgreSQL. |
| [DigitalOcean](deploy/digitalocean/TUTORIAL.md) | App Platform button includes Manifest and a Dev PostgreSQL database. |
| [AWS](deploy/aws/TUTORIAL.md) | CloudFormation quick-create for ECS, RDS, and Secrets Manager. |
| [GCP](deploy/gcp/TUTORIAL.md) | Cloud Shell guided deploy for Cloud Run, Cloud SQL, and Secret Manager. |

Full deployment guides: [Railway](https://manifest.build/docs/deploy/railway), [Render](https://manifest.build/docs/deploy/render), [DigitalOcean](https://manifest.build/docs/deploy/digitalocean), [AWS](https://manifest.build/docs/deploy/aws), [GCP](https://manifest.build/docs/deploy/gcp), [Fly.io](https://manifest.build/docs/deploy/fly), [Coolify](https://manifest.build/docs/deploy/coolify), [Easypanel](https://manifest.build/docs/deploy/easypanel), [Heroku](https://manifest.build/docs/deploy/heroku), and [Koyeb](https://manifest.build/docs/deploy/koyeb).

> The old npm-based self-hosting path is no longer supported. Use the Docker image or one of the deployment guides above.

## Providers

Manifest connects to **300+ models through 31 built-in provider connections** plus any custom OpenAI/Anthropic-compatible endpoint. Bring your own API key, reuse one of **18 subscription flows**, or run models locally. Everything is routed through the same `/auto` endpoint.

Provider catalogs are discovered dynamically when credentials are connected. The examples below are representative, not exhaustive.

| Provider | API key / local | Subscription | Model catalog |
| --- | :---: | :--- | --- |
| [**OpenAI**](https://platform.openai.com/) | ✅ | ✅ ChatGPT Plus / Pro / Team | GPT-5 family, o-series, Codex / Responses models |
| [**Anthropic**](https://www.anthropic.com/) | ✅ | ✅ Claude Max / Pro | Claude Opus, Sonnet, Haiku, Fable |
| [**Google**](https://ai.google.dev/) | ✅ | ✅ Sign in with Google | Gemini 3.1, Gemini 3, Gemini 2.5 |
| [**xAI**](https://x.ai/) | ✅ | ✅ Grok subscription | Grok, Grok Code Fast |
| [**AWS Bedrock**](https://aws.amazon.com/bedrock/) | ✅ | — | Claude, Llama, Mistral, Nova via Bedrock |
| [**Alibaba Cloud / Qwen**](https://www.alibabacloud.com/en/solutions/generative-ai/qwen) | ✅ | ✅ Qwen Token Plan | Qwen, DeepSeek, Kimi, GLM via Alibaba Cloud |
| [**DeepSeek**](https://www.deepseek.com/) | ✅ | — | DeepSeek V3, DeepSeek R1 |
| [**Mistral**](https://mistral.ai/) | ✅ | ✅ Mistral Vibe | Mistral Large, Codestral, Pixtral |
| [**Moonshot** (Kimi)](https://kimi.ai/) | ✅ | ✅ Kimi Coding Plan | Kimi K2, Kimi for Coding, Moonshot v1 |
| [**MiniMax**](https://www.minimax.io/) | ✅ | ✅ MiniMax Coding Plan | MiniMax M3, M2.7, M2.5 |
| [**Xiaomi MiMo**](https://platform.xiaomimimo.com/) | ✅ | ✅ MiMo Token Plan | MiMo V2.5 Pro, V2.5, Flash |
| [**Z.ai**](https://z.ai/) | ✅ | ✅ GLM Coding Plan | GLM 5.2, GLM 5.1, GLM 5 Turbo |
| [**BytePlus**](https://www.byteplus.com/en/activity/codingplan) | — | ✅ ModelArk Coding Plan | Ark Code, Seed Code, GLM, Kimi, DeepSeek |
| [**GitHub Copilot**](https://github.com/features/copilot) | — | ✅ Copilot subscription | Claude, GPT, Gemini, Grok via Copilot |
| [**Kiro**](https://kiro.dev/) | — | ✅ Kiro subscription | `kiro/auto`, Claude, DeepSeek, MiniMax, GLM, Qwen |
| [**Command Code**](https://commandcode.ai/studio) | — | ✅ Command Code subscription | Claude, GPT, Kimi, DeepSeek, Qwen |
| [**ClinePass**](https://app.cline.bot/) | — | ✅ ClinePass subscription | `cline-pass/glm-5.2`, Kimi, DeepSeek, MiMo, MiniMax, Qwen |
| [**NousResearch**](https://portal.nousresearch.com/) | — | ✅ NousResearch subscription | NousResearch Portal model catalog |
| [**OpenCode Go**](https://opencode.ai/) | — | ✅ OpenCode Go | GLM, Kimi, MiMo, MiniMax |
| [**Ollama / Ollama Cloud**](https://ollama.com/) | 🖥️ Local | ✅ Ollama Cloud | Local or cloud tags: Llama, Qwen, DeepSeek, Gemma |
| [**LM Studio**](https://lmstudio.ai/) | 🖥️ Local | — | Local GGUF models, port `1234` |
| [**llama.cpp**](https://github.com/ggml-org/llama.cpp) | 🖥️ Local | — | Local GGUF models, port `8080` |
| [**OpenRouter**](https://openrouter.ai/) | ✅ | — | 300+ models across labs |
| [**OpenCode Zen**](https://opencode.ai/) | ✅ | — | Claude, GPT, Gemini, Qwen, GLM, MiniMax |
| [**Kilo**](https://kilo.ai/) | ✅ | — | Kilo Gateway catalog |
| [**Cerebras**](https://www.cerebras.ai/) | ✅ | — | GPT OSS, GLM on Cerebras inference |
| [**Fireworks AI**](https://fireworks.ai/) | ✅ | — | GLM 5.2, DeepSeek, Kimi, Qwen, Llama |
| [**Groq**](https://groq.com/) | ✅ | — | Llama, Gemma, Mixtral |
| [**NVIDIA NIM**](https://build.nvidia.com/) | ✅ | — | Nemotron, Llama, Mistral |
| [**Pioneer**](https://pioneer.ai/) | ✅ | — | OpenAI-compatible and fine-tuned Pioneer models |
| **Custom** | ✅ | — | Any `/v1/chat/completions` or `/v1/messages` endpoint |

## Quick links

- [Docs](https://manifest.build/docs)
- [Discord](https://discord.com/invite/FepAked3W7)
- [Discussions](https://github.com/mnfst/manifest/discussions)
- [Contributing](CONTRIBUTING.md)
- [GitHub](https://github.com/mnfst/manifest)

## License

[MIT](LICENSE)
