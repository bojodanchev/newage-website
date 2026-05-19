# T004 — gpt-image-2 prompt manifest

Generated via the `gpt-image-2-prompt` skill (`~/.claude/skills/gpt-image-2-prompt/SKILL.md`).

Aesthetic spec (locked by T001 → goal.md):
- Cinematic editorial / dark moody photographic
- NewAge palette: `#0A0A0A` near-black, `#6C3AFF` purple, `#00E5A0` mint, `#FF6B35` orange
- Shallow DOF, strong vignette, subtle film grain
- **No text or typography in image**
- 16:9 for case-study covers, 3:2 for the Solution diagram

Each prompt below should be pasted into ChatGPT (GPT Image 2 image UI) one at a time and the output saved to the path noted in the heading. The page renders the image only if the file exists (graceful fallback to a gradient if missing — see `MetaAdsCaseStudies → CardCover` and `MetaAdsSolution`).

When real reference images for NewAge brand work / actual client deliverables become available (owner-blocked T100), re-paste each prompt into the ChatGPT image UI with the reference image attached and overwrite the existing PNG.

---

## 1. Case-study cover — `−62% Cost Per Lead`

**Save to:** `/Users/bojodanchev/NewAge/public/meta-ads/case-studies/cpl.png`

```
Generate an image with the following prompt, dont change it(DO NOT CHANGE THIS PROMPT, IT'S ALREADY AN IMPROVED PROMPT) -

object: a single sharp obsidian arrow embedded deep into a soft cratered surface of fine grey-violet ash, with concentric rings of dust still dispersing outward
scene: extreme close-up macro shot, the arrow is glowing faintly from within with a thin purple inner light, the ash crater has a subtle mint-green ember at the rim catching one streak of warm rim light, background falls off into pure near-black void
vibe: cinematic editorial cover image about efficiency collapsing waste, dark moody photographic, the metaphor reads as "one decisive cut" — restraint and impact
palette: dominant near-black (#0A0A0A), deep purple inner glow (#6C3AFF), one mint accent (#00E5A0) at the crater rim, single warm orange rim light (#FF6B35) glancing from upper right
photo quality and vibe: focused cinematic shot, natural light, highly aesthetic scene, movie-still composition, raw quality, warm rim light, subtle film grain, clean composition, cool ambient shadows, colors with a slight gray tone, make sure the lighting is natural and matches the background, no oversaturation, no oversharpening, strong vignette, shallow depth of field with only the arrow tip in critical focus, raw quality
aspect ratio: 16:9

no extra text, no watermarks, no unrelated logos. use clean composition, strong color direction.

Avoid: typography, numbers, charts, infographic shapes, arrows-as-icons, finance imagery, stock-photo gloss, excessive yellow, oversharpening, glare.
```

## 2. Case-study cover — `3.8× Monthly Revenue`

**Save to:** `/Users/bojodanchev/NewAge/public/meta-ads/case-studies/mrr.png`

```
Generate an image with the following prompt, dont change it(DO NOT CHANGE THIS PROMPT, IT'S ALREADY AN IMPROVED PROMPT) -

object: three identical translucent glass cylinders standing in a tight cluster on a dark polished marble surface, each cylinder progressively taller — the tallest nearly four times the height of the shortest — filled with a slow rising luminous mint liquid that glows from within
scene: editorial product still life, one cylinder in front in sharp focus with the others receding into bokeh, a single beam of soft purple light from upper-left cuts through the glass and refracts onto the marble, suggestion of an aesthetic-clinic environment in the deep background — out of focus white marble curves, brushed brass, ambient hush
vibe: cinematic editorial, restrained luxury, compounding growth told through scale not shapes, dark moody photographic
palette: near-black backdrop (#0A0A0A), polished marble in graphite-violet, mint liquid (#00E5A0) as the only saturated colour inside the glass, deep purple light beam (#6C3AFF), a single warm orange specular highlight (#FF6B35) on the rim of the tallest cylinder
photo quality and vibe: focused cinematic shot, natural light, highly aesthetic scene, movie-still composition, raw quality, warm rim light, subtle film grain, clean composition, cool ambient shadows, colors with a slight gray tone, make sure the lighting is natural and matches the background, no oversaturation, no oversharpening, strong vignette, shallow depth of field, raw quality
aspect ratio: 16:9

no extra text, no watermarks, no unrelated logos. use clean composition, strong color direction.

Avoid: typography, numbers, multiplier symbols, finance charts, dollar imagery, stock-photo people, plastic look, excessive yellow, oversharpening, glare.
```

