import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QRCode } from "@src/components/primitives/qr-code";

export const Route = createLazyFileRoute("/components/qr-code")({
  component: QrCodePage,
});

const sins = ["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy", "origin"] as const;

function QrCodePage() {
  const [text, setText] = useState("https://theevilliouschronicles.fandom.com/");

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">QR Code</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Encodes a string to a PNG QR code via lazy-loaded <code>qrcode</code>. Used by the export
          dialog to render a snapshot scannable from another device.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Live</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Anything to encode"
            className="bg-surface border border-border rounded-sm px-3 py-2 text-style-body text-fg max-w-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
          />
          <QRCode data={text || " "} size={192} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Sizes</h2>
        <div className="flex flex-wrap items-end gap-6">
          {[96, 160, 256].map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <QRCode data="evillious-chronicles" size={size} />
              <span className="text-style-caption text-fg-muted">{size}px</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Error correction levels</h2>
        <p className="text-style-caption text-fg-muted">
          Higher levels survive damage / glare better but cost capacity.
        </p>
        <div className="flex flex-wrap items-end gap-6">
          {(["L", "M", "Q", "H"] as const).map((level) => (
            <div key={level} className="flex flex-col items-center gap-2">
              <QRCode data="evillious-chronicles" size={160} errorCorrection={level} />
              <span className="text-style-caption text-fg-muted">Level {level}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Fallback</h2>
        <p className="text-style-caption text-fg-muted">
          A payload too large for QR Version 40 returns the supplied fallback instead of an image.
        </p>
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
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">In a sin theme</h2>
        <p className="text-style-caption text-fg-muted">
          The QR itself is monochrome black on white (scanner contrast); the surrounding container
          inherits the sin theme.
        </p>
        <div className="grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          {sins.slice(0, 4).map((sin) => (
            <div key={sin} data-sin={sin} className="flex flex-col items-center gap-2 p-3">
              <QRCode data={`sin:${sin}`} size={120} />
              <span className="text-style-caption text-fg-muted capitalize">{sin}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
