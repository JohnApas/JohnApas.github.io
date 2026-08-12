/** Full-page canvas matching a terminal-style GitHub-dark + CRT scanline overlay. */
export function ScanlineBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="scanline-overlay" />
    </div>
  )
}
