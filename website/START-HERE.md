# Start here

## 1. Make the repo

Create a new GitHub repo called `flyventory-web`. Keep it separate from the drone and CV code.
Unzip this kit into it, so `CLAUDE.md` sits at the repo root.

## 2. Install the plugins (inside Claude Code)

Open a terminal in the repo, run `claude`, then type these one at a time:

```
/plugin install frontend-design@claude-plugins-official
/plugin install playwright@claude-plugins-official
/plugin install context7@claude-plugins-official
/plugin install vercel@claude-plugins-official
```

- frontend-design: stops the site looking like a generic template.
- playwright: lets Claude open the site, screenshot it and fix layout problems itself.
- context7: pulls current Astro and Tailwind docs so the code isn't outdated.
- vercel: deploys. Skip it if the incubator hosts the site.

Optional, extra design guidance (third-party, not Anthropic):

```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

It needs Python 3 (`python3 --version`). CLAUDE.md already stops it from changing the brand.

When it asks for a scope, choose "project" so your teammates get the same setup.
If one says "not found", run `/plugin marketplace add anthropics/claude-plugins-official` and try again.
Run `/plugin` to browse everything else.

## 3. Add your media

Put real files in `public/media/`: drone photos, the barcode detection screenshot, a dashboard screenshot, a short demo video (MP4, under 10 MB).

## 4. Edit the copy

Read `content/site-copy.md`. Fix anything wrong, fill in the team, and settle every [CONFIRM] line.

## 5. First prompt

Press Shift+Tab until you're in plan mode, then paste:

```
Read CLAUDE.md, content/site-copy.md and docs/Flyventory-Brand-Guidelines.pdf.
Plan the Flyventory landing page: project setup (Astro + Tailwind), the theme tokens, the component list, and the layout of each section on mobile and desktop.
Use the frontend-design skill for the visual direction. Show me the plan before writing any code.
```

Approve the plan, then build:

```
Build the plan one section at a time. After each section, run the dev server, screenshot it with Playwright at 375px and 1440px, fix anything that looks off, and commit.
At the end, list every TODO and [CONFIRM] still on the page.
```

## 6. Deploy

Connect the repo to Vercel, then point getflyventory.com at it once the incubator has registered the domain.
