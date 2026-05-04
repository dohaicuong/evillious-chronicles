```scope
QRCode
```

# QR Code

Encodes a string to a PNG QR via a lazy-loaded `qrcode` import. Used by the export dialog so a snapshot can be scanned from another device. The component reserves layout space immediately and swaps in the rendered image once the encoder finishes.

```tsx preview
<QRCode data="https://dohaicuong.github.io/evillious-chronicles/" size={192} />
```

## Anatomy

A pure presentational component. The `qrcode` library is dynamically imported on mount so it stays out of the main bundle until a QR actually renders. While encoding, a same-size empty placeholder reserves the slot to prevent layout shift.

```tsx
import { QRCode } from "@src/components/primitives/qr-code";

<QRCode data="https://example.com" size={192} />;
```

## Examples

### Sizes

The PNG is rendered at the requested pixel size; the wrapper `<img>` matches.

```tsx preview
<div className="flex flex-wrap items-end gap-6">
  {[96, 160, 256].map((size) => (
    <div key={size} className="flex flex-col items-center gap-2">
      <QRCode data="evillious-chronicles" size={size} />
      <span className="text-style-caption text-fg-muted">{size}px</span>
    </div>
  ))}
</div>
```

### Error correction levels

Higher levels survive damage / glare better but cost capacity. `L` is the default; bump to `M` or `Q` for printed codes that may scuff.

```tsx preview
<div className="flex flex-wrap items-end gap-6">
  {["L", "M", "Q", "H"].map((level) => (
    <div key={level} className="flex flex-col items-center gap-2">
      <QRCode data="evillious-chronicles" size={160} errorCorrection={level} />
      <span className="text-style-caption text-fg-muted">Level {level}</span>
    </div>
  ))}
</div>
```

### Long content

QR Version 40 (the largest) caps capacity per error-correction level. Short URLs, IDs, and JSON snippets fit comfortably; book-length payloads do not.

```tsx preview
<div className="flex flex-col items-start gap-2">
  <QRCode data={"x".repeat(800)} size={200} />
  <span className="text-style-caption text-fg-muted">800-char payload</span>
</div>
```

### Fallback for oversized payloads

When the encoder throws (typically: payload exceeds Version 40 capacity), the component renders the `fallback` node instead.

```tsx preview
<div className="max-w-md">
  <QRCode
    data={"x".repeat(5000)}
    size={160}
    fallback={
      <p className="text-style-caption text-fg-muted">
        Payload too large to encode — caller should offer a different transport.
      </p>
    }
  />
</div>
```

### In a sin theme

The QR itself stays monochrome black-on-white (scanner contrast); the surrounding container inherits the sin theme.

```tsx preview
<div className="grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
  {["pride", "lust", "sloth", "gluttony"].map((sin) => (
    <div key={sin} data-sin={sin} className="flex flex-col items-center gap-2 p-3">
      <QRCode data={`sin:${sin}`} size={120} />
      <span className="text-style-caption text-fg-muted capitalize">{sin}</span>
    </div>
  ))}
</div>
```

## Props

### QRCode

Encodes `data` to a PNG data URL via a dynamic `qrcode` import. Returns `fallback` if encoding throws; reserves the slot with an empty placeholder while the encoder runs.

```json props
[
  {
    "prop": "data",
    "type": "string",
    "default": "—",
    "description": "Payload to encode. Re-encodes whenever this changes."
  },
  {
    "prop": "size",
    "type": "number",
    "default": "320",
    "description": "Render size in pixels (the rendered image dimensions match)."
  },
  {
    "prop": "errorCorrection",
    "type": "\"L\" | \"M\" | \"Q\" | \"H\"",
    "default": "\"L\"",
    "description": "Higher levels increase damage tolerance at the cost of capacity. L ≈ 7%, M ≈ 15%, Q ≈ 25%, H ≈ 30% recovery."
  },
  {
    "prop": "margin",
    "type": "number",
    "default": "1",
    "description": "Quiet-zone thickness, in QR modules. Most scanners require ≥ 1; the spec recommends 4."
  },
  {
    "prop": "alt",
    "type": "string",
    "default": "\"QR code\"",
    "description": "Alt text for the rendered `<img>`. Override when the QR encodes a known URL or identifier."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Merged onto the rendered `<img>` (and the placeholder div before encoding completes)."
  },
  {
    "prop": "fallback",
    "type": "ReactNode",
    "default": "null",
    "description": "Rendered when the encoder throws (typically: payload too large for Version 40 at the chosen error-correction level)."
  }
]
```
