import {
  AppleLogoIcon,
  BedIcon,
  CoinsIcon,
  CrosshairIcon,
  CrownIcon,
  ForkKnifeIcon,
  MaskHappyIcon,
  ScissorsIcon,
} from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import type { Sin } from "@src/lib/schema";

const map = {
  pride: CrownIcon,
  lust: MaskHappyIcon,
  sloth: BedIcon,
  gluttony: ForkKnifeIcon,
  greed: CoinsIcon,
  // Phosphor doesn't ship a gun/pistol — Crosshair stands in for the muzzle
  // / gunsight semantics of "Muzzle of Nemesis" while staying recognisable.
  wrath: CrosshairIcon,
  // Enbizaka's tailor wields cursed scissors — direct vessel reference.
  envy: ScissorsIcon,
  origin: AppleLogoIcon, // Eve and the apple — original sin
} as const;

type Props = { sin: Sin } & Omit<ComponentProps<typeof CrownIcon>, "ref">;

export function SinGlyph({ sin, ...props }: Props) {
  const Icon = map[sin];
  return <Icon {...props} />;
}
