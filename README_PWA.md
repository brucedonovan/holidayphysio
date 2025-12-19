# ACL Holiday Physio - PWA Workout Tracker

A beautiful, offline-capable Progressive Web App (PWA) designed for tracking your ACL rehabilitation exercises on Apple devices during the holiday period (Dec 21 - Jan 3).

## Features

✨ **Progressive Web App (PWA)**
- Works offline - all data is cached locally
- Install directly on your home screen (iPhone/iPad)
- Looks and feels like a native app
- Full app experience without App Store

📱 **Apple Device Optimized**
- Designed for iPad and iPhone
- Notch & Safe Area support
- Native-like status bar integration
- Touch-optimized interface

✅ **Smart Workout Tracking**
- Track your daily exercises
- Check off completed exercises
- Visual progress indicator
- Color-coded workout types (Full Strength, Light Control, Rest Days)

💾 **Persistent Data**
- Your progress is automatically saved
- Syncs across all sessions
- Never lose your workout history

🎨 **Beautiful UI**
- Built with Tailwind CSS + TailwindUI Plus components
- Clean, modern design
- Easy-to-read exercise cards with clear instructions
- Real-time progress calculations

📅 **Date Navigation**
- Easy navigation between workout days
- "Today" button for quick access
- Full 2-week plan loaded

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - Navigate to `http://localhost:3000`
   - On iPhone/iPad: Open in Safari
   - Desktop: Use Chrome DevTools device emulation

### Testing Service Worker Offline Mode

1. Build the app: `npm run build`
2. Start production server: `npm start`
3. Open DevTools (F12 or Cmd+Option+I)
4. Go to Application → Service Workers
5. Check "Offline" to simulate offline mode
6. App should still work normally!

## Installation on Apple Devices

### iPhone / iPad (iOS 15+)

1. **Open in Safari**
   - Navigate to your deployed app URL
   - Make sure it's served over HTTPS

2. **Install as App**
   - Tap the Share button (square with arrow)
   - Scroll down and tap "Add to Home Screen"
   - Name it "ACL Physio" (or your preference)
   - Tap "Add"

3. **The app is now on your home screen!**
   - Tap to launch
   - Works offline automatically
   - Data persists between sessions

### Android (Similar Process)
1. Open in Chrome
2. Tap menu (three dots)
3. Tap "Install app"
4. Confirm installation

## Usage Guide

### Daily Workflow

1. **Open the app** - It remembers where you left off
2. **View today's workout** - Top card shows current session
3. **Check off exercises** - Tap each exercise as you complete it
4. **Track progress** - Completion percentage updates in real-time
5. **Navigate** - Use Previous/Next to plan ahead or review past sessions

### Exercise Information

Each exercise card shows:
- **Exercise name** - Clear, descriptive
- **Sets/Reps** - Gray badge with set information
- **Reps/Duration** - Blue badge with rep ranges or time
- **Duration** - Purple badge with timing information
- **Notes** - Tips and optional progressions

### Workout Types

- **🔵 Full Strength** (Blue) - 30-35 min comprehensive session
- **🟢 Light Control** (Green) - 20-25 min lighter workout
- **⚪ Rest Day** (Gray) - Recovery or optional mobility
- **🟠 Optional** (Amber) - Only if you're feeling fresh

### Important Notes

⚠️ **Safety First:**
- No swelling the following day = appropriate load
- Mild stiffness is normal
- Stop if instability, sharp pain, or catching occurs
- Consistency matters more than perfection

## Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps with PWA support:

1. **Push to GitHub** (if not already):
   ```bash
   git remote add origin <your-repo-url>
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Your app is live!**
   - Get a public URL
   - Share with others or install on your devices
   - All PWA features work automatically

### Other Deployment Options

**Netlify:**
```bash
npm run build
# Then deploy the .next folder or use Netlify CLI
```

**Self-hosted (Docker/VPS):**
```bash
npm run build
npm start
# Access on your domain with HTTPS
```

## Tech Stack

- **Framework:** Next.js 16.1
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **PWA:** Service Worker + Web Manifest
- **State:** React Hooks + localStorage

## File Structure

```
├── app/
│   ├── components/
│   │   ├── WorkoutTracker.tsx    # Main tracker component
│   │   └── ServiceWorkerRegister.tsx  # PWA registration
│   ├── layout.tsx                # App layout & metadata
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── lib/
│   └── workoutData.ts            # All workout plan data
├── public/
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service Worker
├── package.json
└── next.config.ts
```

## Customization

### Modify Workout Plan

Edit `/lib/workoutData.ts` to:
- Add/remove exercises
- Change dates
- Modify sets/reps
- Add personal notes

### Styling

- Colors are in the `WorkoutTracker.tsx` component
- Tailwind classes control all styling
- Modify gradient colors: `getTypeColor()` function
- Safe Area padding for notch support

### Metadata

Edit `/public/manifest.json` to:
- Change app name
- Update colors
- Modify icons
- Add screenshots

## Browser Support

- **iOS:** Safari 15+ (PWA support)
- **Android:** Chrome 90+ (PWA support)
- **Desktop:** All modern browsers (Chrome, Safari, Firefox, Edge)

## Performance

- **First Load:** ~100KB gzipped
- **Offline:** Instant load from cache
- **Install Size:** ~2-5MB on device
- **Updates:** Auto-checks for new versions

## Troubleshooting

### App not installing on iOS?

1. ✅ Must be HTTPS (localhost works for dev)
2. ✅ Manifest.json must be valid
3. ✅ App name must be under 12 characters for full display
4. ✅ Icon must be PNG or JPG (not SVG on some iOS versions)

### Service Worker not updating?

1. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. Clear Safari cache: Settings → Safari → Clear History and Website Data
3. Uninstall and reinstall the app

### Data not persisting?

1. Check browser console for errors
2. Ensure localStorage is enabled (not in private mode)
3. Try clearing site data and reinstalling

## License

MIT - Feel free to use and modify for your needs

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review service worker logs in DevTools
3. Verify manifest.json is valid at `/manifest.json`

---

**Made with 💪 for your ACL recovery journey!**
