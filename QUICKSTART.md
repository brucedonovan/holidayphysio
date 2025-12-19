# 🚀 Quick Start Guide - ACL Holiday Physio

## For Users - Installing on Your Apple Device

### What You Need
- iPhone or iPad with iOS 15 or later
- Safari browser
- Internet connection (only for first install)

### Installation Steps (5 minutes)

1. **Open Safari** on your iPhone/iPad
2. **Go to the app URL** (you'll receive this link)
3. **Wait for it to fully load** (10-15 seconds)
4. **Tap the Share button** (the square with arrow at the bottom)
5. **Scroll down** and tap **"Add to Home Screen"**
6. **Name it** "ACL Physio" (keep it short)
7. **Tap "Add"** in the top right

✅ **Done!** The app is now on your home screen like a normal app.

### After Installation

- **Tap the icon** to open anytime
- **No internet needed** after first load (it's cached)
- **Your progress saves automatically** - no login required
- **Swipe down** to refresh if you want the latest version

## For Developers - Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### 5-Minute Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Go to http://localhost:3000
```

That's it! The app runs on localhost:3000.

### Testing Offline Mode

1. **Build production version:**
   ```bash
   npm run build
   npm start
   ```

2. **Open DevTools** (F12)
3. **Go to:** Application → Service Workers
4. **Check:** "Offline" checkbox
5. **Refresh page** - should still work!

## Deployment (Choose One)

### Option 1: Vercel (Easiest) ⭐

```bash
npm i -g vercel
vercel
```
Follow prompts. Your app is live in 2 minutes with a public URL.

### Option 2: Netlify

```bash
npm run build
npm i -g netlify-cli
netlify deploy --prod --dir=.next
```

### Option 3: Self-Hosted (VPS/Docker)

```bash
npm run build
npm start
# Access via your domain with HTTPS
```

## Important Features

✅ **Offline First** - Works without internet  
✅ **Data Persistence** - Saves to device storage  
✅ **No Login** - Just open and use  
✅ **No Backend** - Pure frontend app  
✅ **Responsive** - Perfect on mobile & tablet  

## File Locations (If You Need to Modify)

| File | Purpose |
|------|---------|
| `app/components/WorkoutTracker.tsx` | Main app interface |
| `lib/workoutData.ts` | All workout exercises & dates |
| `public/manifest.json` | App metadata & icons |
| `public/sw.js` | Offline service worker |
| `app/layout.tsx` | Page structure & metadata |

## Workout Data Format

To add/edit exercises, modify `lib/workoutData.ts`:

```typescript
{
  id: 'unique-id',           // Unique identifier
  name: 'Exercise Name',     // Display name
  sets: '3',                 // Number of sets
  reps: '10',                // Reps or duration
  duration: '30s',           // Time duration
  notes: 'Optional tip'      // Extra guidance
}
```

## Styling (Tailwind CSS)

Colors are defined in `WorkoutTracker.tsx`:

```typescript
const getTypeColor = (type: string) => {
  switch (type) {
    case 'full': return 'from-blue-500 to-blue-600';      // Full strength
    case 'light': return 'from-green-500 to-green-600';   // Light control
    case 'rest': return 'from-slate-400 to-slate-500';    // Rest days
    case 'optional': return 'from-amber-500 to-amber-600'; // Optional
  }
};
```

Change hex colors or use different Tailwind classes.

## PWA Manifest

Customize app appearance in `public/manifest.json`:

```json
{
  "name": "ACL Holiday Physio",
  "short_name": "Physio Tracker",
  "theme_color": "#3b82f6"
}
```

## Troubleshooting

**Q: App won't install on iOS?**  
A: Must be HTTPS (not HTTP). Localhost works for testing.

**Q: Data disappeared?**  
A: Check browser console. localStorage might be disabled (private mode).

**Q: Want to force update?**  
A: Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows).

**Q: How do I clear my progress?**  
A: Safari → Settings → Clear History and Website Data

## Commands Reference

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Check for code issues
```

## Next Steps

1. ✅ Install on your Apple device
2. ✅ Start tracking your workouts
3. ✅ Share feedback or request features
4. ✅ Enjoy your recovery! 💪

---

**Need Help?** Check the full README_PWA.md for detailed documentation.
