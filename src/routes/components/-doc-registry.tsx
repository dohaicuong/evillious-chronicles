import { useState } from "react";
import {
  ArrowSquareOutIcon,
  BookOpenIcon,
  BookmarkSimpleIcon,
  CaretRightIcon,
  GearIcon,
  HouseIcon,
  HourglassIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  NoteIcon,
  PauseIcon,
  PlayIcon,
  SunIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Badge } from "@src/components/primitives/badge";
import { Button } from "@src/components/primitives/button";
import { Card } from "@src/components/primitives/card";
import { Code } from "@src/components/primitives/code";
import { IconButton } from "@src/components/primitives/icon-button";
import { Input } from "@src/components/primitives/input";
import { ExternalLink, Link } from "@src/components/primitives/link";
import { Menu } from "@src/components/primitives/menu";
import { Pagination } from "@src/components/primitives/pagination";
import { Progress } from "@src/components/primitives/progress";
import { QRCode } from "@src/components/primitives/qr-code";
import { QRScanner } from "@src/components/primitives/qr-scanner";
import { ScrollArea } from "@src/components/primitives/scroll-area";
import { Skeleton } from "@src/components/primitives/skeleton";
import { Slider } from "@src/components/primitives/slider";
import { Switch } from "@src/components/primitives/switch";
import { Tabs } from "@src/components/primitives/tabs";
import { Tooltip } from "@src/components/primitives/tooltip";
import type { DocScope } from "@src/components/docs/component-doc";

// Live previews can't host hooks (react-live wraps the code in a fragment, not
// a function component), so controlled primitives need stateful host components
// the markdown can drop in directly via `scope`.

function PaginationDemo({
  pageCount,
  initialPage,
  siblings,
  size,
}: {
  pageCount: number;
  initialPage: number;
  siblings?: number;
  size?: "sm" | "md" | "lg";
}) {
  const [page, setPage] = useState(initialPage);
  return (
    <Pagination
      page={page}
      pageCount={pageCount}
      onPageChange={setPage}
      siblings={siblings}
      size={size}
    />
  );
}

function QRScannerDemo() {
  const [decoded, setDecoded] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
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
        {errorMessage ? <p className="text-style-caption text-fg">Error: {errorMessage}</p> : null}
      </div>
    </div>
  );
}

// The full pool of identifiers any component-doc markdown is allowed to use
// inside `tsx preview` blocks. Each markdown declares its own subset via a
// top-of-file ```scope ... ``` fence; <ComponentDoc> narrows this pool to
// that subset before passing to react-live.
//
// Adding a new component doc:
//   1. Drop the markdown under `public/design-system/components/<slug>.md`
//      with a leading ```scope ... ``` listing the identifiers it uses.
//   2. If those identifiers aren't already imported here, add them.
export const docPool: DocScope = {
  // Primitives
  Badge,
  Button,
  Card,
  Code,
  ExternalLink,
  IconButton,
  Input,
  Link,
  Menu,
  Pagination,
  Progress,
  QRCode,
  QRScanner,
  ScrollArea,
  Skeleton,
  Slider,
  Switch,
  Tabs,
  Tooltip,
  // Phosphor icons used by previews
  ArrowSquareOutIcon,
  BookOpenIcon,
  BookmarkSimpleIcon,
  CaretRightIcon,
  GearIcon,
  HouseIcon,
  HourglassIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  NoteIcon,
  PauseIcon,
  PlayIcon,
  SunIcon,
  XIcon,
  // Stateful demo wrappers (live previews can't host hooks)
  PaginationDemo,
  QRScannerDemo,
};
