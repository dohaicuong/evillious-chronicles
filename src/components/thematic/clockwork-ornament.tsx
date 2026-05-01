import { GearIcon, GearSixIcon } from "@phosphor-icons/react";
import { cn } from "@src/lib/cn";

type Props = {
  size?: number;
  count?: 2 | 3;
  className?: string;
};

/**
 * Decorative cluster of meshing gears for the home / hero areas — purely
 * ornamental (aria-hidden). `count` toggles between a two-gear pair and a
 * three-gear cluster. Neighbors are offset by `(r1 + r2)` from the central
 * gear so their teeth visually touch, and rotate in opposite directions so
 * the cluster reads as a mechanical gear train.
 */
export function ClockworkOrnament({ size = 80, count = 2, className }: Props) {
  const medium = Math.round(size * 0.55);
  const small = Math.round(size * 0.4);

  // Outer radius of the visible gear ≈ icon size / 2.
  const bigR = size / 2;
  const mediumR = medium / 2;
  const smallR = small / 2;

  // Medium gear meshes with the big gear at ~45° down-right.
  const mDist = bigR + mediumR;
  const mDx = mDist * Math.SQRT1_2;
  const mDy = mDist * Math.SQRT1_2;
  const mediumLeft = bigR + mDx - mediumR;
  const mediumTop = bigR + mDy - mediumR;

  // Small gear meshes with the big gear at ~-15° (slightly above horizontal,
  // to the right). Shallow angle so the gear stays inside the bounding box.
  const sDist = bigR + smallR;
  const sAngle = (-15 * Math.PI) / 180;
  const sDx = sDist * Math.cos(sAngle);
  const sDy = sDist * Math.sin(sAngle);
  const smallLeft = bigR + sDx - smallR;
  const smallTop = bigR + sDy - smallR;

  const width = Math.ceil(Math.max(size, mediumLeft + medium, count === 3 ? smallLeft + small : 0));
  const height = Math.ceil(Math.max(size, mediumTop + medium, count === 3 ? smallTop + small : 0));

  return (
    <div
      aria-hidden
      className={cn("relative inline-block text-accent", className)}
      style={{ width, height }}
    >
      <GearSixIcon
        size={size}
        weight="light"
        className="absolute"
        style={{ top: 0, left: 0, animation: "spin 18s linear infinite" }}
      />
      <GearIcon
        size={medium}
        weight="light"
        className="absolute text-accent-strong"
        style={{
          left: Math.round(mediumLeft),
          top: Math.round(mediumTop),
          animation: "spin 12s linear infinite reverse",
        }}
      />
      {count === 3 ? (
        <GearSixIcon
          size={small}
          weight="light"
          className="absolute text-accent-strong"
          style={{
            left: Math.round(smallLeft),
            top: Math.round(smallTop),
            animation: "spin 9s linear infinite reverse",
          }}
        />
      ) : null}
    </div>
  );
}
