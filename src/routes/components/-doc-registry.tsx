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
  MusicNotesIcon,
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
import { Dialog } from "@src/components/primitives/dialog";
import { Drawer } from "@src/components/primitives/drawer";
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
import { useToast } from "@src/components/primitives/toast";
import { SearchDialog } from "@src/components/library/search-dialog";
import { ThemeToggle } from "@src/components/shell/theme-toggle";
import { ClockFace } from "@src/components/thematic/clock-face";
import { ClockworkOrnament } from "@src/components/thematic/clockwork-ornament";
import { ClockworkSpinner } from "@src/components/thematic/clockwork-spinner";
import { Ornament } from "@src/components/thematic/ornament";
import { SinGlyph } from "@src/components/thematic/sin-glyph";
import { Vines } from "@src/components/thematic/vines";
import { useAudio } from "@src/lib/audio";
import type { DocScope } from "@src/components/docs/component-doc";

// The full pool of identifiers any component-doc markdown is allowed to use
// inside `tsx preview` blocks. Each markdown declares its own subset via a
// top-of-file ```scope ... ``` fence; <ComponentDoc> narrows this pool to
// that subset before passing to react-live. Common React hooks (useState,
// useEffect, …) are merged in by <ComponentDoc> and don't need to live here.
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
  Dialog,
  Drawer,
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
  SearchDialog,
  Skeleton,
  Slider,
  Switch,
  Tabs,
  ThemeToggle,
  Tooltip,
  // Thematic
  ClockFace,
  ClockworkOrnament,
  ClockworkSpinner,
  Ornament,
  SinGlyph,
  Vines,
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
  MusicNotesIcon,
  NoteIcon,
  PauseIcon,
  PlayIcon,
  SunIcon,
  XIcon,
  // Doc-specific hooks
  useAudio,
  useToast,
};
