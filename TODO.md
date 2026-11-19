# TODO(Riad): content only you can provide

Nothing below was guessed. Every gap is marked `TODO(Riad)` in `index.html`.
After editing `index.html`, run `node tools/build-ar.mjs` and add the Arabic text for any new key.

## Hero
- [ ] **"Open to work" badge:** yes/no? (It's in the HTML with `hidden`; remove `hidden` to show it.) Which roles?
- [ ] **Third stat** is currently `7 client apps & websites since 2024`, counted from the CV's work projects (agent, visa app, bus app, 4 sites). Confirm the number **and the "since 2024" framing**, or replace it with a stronger true number.

## Numbers for Experience bullets (only if you can stand behind them)
- [ ] Internal workflows automated by AI agents / hours saved per week
- [ ] Chatbot volume (conversations/month) and % resolved without a human
- [ ] Model cost cut after the OpenAI / Claude / Llama benchmarks
- [ ] % fewer API calls after the HR app caching work

## Client work
- [ ] **Multi-channel AI agent:** stack (LLM provider, framework, WhatsApp Cloud API?) and one result metric
- [ ] **Saudi visa app:** platform, stack, your role, client type, result
- [ ] **School bus app:** platform, stack, features (live GPS? parent notifications?), users
- [ ] **citylawfirm.co:** its SSL certificate is still **expired** (rechecked 20 Nov 2026), so it was **removed from the site tiles** (the card text still mentions the law firm site). Tell the client; once it's renewed, add a tile back (there's a comment in `index.html`).
- [ ] Screenshots for each project: **16:9, WebP, ≤ 150 KB**. The gradient placeholders stay as the fallback.

## Personal projects
- [ ] **GitHub / demo URLs:** each card currently shows a muted "Source not public yet" line. Send a URL and it becomes a GitHub / Demo / Hugging Face link. On 20 Nov 2026 the only public repo on github.com/riadbaytamouni was the site itself, and the old links (mostashar, aada, …) returned 404. Make the repos public or send the demo links.
- [ ] **Musannif:** Hugging Face Space URL + benchmark result (e.g. "X% accuracy vs GPT at Y× lower cost"). This would be the strongest line on the site.
- [ ] Screenshots or GIFs per project (optional)

## Education
- [ ] Course provider (Udemy?) and a ↗ "Certificate" link for each of the 3 courses

## Other
- [ ] Contact form (Formspree or similar): yes/no?
- [ ] Higher-resolution profile photo (current source is 400×400; 800×800 would be sharper on retina)
- [ ] Logo in Arabic mode: kept as "Riad." on purpose (it's the brand mark). Say if you prefer "رياض."