## 3. Case-study cover — `+212 Booked Strategy Calls`

**Save to:** `/Users/bojodanchev/NewAge/public/meta-ads/case-studies/calls.png`

```
Generate an image with the following prompt, dont change it(DO NOT CHANGE THIS PROMPT, IT'S ALREADY AN IMPROVED PROMPT) -

object: a wall of softly glowing rectangular tiles arranged in a precise grid — each tile a thin slab of warm-tinted frosted glass internally lit, packed densely without gaps, photographed at a slight three-quarter angle so the grid recedes into depth
scene: editorial architectural macro shot, the tiles are stacked like a calendar grid viewed in extreme close-up, every tile glowing faintly with a uniform interior light suggesting "every slot filled", the foreground tiles are in sharp focus while the far edge dissolves into a soft purple haze, a single mint-green pinpoint of light glints off the front edge of one centred tile
vibe: cinematic editorial, demand made tangible, authority and density without any literal calendar icon, dark moody photographic
palette: near-black ambient (#0A0A0A), warm milky glow inside the tiles, deep purple atmosphere (#6C3AFF) on the far side, single mint accent (#00E5A0) as the focal point, a faint warm orange rim light (#FF6B35) skimming the foreground tile edges
photo quality and vibe: focused cinematic shot, natural light, highly aesthetic scene, movie-still composition, raw quality, warm rim light, subtle film grain, clean composition, cool ambient shadows, colors with a slight gray tone, make sure the lighting is natural and matches the background, no oversaturation, no oversharpening, strong vignette, shallow depth of field with strong falloff to the back of the grid, raw quality
aspect ratio: 16:9

no extra text, no watermarks, no unrelated logos. use clean composition, strong color direction.

Avoid: literal calendars, clocks, phone screens, UI mockups, dashboards, typography, numbers, stock-photo people, excessive yellow, oversharpening, glare.
```

## 4. Solution-section diagram — TOFU → MOFU → BOFU framework

**Save to:** `/Users/bojodanchev/NewAge/public/meta-ads/process/framework.png`

```
Generate an image with the following prompt, dont change it(DO NOT CHANGE THIS PROMPT, IT'S ALREADY AN IMPROVED PROMPT) -

object: three discrete circular pools of light photographed in a single linear composition on a long dark surface — first pool wide and diffuse, second pool tighter and warmer, third pool small and intensely focused — each pool catches a single ribbon of fine particulate mist suspended above it
scene: editorial wide shot, the three pools sit left-to-right at equal spacing on what reads as a darkened studio table, each successive pool of light is more concentrated and slightly elevated than the last, the suspended mist threads connect their atmospheres without literally arrowing between them, background is deep absolute black, foreground is the polished dark surface reflecting the pools subtly
vibe: cinematic editorial photography, the three stages of a funnel told as three states of light intensity rather than as shapes or arrows, dark moody photographic, restrained and metaphorical
palette: near-black surroundings (#0A0A0A), first pool wide soft purple (#6C3AFF) atmosphere, second pool warmer hybrid with a hint of orange (#FF6B35), third pool concentrated luminous mint (#00E5A0) — the colour journey reads as attention → conviction → conversion
photo quality and vibe: focused cinematic shot, natural light, highly aesthetic scene, movie-still composition, raw quality, warm rim light, subtle film grain, clean composition, cool ambient shadows, colors with a slight gray tone, make sure the lighting is natural and matches the background, no oversaturation, no oversharpening, strong vignette, shallow depth of field with the centre pool in critical focus and the outer pools softening, raw quality
i'd like to understand technically and visually the flow.
aspect ratio: 3:2

no extra text, no watermarks, no unrelated logos. use clean composition, strong color direction.

Avoid: literal funnel shapes, arrows, geometric infographic elements, charts, UI screens, typography, stock-photo people, excessive yellow, oversharpening, glare.
```

---

## How to apply

For each prompt:

1. Open ChatGPT, switch to GPT Image 2 mode.
2. Paste the full prompt block (everything inside the fenced code block, including the leading `Generate an image with the following prompt…` line).
3. When the image returns, download as `.png` at the highest resolution available.
4. Save to the path noted under the prompt heading.
5. Reload `/meta-ads` — the `CardCover` / Solution diagram component HEAD-checks the URL and swaps the gradient placeholder for the real image automatically once it exists.

When owner-supplied **reference images** (T100) become available, attach them to the ChatGPT image gen turn alongside the same prompt — the brand cohesion should tighten substantially.
