import { useEffect, useState } from "react";
import { PlayIcon, StopIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "@src/components/primitives/button";
import { Drawer } from "@src/components/primitives/drawer";
import { IconButton } from "@src/components/primitives/icon-button";
import { ScrollArea } from "@src/components/primitives/scroll-area";

// Temporary auditioning drawer for the Web Speech API. Lets the user hear
// what each available OS voice sounds like before committing to a TTS
// implementation. Drop this file (and the menu entry / mount in app-shell)
// once a decision is made on which engine to ship.

const SAMPLE = [
  "Once upon a time, in a kingdom of gold and brass, there lived a princess who answered to no one.",
  "The clock at the heart of the chronicle ticked on, indifferent to her cruelty.",
  "Even the dead, it is said, must answer for what they buy.",
].join(" ");

export function TtsAuditionDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string>("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  // `speechSynthesis.getVoices()` is async on most browsers — it may return
  // an empty list initially and populate later via `voiceschanged`.
  useEffect(() => {
    if (!supported) return;
    const load = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);
      setVoiceURI((prev) => prev || list.find((v) => v.lang.startsWith("en"))?.voiceURI || "");
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  // Stop playback if the drawer is closed mid-utterance — don't leave the
  // audition leaking through the rest of the app.
  useEffect(() => {
    if (!open && supported) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [open, supported]);

  function play() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(SAMPLE);
    const voice = voices.find((v) => v.voiceURI === voiceURI);
    if (voice) u.voice = voice;
    u.rate = rate;
    u.pitch = pitch;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  }

  function stop() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Popup side="right" className="gap-0 p-0">
          <header className="flex items-center justify-between border-b border-border px-6 py-4">
            <Drawer.Title>TTS audition</Drawer.Title>
            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Close audition"
              onClick={() => onOpenChange(false)}
            >
              <XIcon weight="light" />
            </IconButton>
          </header>

          {!supported ? (
            <p className="px-6 py-6 text-style-body text-fg-muted italic">
              Web Speech API isn't supported in this browser.
            </p>
          ) : (
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 px-6 py-6">
                <section className="flex flex-col gap-2">
                  <span className="text-style-eyebrow text-fg-muted">Sample passage</span>
                  <p className="text-style-body text-fg italic">"{SAMPLE}"</p>
                </section>

                <section className="flex flex-col gap-2">
                  <label
                    htmlFor="tts-voice"
                    className="text-style-eyebrow text-fg-muted flex items-center justify-between"
                  >
                    <span>Voice</span>
                    <span className="text-style-caption normal-case tracking-normal tabular-nums">
                      {voices.length} available
                    </span>
                  </label>
                  <select
                    id="tts-voice"
                    value={voiceURI}
                    onChange={(e) => setVoiceURI(e.target.value)}
                    disabled={voices.length === 0}
                    className="rounded-sm border border-border bg-bg px-2 py-2 text-style-body text-fg"
                  >
                    {voices.length === 0 ? <option value="">No voices installed</option> : null}
                    {voices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} ({v.lang}){v.default ? " · default" : ""}
                      </option>
                    ))}
                  </select>
                </section>

                <section className="flex flex-col gap-2">
                  <label
                    htmlFor="tts-rate"
                    className="text-style-eyebrow text-fg-muted flex items-center justify-between"
                  >
                    <span>Rate</span>
                    <span className="text-style-caption normal-case tracking-normal tabular-nums">
                      {rate.toFixed(2)}×
                    </span>
                  </label>
                  <input
                    id="tts-rate"
                    type="range"
                    min={0.5}
                    max={2}
                    step={0.05}
                    value={rate}
                    onChange={(e) => setRate(Number.parseFloat(e.target.value))}
                  />
                </section>

                <section className="flex flex-col gap-2">
                  <label
                    htmlFor="tts-pitch"
                    className="text-style-eyebrow text-fg-muted flex items-center justify-between"
                  >
                    <span>Pitch</span>
                    <span className="text-style-caption normal-case tracking-normal tabular-nums">
                      {pitch.toFixed(2)}
                    </span>
                  </label>
                  <input
                    id="tts-pitch"
                    type="range"
                    min={0.5}
                    max={2}
                    step={0.05}
                    value={pitch}
                    onChange={(e) => setPitch(Number.parseFloat(e.target.value))}
                  />
                </section>

                <div className="flex gap-2">
                  {speaking ? (
                    <Button variant="secondary" size="sm" onClick={stop}>
                      <StopIcon weight="light" />
                      Stop
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={play}
                      disabled={voices.length === 0}
                    >
                      <PlayIcon weight="light" />
                      Read sample
                    </Button>
                  )}
                </div>

                {voices.length === 0 ? (
                  <p className="text-style-caption text-fg-muted italic">
                    No TTS voices found. On Linux, install <code>speech-dispatcher</code> +{" "}
                    <code>espeak-ng</code> and restart the browser. On iOS / Android / macOS /
                    Windows, voices are usually available out of the box.
                  </p>
                ) : null}
              </div>
            </ScrollArea>
          )}
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer>
  );
}
