```scope
QRScanner
QRCode
```

# QR Scanner

Camera-driven QR decoder. Wraps lazy-loaded [`qr-scanner`](https://github.com/nimiq/qr-scanner), manages start / stop state, surfaces permission errors. Used by the import dialog to receive an exported snapshot from another device.

The camera does **not** auto-start — the user clicks the _Start camera_ button to grant permission. This keeps the docs page polite and matches the production UX (the dialog renders the scanner before the user has decided to scan).

```tsx preview
() => {
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState(null);
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
      <QRScanner
        onDecoded={(text) => {
          setDecoded(text);
          setError(null);
        }}
        onError={(err) => setError(err.message)}
        hint="Aim at any QR code."
      />
      <div className="flex flex-col gap-3">
        <h3 className="text-style-eyebrow text-fg-muted">Result</h3>
        {decoded ? (
          <pre className="font-mono text-style-caption text-fg bg-surface border border-border rounded-sm p-3 whitespace-pre-wrap break-all max-h-48 overflow-auto">
            {decoded}
          </pre>
        ) : (
          <p className="text-style-caption text-fg-muted italic">
            Nothing decoded yet — start the camera and point at a QR.
          </p>
        )}
        {error ? <p className="text-style-caption text-fg">Error: {error}</p> : null}
      </div>
    </div>
  );
};
```

## Anatomy

The scanner is a single component that owns its own camera lifecycle internally (`idle` → `starting` → `running` / `error`). Pass `onDecoded` to receive the payload; the scanner stops automatically after a successful decode. Camera access requires HTTPS or `localhost`.

```tsx
import { QRScanner } from "@src/components/primitives/qr-scanner";

const [decoded, setDecoded] = useState<string | null>(null);

<QRScanner
  onDecoded={(text) => setDecoded(text)}
  onError={(err) => console.warn(err)}
  hint="Aim at any QR code."
/>;
```

## Examples

### Live — start camera then aim at a QR

The demo wires the scanner to a result panel so you can verify decoded text. Click _Start camera_, allow access, then point at any QR code (the QR Code component on the previous page works as a test target).

```tsx preview
() => {
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState(null);
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
      <QRScanner
        onDecoded={(text) => {
          setDecoded(text);
          setError(null);
        }}
        onError={(err) => setError(err.message)}
        hint="Aim at any QR code."
      />
      <div className="flex flex-col gap-3">
        <h3 className="text-style-eyebrow text-fg-muted">Result</h3>
        {decoded ? (
          <pre className="font-mono text-style-caption text-fg bg-surface border border-border rounded-sm p-3 whitespace-pre-wrap break-all max-h-48 overflow-auto">
            {decoded}
          </pre>
        ) : (
          <p className="text-style-caption text-fg-muted italic">
            Nothing decoded yet — start the camera and point at a QR.
          </p>
        )}
        {error ? <p className="text-style-caption text-fg">Error: {error}</p> : null}
      </div>
    </div>
  );
};
```

### Pair with a printed code

Render a QR via `QRCode` and aim a phone camera at it to verify the scanner end-to-end without needing a second device.

```tsx preview
<QRCode data="evillious-chronicles · scan-test" size={200} />
```

### Aspect ratio override

`aspectClassName` swaps the default `aspect-square` viewport. Use a wider ratio when the surrounding layout already constrains height.

```tsx
<QRScanner aspectClassName="aspect-video" onDecoded={(t) => console.log(t)} />
```

## Props

### QRScanner

Single component that renders the video preview, the start / stop button, and the inline error surface. Lazy-loads the `qr-scanner` worker on first start, so the worker bundle stays out of the main chunk until a scanner activates.

```json props
[
  {
    "prop": "onDecoded",
    "type": "(text: string) => void",
    "default": "—",
    "description": "Fires once per successful decode. The scanner stops automatically after firing."
  },
  {
    "prop": "onError",
    "type": "(error: Error) => void",
    "default": "—",
    "description": "Optional. Also surfaced inline beneath the video preview."
  },
  {
    "prop": "aspectClassName",
    "type": "string",
    "default": "\"aspect-square\"",
    "description": "Tailwind class for the video container's aspect ratio. Swap for `aspect-video` etc. when the surrounding layout calls for a different shape."
  },
  {
    "prop": "hint",
    "type": "string",
    "default": "—",
    "description": "Helper text rendered next to the start / stop button."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Merged onto the outer flex column."
  }
]
```

## Accessibility

- The button label changes between _Start camera_ / _Starting…_ / _Stop_ so screen-reader users get the current action.
- Errors render as inline text (with a `WarningIcon`) immediately below the video, so they're announced naturally as the surrounding paragraph updates.
- The video is `muted` and `playsInline` — required for autoplay-on-start in mobile browsers, which is what the start button triggers.
- Calls `scanner.destroy()` on unmount; tab-switching or closing the host dialog tears down the camera stream rather than leaving it live until GC.

### Keyboard

```json keyboard
[
  { "keys": ["Tab"], "description": "Moves focus through the start / stop button." },
  { "keys": ["Enter", "Space"], "description": "Activates the focused button (start, then stop)." }
]
```
