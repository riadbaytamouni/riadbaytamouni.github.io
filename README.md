# Riad Baytamouni — Portfolio

Personal portfolio website: bilingual **English / Arabic (full RTL)**.

**Live:** https://riadbaytamouni.github.io

## Editing

- `index.html` is the source: layout + English text.
- The Arabic page `ar/index.html` is **generated**. After any change to `index.html`, run:

  ```
  node tools/build-ar.mjs
  ```

  Arabic strings live in `tools/build-ar.mjs`. The build fails if a key is missing on either side.
- Open content gaps are listed in [TODO.md](TODO.md).
