// iOS-specific PWA enhancements for safe area and notch support
// This is already handled in WorkoutTracker.tsx but here are the key considerations:

/*
  VIEWPORT META TAG (in layout.tsx):
  ✓ width=device-width - Responsive on all screen sizes
  ✓ initial-scale=1 - Starts at 100% zoom
  ✓ maximum-scale=1 - Prevents zoom (common in health apps)
  ✓ user-scalable=no - Lockdown for consistent UX
  ✓ viewport-fit=cover - Enable safe area (notch support)

  STATUS BAR (in metadata):
  ✓ statusBarStyle: "black-translucent" - Dark status bar for blue header

  SAFE AREA SUPPORT:
  ✓ Padding applied to headers and footers
  ✓ Bottom navigation uses safe area automatically

  ICON REQUIREMENTS:
  ✓ 192x192px minimum (for home screen icon)
  ✓ 512x512px recommended (for splash screen)
  ✓ Using SVG with emoji fallback (cross-compatible)

  DATA PERSISTENCE:
  ✓ localStorage API (persistent across app launches)
  ✓ Data saved to device keychain equivalent on iOS
  ✓ Survives app closure and device restart

  OFFLINE CAPABILITY:
  ✓ Service Worker caches all static assets
  ✓ App shell cached on first visit
  ✓ Works fully offline after first load
  ✓ Updates checked on each app start

  TOUCH OPTIMIZATION:
  ✓ Min touch target size: 44x44px (Apple guidelines)
  ✓ No hover states (not applicable on touch devices)
  ✓ Active/pressed states for feedback
  ✓ Smooth animations (60fps on iOS)

  PERFORMANCE:
  ✓ Code splitting (automatic with Next.js)
  ✓ Image optimization (no images used currently)
  ✓ CSS minification (automatic with Tailwind)
  ✓ JavaScript minification (automatic with build)
  ✓ Gzip compression when deployed to Vercel

  TESTING ON iOS:
  1. Use actual device (iPad/iPhone) or Simulator
  2. Safari is required for PWA install
  3. Test in private mode to verify offline works
  4. Check DevTools: Settings → Advanced → Enable Web Inspector
  5. Connect Mac and use Safari Develop menu

  COMMON ISSUES & FIXES:

  Issue: App won't save data
  Fix: Check if in private/incognito mode - localStorage disabled there
  
  Issue: Offline not working
  Fix: Hard refresh, uninstall/reinstall app, check Service Worker in DevTools
  
  Issue: Status bar overlapping content
  Fix: Check viewport-fit=cover is set (it is)
  
  Issue: App closes unexpectedly
  Fix: Check browser console for JavaScript errors
  
  Issue: Slow performance
  Fix: Clear browser cache, update iOS, restart device
*/

import type { Metadata, Viewport } from "next";

// Ensure these are set in app/layout.tsx for full iOS support:
export const mockMetadata: Metadata = {
  title: "ACL Holiday Physio",
  description: "Track your ACL rehabilitation exercises",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ACL Holiday Physio",
  },
  formatDetection: {
    telephone: false,
  },
};

export const mockViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

// PWA Manifest fields explained:
const manifestFields = {
  name: "Full app name (shown during install)",
  short_name: "Home screen name (max 12 chars for full display)",
  description: "App description in app stores",
  start_url: "URL to open when app launched",
  display: "standalone = full-screen app look",
  background_color: "Splash screen background",
  theme_color: "Status bar and UI chrome color",
  orientation: "portrait-primary = portrait only",
  icons: "App icon in multiple sizes",
  screenshots: "Screenshots for app stores",
  categories: "health, fitness, wellness",
};

// Service Worker caching strategy:
const cachingStrategy = `
1. Cache first, fallback to network (for static assets)
2. Always cache successful responses
3. Return offline message if both fail
4. Cache name includes version (easy to bust)
5. Activate cleans up old cache versions

This means:
- First load: Fetch from network, cache it
- Subsequent loads: Use cache, update in background
- Offline: Use cache, show offline page if not cached
- Update: Check for new version on each load
`;

// localStorage data structure:
const dataStructure = `
Key: "checkedExercises"
Value: JSON array of exercise IDs that are checked

Example:
["mobility-1", "toes-heels-1", "glute-iso-1"]

Persistence:
- Automatically saved when user checks an exercise
- Persists across browser sessions
- Survives app closure
- Survives device restart
- Cleared only if user clears browser data
`;

export { mockMetadata, mockViewport };
