import { cn } from "@/lib/utils";

/**
 * Theme-aware LSGZ logo.
 *
 * - Light mode: black stroke (logo-black.png)
 * - Dark mode:  white stroke (logo-white.png)
 *
 * Both files are transparent PNGs exported from the user's source SVGs,
 * so there's no need for CSS `invert` tricks — each asset is authored
 * in its final color. The `dark:` variant hides/shows the right image
 * via Tailwind (which is driven by the site's `class="dark"` theme
 * strategy, not just OS preference, so manual theme toggle works too).
 */
export function Logo({
  className,
  size = 28,
  alt = "LSGZ logo",
}: {
  className?: string;
  size?: number;
  alt?: string;
}) {
  return (
    <>
      {/* Light mode: black mark */}
      <img
        src="/logo-black.png"
        alt={alt}
        width={size}
        height={size}
        className={cn("block h-auto w-full object-contain dark:hidden", className)}
        draggable={false}
      />
      {/* Dark mode: white mark */}
      <img
        src="/logo-white.png"
        alt={alt}
        width={size}
        height={size}
        className={cn("hidden h-auto w-full object-contain dark:block", className)}
        draggable={false}
      />
    </>
  );
}
