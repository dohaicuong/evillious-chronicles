import {
  BedIcon,
  CoinsIcon,
  CrownIcon,
  EyeIcon,
  ForkKnifeIcon,
  MaskHappyIcon,
  ScissorsIcon,
} from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import type { Sin } from "@src/data/schema";

const map = {
  pride: CrownIcon,
  lust: MaskHappyIcon,
  sloth: BedIcon,
  gluttony: ForkKnifeIcon,
  greed: CoinsIcon,
  wrath: ScissorsIcon,
  envy: EyeIcon,
} as const;

type Props = { sin: Sin } & Omit<ComponentProps<typeof CrownIcon>, "ref">;

export function SinGlyph({ sin, ...props }: Props) {
  const Icon = map[sin];
  return <Icon {...props} />;
}
