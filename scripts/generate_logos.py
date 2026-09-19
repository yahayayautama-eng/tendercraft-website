import os

def create_logos():
    os.makedirs('public/brand', exist_ok=True)
    os.makedirs('src/app', exist_ok=True)

    # 1. Standalone TC Symbol (ViewBox 0 0 120 100)
    # Scaled and centered from the concept:
    # Top ribbon: X: 16 to 82, Y: 14 to 34 (45 deg slant on left: (16,34) to (36,14))
    # Top-right fold: outer curve from (82,14) down to (106,38) then inward to (90,52)
    # Stem: X: 36 to 54, Y: 34 to 64
    # Bottom curve: outer radius at bottom-left from (36,64) curving down to (62,88)
    # Bottom sweep: from (62,72) to (104,72) and (62,88) to (104,88)

    mark_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" fill="none" aria-label="Tendercraft symbol">
  <defs>
    <linearGradient id="tc-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0055FF" />
      <stop offset="100%" stop-color="#0042D9" />
    </linearGradient>
    <linearGradient id="tc-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141B2D" />
      <stop offset="100%" stop-color="#0B101D" />
    </linearGradient>
  </defs>

  <!-- Top Ribbon: Horizontal blue bar with angled left terminal -->
  <path d="M 16 34 L 36 14 L 84 14 C 94 14 102 20 105 30 L 86 30 C 84 26 80 24 76 24 L 38 24 L 28 34 Z" fill="url(#tc-blue)" />

  <!-- Top-Right 3D Turnaround Fold: Dark graphite ribbon bending inward -->
  <path d="M 84 14 C 97 14 106 23 106 36 L 106 48 C 106 50 103 51 101 49 L 91 38 C 90 31 86 24 76 24 L 84 14 Z" fill="url(#tc-dark)" />

  <!-- Central Stem & Bottom-Left Arch: Dark graphite foundation -->
  <path d="M 36 34 L 54 34 L 54 62 C 54 68 58 72 65 72 L 68 72 L 68 86 L 62 86 C 47 86 36 76 36 62 Z" fill="#0B101D" />

  <!-- Bottom Ribbon: Sweeping electric cobalt horizontal bar -->
  <path d="M 54 62 C 54 68 58 72 65 72 L 104 72 C 105.5 72 106 73 106 74.5 L 106 83.5 C 106 85 105.5 86 104 86 L 62 86 C 56 86 52 82 50 78 C 53 70 54 64 54 62 Z" fill="url(#tc-blue)" />
</svg>'''

    with open('public/brand/tendercraft-mark.svg', 'w') as f:
        f.write(mark_svg)

    # Also save as app icon (src/app/icon.svg)
    with open('src/app/icon.svg', 'w') as f:
        f.write(mark_svg)

    # 2. Horizontal Lockup for Light Backgrounds (Wordmark #0C131E)
    lockup_light = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 100" fill="none" aria-label="Tendercraft">
  <defs>
    <linearGradient id="tc-blue-l" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0055FF" />
      <stop offset="100%" stop-color="#0042D9" />
    </linearGradient>
    <linearGradient id="tc-dark-l" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141B2D" />
      <stop offset="100%" stop-color="#0B101D" />
    </linearGradient>
  </defs>

  <!-- Mark (Scaled to 100x100 box at left) -->
  <g transform="translate(0, 0)">
    <path d="M 16 34 L 36 14 L 84 14 C 94 14 102 20 105 30 L 86 30 C 84 26 80 24 76 24 L 38 24 L 28 34 Z" fill="url(#tc-blue-l)" />
    <path d="M 84 14 C 97 14 106 23 106 36 L 106 48 C 106 50 103 51 101 49 L 91 38 C 90 31 86 24 76 24 L 84 14 Z" fill="url(#tc-dark-l)" />
    <path d="M 36 34 L 54 34 L 54 62 C 54 68 58 72 65 72 L 68 72 L 68 86 L 62 86 C 47 86 36 76 36 62 Z" fill="#0B101D" />
    <path d="M 54 62 C 54 68 58 72 65 72 L 104 72 C 105.5 72 106 73 106 74.5 L 106 83.5 C 106 85 105.5 86 104 86 L 62 86 C 56 86 52 82 50 78 C 53 70 54 64 54 62 Z" fill="url(#tc-blue-l)" />
  </g>

  <!-- Exact Wordmark: TENDERCRAFT -->
  <text x="126" y="63" fill="#0B101D" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', system-ui, sans-serif" font-size="39" font-weight="800" letter-spacing="2.8">TENDERCRAFT</text>
</svg>'''

    with open('public/brand/tendercraft-logo-light.svg', 'w') as f:
        f.write(lockup_light)

    # 3. Horizontal Lockup for Dark Backgrounds (Wordmark #FFFFFF)
    lockup_dark = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 100" fill="none" aria-label="Tendercraft">
  <defs>
    <linearGradient id="tc-blue-d" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3377FF" />
      <stop offset="100%" stop-color="#0055FF" />
    </linearGradient>
    <linearGradient id="tc-dark-d" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D3748" />
      <stop offset="100%" stop-color="#1A202C" />
    </linearGradient>
  </defs>

  <!-- Mark -->
  <g transform="translate(0, 0)">
    <path d="M 16 34 L 36 14 L 84 14 C 94 14 102 20 105 30 L 86 30 C 84 26 80 24 76 24 L 38 24 L 28 34 Z" fill="url(#tc-blue-d)" />
    <path d="M 84 14 C 97 14 106 23 106 36 L 106 48 C 106 50 103 51 101 49 L 91 38 C 90 31 86 24 76 24 L 84 14 Z" fill="url(#tc-dark-d)" />
    <path d="M 36 34 L 54 34 L 54 62 C 54 68 58 72 65 72 L 68 72 L 68 86 L 62 86 C 47 86 36 76 36 62 Z" fill="#E2E8F0" />
    <path d="M 54 62 C 54 68 58 72 65 72 L 104 72 C 105.5 72 106 73 106 74.5 L 106 83.5 C 106 85 105.5 86 104 86 L 62 86 C 56 86 52 82 50 78 C 53 70 54 64 54 62 Z" fill="url(#tc-blue-d)" />
  </g>

  <!-- Wordmark in pure white -->
  <text x="126" y="63" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', system-ui, sans-serif" font-size="39" font-weight="800" letter-spacing="2.8">TENDERCRAFT</text>
