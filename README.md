# Training Console

A full-screen, immersive HTML/JS interface simulating a futuristic "training" console. Retro-CRT aesthetics, animated phrase streams, floating popups, a metronome, and a live theme system — all client-side, nothing is ever sent to a server.

## Features

- Retro CRT-style visual design (scanlines, flicker, radial background, vignette)
- Animated phrase logs across three panels with a typewriter effect
- Floating popup phrases during a session
- Configurable session duration (fixed buttons or a randomized amount) with a countdown that's intentionally inaccurate
- Selectable phrase categories, each a themed word bank
- End-of-session praise flood + a confirmation word required to close out
- Optional metronome with adjustable BPM and waveform, powered by [Tone.js](https://tonejs.github.io/)
- Step-by-step in-app tutorial (Settings → ? button)

### Themes

- Two built-in presets: **Pastel** and **Matrix**
- **Custom** theme: pick 4 base colors (background, text, confirm, highlight) and the console derives and live-applies the full palette from them — no CSS or JSON editing needed
- Import/export whole theme packs as `.json` to share full custom palettes (see `theme-pack-demo.json` for the expected format)

### Phrase categories

- Come with 6 built-in categories (Submission, Obedience, Affirmations, Dronification, Cute, Hypnosis)
- **+ Add Category** in Settings lets you create or edit a category directly — a name and one phrase per line, no file needed
- Import/export whole phrase packs as `.json` for sharing a full set of categories at once

### Data & persistence

- Everything (theme, custom colors, categories, confirmation word, praise term) is saved in the browser via `localStorage` — nothing leaves your device
- "Reset to defaults" (with an in-app confirmation) clears all of the above back to the built-in defaults

## File structure

- `index.html` — markup only
- `style.css` — all styling, theme CSS variables, and the default ("Pastel") palette
- `script.js` — all behavior: timers, theme derivation, phrase/category management, import/export, metronome, tutorial
- `theme-pack-demo.json` — a sample importable theme pack

## Usage

1. Open `index.html` in a modern browser (serving it over `http://`/`https://` is recommended; opening via `file://` also works, it just falls back to the phrases/themes built into `script.js` instead of fetching them).
2. Pick a session duration and one or more phrase categories.
3. Click **Start Training**. When the session ends, type the confirmation word to close it out.
4. Open **Settings** to change the theme, customize wording, add your own categories, or import/export packs.

## Customization

- **Theme:** Settings → Theme → Custom, then pick 4 colors.
- **Phrases:** Settings → Phrase Packs & Themes → **+ Add Category**, or import a `.json` file shaped like `{ "version": 1, "categories": { "CategoryName": ["phrase 1", "phrase 2"] } }`.
- **Themes (advanced):** import a `.json` file shaped like `theme-pack-demo.json` — a `themes` object of `{ name, variables, accentColors }` entries, where `variables` are the CSS custom properties defined in `style.css`.

## Tech Stack

- HTML / CSS
- Vanilla JavaScript (no build step, no framework)
- [Tone.js](https://tonejs.github.io/) (via CDN) for the metronome's audio

## License

This project is open source and available under the MIT License.
