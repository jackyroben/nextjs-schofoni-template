# 📚 Schofoni - Next.js PWA Educational Platform Template

A **complete Progressive Web App (PWA)** educational platform built with Next.js 16, featuring mobile install functionality, offline support, and a modern responsive design.

## 🚀 Features

### ✅ **PWA Implementation**
- **Full Mobile Install Support** - Beautiful centered install prompt with animations
- **Service Worker** - Complete offline caching and background sync
- **App Manifest** - Optimized for all platforms (iOS, Android, Desktop)
- **Icon Set** - Complete PNG icon suite (72x72 to 512x512)
- **Offline Page** - Graceful fallback when network is unavailable

### 🎨 **Modern UI/UX**
- **Mobile-First Design** - Responsive breakpoints for all devices
- **Beautiful Animations** - Smooth transitions and micro-interactions
- **Dark Mode Support** - Tailwind CSS with dark theme variants
- **Component Library** - shadcn/ui with Radix UI primitives
- **Touch-Friendly** - Optimized for mobile interactions

### 🔧 **Technical Stack**
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom theme
- **UI Components**: shadcn/ui + Radix UI
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **PWA**: Service Worker + Web App Manifest
- **Icons**: Lucide React + Custom PWA Icons

## 📱 **Mobile Install Experience**

The app features a **beautiful mobile install prompt** that:

- ⏰ **Auto-dismisses after 10 seconds** with visual countdown
- ❌ **Close button** for manual dismissal
- 🎯 **Centered modal** with backdrop blur
- ✨ **Smooth animations** and professional design
- 📱 **Mobile-optimized** for iPhone/Android

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jackyroben/nextjs-schofoni-template.git
   cd nextjs-schofoni-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Test PWA Installation

1. **On Desktop**: Look for the install icon in the address bar or three-dot menu
2. **On Mobile**: Visit the app on your phone - the install prompt will appear automatically
3. **Developer Testing**: Open Chrome DevTools → Device Toolbar → Mobile emulation

## 📁 **Project Structure**

```
schofoni/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard page
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   ├── offline/                 # PWA offline fallback page
│   ├── layout.tsx              # Root layout with PWA setup
│   ├── page.tsx                # Homepage
│   └── globals.css             # Tailwind CSS + custom theme
├── components/                   # Reusable React components
│   ├── ui/                     # Base UI components (shadcn/ui)
│   │   ├── button.tsx          # Button component
│   │   ├── card.tsx            # Card component
│   │   ├── dialog.tsx          # Dialog component
│   │   ├── form.tsx            # Form components
│   │   ├── input.tsx           # Input component
│   │   ├── label.tsx           # Label component
│   │   └── badge.tsx           # Badge component
│   ├── auth/                   # Authentication components
│   │   ├── login-form.tsx      # Login form
│   │   └── register-form.tsx   # Registration form
│   └── pwa/                    # PWA-specific components
│       ├── install-prompt.tsx  # Mobile install prompt
│       ├── service-worker.tsx  # Service worker utilities
│       └── status-indicator.tsx # PWA status indicator
├── contexts/                     # React Context providers
│   └── auth-context.tsx        # Authentication context
├── lib/                          # Utility libraries
│   ├── utils.ts                 # General utilities
│   └── supabase/                # Supabase configuration
│       └── client.ts            # Supabase client setup
├── public/                       # Static assets
│   ├── icons/                   # PWA icons (all sizes)
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   └── icon-512x512.png
│   ├── manifest.json            # PWA manifest
│   ├── sw.js                    # Service worker
│   └── *.svg                    # Various SVG assets
├── next.config.ts               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## ⚙️ **Configuration**

### PWA Manifest
The `public/manifest.json` includes:
- App name and description
- Icon definitions for all sizes
- Theme colors and display mode
- Categories for app stores

### Service Worker
The `public/sw.js` implements:
- **Network First** strategy for API calls
- **Cache First** strategy for images
- **Stale While Revalidate** for static files
- **Offline fallback** for navigation

### Next.js Config
The `next.config.ts` includes:
- Standalone output for deployment
- PWA asset headers
- Build optimizations

## 🎯 **PWA Installation Criteria**

This app meets **100% of PWA install criteria**:

- ✅ **HTTPS/localhost** served securely
- ✅ **Valid Web App Manifest** with proper icons
- ✅ **Active Service Worker** with caching strategies
- ✅ **Complete Icon Set** for all platforms
- ✅ **Responsive Design** for all screen sizes
- ✅ **User Interaction** support for install prompts

## 🔧 **Environment Setup**

1. **Supabase Configuration**
   ```bash
   # Copy .env.example to .env.local
   cp .env.example .env.local
   
   # Add your Supabase credentials
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Environment Variables**
   ```env
   # .env.local
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 🚀 **Deployment**

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Configure custom domain (optional)
vercel --prod
```

### Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm start

# Build static files (if needed)
npm run export
```

## 📱 **Testing PWA Features**

### Chrome DevTools
1. Open DevTools (F12)
2. Go to **Application** tab
3. Check **Manifest** and **Service Workers**
4. Test with **Device Toolbar** (mobile emulation)

### Mobile Testing
1. Visit your deployed app on mobile
2. Look for install prompt
3. Test offline functionality
4. Verify app appears in home screen

### PWA Lighthouse
```bash
# Run Lighthouse audit
npm run lighthouse
```

## 🛠️ **Available Scripts**

```json
{
  "dev": "next dev",           # Start development server
  "build": "next build",       # Build for production
  "start": "next start",       # Start production server
  "lint": "next lint",         # Run ESLint
  "type-check": "tsc --noEmit" # TypeScript type checking
}
```

## 🎨 **Customization**

### Theming
Edit `app/globals.css` to customize:
- Color palette
- Typography
- Spacing
- Component styles

### PWA Customization
Edit `public/manifest.json` to change:
- App name and description
- Theme colors
- Icon definitions
- Display preferences

### Service Worker
Edit `public/sw.js` to modify:
- Caching strategies
- Offline behavior
- Background sync
- Push notifications

## 🔧 **Troubleshooting**

### PWA Install Issues
- **Service Worker not registering**: Check console for errors
- **Icons not loading**: Verify file paths in manifest.json
- **Install prompt not showing**: Test on mobile devices
- **Offline not working**: Check service worker scope

### Common Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Reset Git if needed
git reset --hard HEAD
```

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 **Support**

- **GitHub Issues**: [Create an issue](https://github.com/jackyroben/nextjs-schofoni-template/issues)
- **Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **PWA Guide**: [MDN Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

---

⭐ **Star this repository if it helped you!**

📧 **Made with ❤️ by [jackyroben](https://github.com/jackyroben)**