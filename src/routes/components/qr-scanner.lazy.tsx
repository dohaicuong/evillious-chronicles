import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QRCode } from "@src/components/primitives/qr-code";
import { QRScanner } from "@src/components/primitives/qr-scanner";

export const Route = createLazyFileRoute("/components/qr-scanner")({
  component: QrScannerPage,
});

function QrScannerPage() {
  const [decoded, setDecoded] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">QR Scanner</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Camera-driven QR decoder. Wraps lazy-loaded <code>qr-scanner</code>, manages start/stop
          state, surfaces permission errors. Used by the import dialog to receive an exported
          snapshot from another device.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Live</h2>
        <p className="text-style-caption text-fg-muted">
          Click <em>Start camera</em>, then point at any QR code. Decoded text appears below. Camera
          access requires HTTPS or <code>localhost</code>.
        </p>
        <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
          <QRScanner
            onDecoded={(text) => {
              setDecoded(text);
              setErrorMessage(null);
            }}
            onError={(err) => setErrorMessage(err.message)}
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
            {errorMessage ? (
              <p className="text-style-caption text-fg">Error: {errorMessage}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Pair with a printed code</h2>
        <p className="text-style-caption text-fg-muted">
          Render a QR from <code>QRCode</code> and aim a phone camera at it to verify the scanner
          end-to-end without needing a second device.
        </p>
        <QRCode data="evillious-chronicles · scan-test" size={200} />
      </section>
    </div>
  );
}
