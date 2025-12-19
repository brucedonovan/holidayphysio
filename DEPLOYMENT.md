# Deployment Guide - ACL Holiday Physio PWA

Choose your preferred deployment method below:

## 🚀 Option 1: Vercel (Recommended - Easiest)

### Why Vercel?
- ✅ Built for Next.js (creators of Next.js own Vercel)
- ✅ Automatic HTTPS (required for PWA)
- ✅ Zero configuration needed
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ PWA features work out of the box
- ✅ ~5 minute setup

### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd /Users/brucedonovan/dev25/holidayphysio
   vercel
   ```

3. **Answer prompts:**
   - ? Set up and deploy? → Yes
   - ? Which scope? → Your account
   - ? Link to existing project? → No
   - ? Project name? → holidayphysio (or your choice)
   - ? Directory? → ./

4. **Done!** You'll get a URL like `https://holidayphysio-xxx.vercel.app`

5. **Automatic updates:**
   - Push to GitHub
   - Vercel auto-deploys
   - No manual steps needed

---

## 🌐 Option 2: Netlify

### Why Netlify?
- ✅ Good Next.js support
- ✅ Easy drag-and-drop deployment
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Good performance
- ✅ ~10 minute setup

### Steps:

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod --dir=.next
   ```

4. **Link your GitHub (optional):**
   - Go to netlify.com
   - Create account
   - Connect GitHub repo
   - Auto-deploy on git push

---

## 🐳 Option 3: Docker + Self-Hosted (VPS)

### Why Self-Hosted?
- ✅ Full control
- ✅ Can customize everything
- ✅ Use existing servers
- ✅ No vendor lock-in

### Prerequisites:
- VPS/Server with Docker installed
- Domain name with HTTPS certificate
- SSH access to server

### Steps:

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY .next ./
   COPY public ./public
   EXPOSE 3000
   CMD ["node_modules/.bin/next", "start"]
   ```

2. **Build Docker image:**
   ```bash
   npm run build
   docker build -t acl-physio .
   ```

3. **Push to your server:**
   ```bash
   docker tag acl-physio myregistry/acl-physio
   docker push myregistry/acl-physio
   ```

4. **Run on server:**
   ```bash
   docker run -p 3000:3000 myregistry/acl-physio
   ```

5. **Setup reverse proxy (Nginx):**
   ```nginx
   server {
     listen 443 ssl http2;
     server_name yourapp.com;
     
     ssl_certificate /path/to/cert;
     ssl_certificate_key /path/to/key;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```

---

## 🔧 Option 4: Traditional Hosting (Shared/VPS)

### Why?
- ✅ Familiar hosting providers
- ✅ Cheap and reliable
- ✅ Supports Node.js

### Steps:

1. **Build:**
   ```bash
   npm run build
   ```

2. **Create `server.js`:**
   ```javascript
   require('dotenv').config()
   const { createServer } = require('http')
   const { parse } = require('url')
   const next = require('next')
   
   const dev = process.env.NODE_ENV !== 'production'
   const app = next({ dev })
   const handle = app.getRequestHandler()
   
   app.prepare().then(() => {
     createServer((req, res) => {
       const parsedUrl = parse(req.url, true)
       handle(req, res, parsedUrl)
     }).listen(3000, (err) => {
       if (err) throw err
       console.log('Ready on http://localhost:3000')
     })
   })
   ```

3. **Upload to hosting:**
   - Via FTP or Git
   - Upload `.next/`, `node_modules/`, `public/`, `package.json`

4. **Configure hosting:**
   - Enable Node.js
   - Set entry point to `server.js`
   - Enable HTTPS

---

## 📊 Deployment Comparison

| Feature | Vercel | Netlify | Docker | Hosting |
|---------|--------|---------|--------|---------|
| **Ease** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Cost** | Free | Free | ~$5/mo | $3-10/mo |
| **HTTPS** | Auto | Auto | Manual | Included |
| **Performance** | Excellent | Good | Very Good | Good |
| **Scaling** | Auto | Auto | Manual | Limited |
| **Setup Time** | 5 min | 10 min | 20 min | 30 min |
| **Best for** | Beginners | Developers | Professional | Budget |

---

## ✅ Post-Deployment Checklist

After deployment, verify everything works:

- [ ] App loads and displays exercises
- [ ] Offline mode works (test in DevTools)
- [ ] Service Worker installed (DevTools → Application)
- [ ] Manifest.json accessible at `/manifest.json`
- [ ] Can install on home screen (iOS/Android)
- [ ] Checkboxes save correctly
- [ ] Navigation between days works
- [ ] No console errors
- [ ] Performance is good (Lighthouse 90+)

### Quick Test Commands:
```bash
# Check if deployed app is accessible
curl https://your-app-url.com

# Check service worker registration
curl https://your-app-url.com/sw.js

# Check manifest
curl https://your-app-url.com/manifest.json
```

---

## 🐛 Troubleshooting

### App won't load
- [ ] Check HTTPS is working
- [ ] Check Node.js is running
- [ ] Check port 3000 is open (if self-hosted)
- [ ] Check logs for errors

### PWA won't install
- [ ] Must be HTTPS (not HTTP)
- [ ] manifest.json must be valid
- [ ] Check manifest.json path is correct
- [ ] Try different browser

### Service Worker issues
- [ ] Hard refresh (Cmd+Shift+R)
- [ ] Check `sw.js` file exists
- [ ] Check browser console for errors
- [ ] Try uninstalling and reinstalling

### Offline not working
- [ ] Check service worker registered
- [ ] Check cache storage in DevTools
- [ ] Try clearing site data
- [ ] Check network tab in DevTools

---

## 📱 iOS Installation (After Deployment)

1. **Share the link** with your iOS device
2. **Open in Safari** (must be Safari for PWA)
3. **Tap Share** (square with arrow)
4. **Tap "Add to Home Screen"**
5. **Name it** "ACL Physio"
6. **Tap "Add"**
7. **Done!** App is on your home screen

---

## 🔐 Security Checklist

- [ ] Using HTTPS (required)
- [ ] Manifest.json is valid JSON
- [ ] No API keys in code
- [ ] No sensitive data in localStorage
- [ ] Service Worker has no vulnerabilities
- [ ] Headers are properly set

---

## 📈 Monitoring (After Deployment)

### Check app health:
```bash
# Test endpoint
curl -I https://your-app-url.com

# Check response time
time curl https://your-app-url.com

# Monitor logs
# (Vercel/Netlify dashboards have built-in logging)
```

---

## 🎉 You're Live!

Your PWA is now accessible to anyone with the URL. 

**Share the link with:**
- 📱 Family/friends with iPhones/iPads
- 🤖 Android users (Chrome/Firefox)
- 💻 Desktop users (any browser)

**Everyone can:**
- Install on home screen
- Use offline
- Track workouts
- See their progress

---

## Need Help?

- **Vercel Issues:** docs.vercel.com
- **Netlify Issues:** netlify.com/support
- **Next.js Issues:** nextjs.org/docs
- **PWA Issues:** web.dev/progressive-web-apps

---

**Happy Deployment! 🚀**