</svg>'''

    with open('public/brand/tendercraft-logo-dark.svg', 'w') as f:
        f.write(lockup_dark)

    # 4. Monochrome Black Lockup
    mono_black = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 100" fill="none" aria-label="Tendercraft">
  <g transform="translate(0, 0)">
    <path d="M 16 34 L 36 14 L 84 14 C 94 14 102 20 105 30 L 86 30 C 84 26 80 24 76 24 L 38 24 L 28 34 Z" fill="#000000" />
    <path d="M 84 14 C 97 14 106 23 106 36 L 106 48 C 106 50 103 51 101 49 L 91 38 C 90 31 86 24 76 24 L 84 14 Z" fill="#000000" opacity="0.75" />
    <path d="M 36 34 L 54 34 L 54 62 C 54 68 58 72 65 72 L 68 72 L 68 86 L 62 86 C 47 86 36 76 36 62 Z" fill="#000000" />
    <path d="M 54 62 C 54 68 58 72 65 72 L 104 72 C 105.5 72 106 73 106 74.5 L 106 83.5 C 106 85 105.5 86 104 86 L 62 86 C 56 86 52 82 50 78 C 53 70 54 64 54 62 Z" fill="#000000" />
  </g>
  <text x="126" y="63" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', system-ui, sans-serif" font-size="39" font-weight="800" letter-spacing="2.8">TENDERCRAFT</text>
</svg>'''

    with open('public/brand/tendercraft-logo-mono-black.svg', 'w') as f:
        f.write(mono_black)

    # 5. Monochrome White Lockup
    mono_white = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 100" fill="none" aria-label="Tendercraft">
  <g transform="translate(0, 0)">
    <path d="M 16 34 L 36 14 L 84 14 C 94 14 102 20 105 30 L 86 30 C 84 26 80 24 76 24 L 38 24 L 28 34 Z" fill="#FFFFFF" />
    <path d="M 84 14 C 97 14 106 23 106 36 L 106 48 C 106 50 103 51 101 49 L 91 38 C 90 31 86 24 76 24 L 84 14 Z" fill="#FFFFFF" opacity="0.65" />
    <path d="M 36 34 L 54 34 L 54 62 C 54 68 58 72 65 72 L 68 72 L 68 86 L 62 86 C 47 86 36 76 36 62 Z" fill="#FFFFFF" />
    <path d="M 54 62 C 54 68 58 72 65 72 L 104 72 C 105.5 72 106 73 106 74.5 L 106 83.5 C 106 85 105.5 86 104 86 L 62 86 C 56 86 52 82 50 78 C 53 70 54 64 54 62 Z" fill="#FFFFFF" />
  </g>
  <text x="126" y="63" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', system-ui, sans-serif" font-size="39" font-weight="800" letter-spacing="2.8">TENDERCRAFT</text>
</svg>'''

    with open('public/brand/tendercraft-logo-mono-white.svg', 'w') as f:
        f.write(mono_white)

    print("All SVG logos created successfully.")

if __name__ == '__main__':
    create_logos()
