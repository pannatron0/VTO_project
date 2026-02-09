# VLUGS UI Spec (from Tiny)

You are a senior frontend engineer, creative developer, and UI/UX designer.

Build a high-end AI visual try-on web application for a premium brand called "VLUGS".

Brand identity (VLUGS):
- Luxury, clean, futuristic
- Bright and minimal (white-based, not dark)
- Precision, clarity, confidence
- Apple / high-end product website style
- Technology-forward but elegant

Brand & layout rules:
- The brand name "VLUGS" must always be clearly visible
- Typography must never be overlapped or blocked by product visuals
- Maintain strong visual hierarchy and clear spacing
- Product visuals enhance the text, never compete with it

Tech stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui
- Frontend only (mock AI generation is acceptable)

Visual & design concept:
- Bright luxury tone
- White background with soft radial gradients (pearl, silver, light blue)
- Strong sense of depth, light, and motion
- Floating product visuals
- Subtle parallax on scroll
- Glassmorphism used selectively and elegantly
- High-quality spacing and typography

Hero section:
- Large hero area at the top of the page
- Brand name "VLUGS" placed top-left or top-center
- Clear headline and subheadline with generous spacing
- Floating watch product centered or slightly right-offset
- Watch appears to float in mid-air
- Soft shadow beneath the watch to create depth
- Subtle continuous floating animation (slow up/down movement)
- Light reflections on the watch surface
- Soft radial background glow behind the watch
- Ensure watch visuals never overlap text content (proper z-index and spacing)

Main Try-On section:
- Positioned below the hero section with clear separation
- Split layout with balanced spacing

Left panel (Base Image Upload):
- Upload image of wrist or watch case
- Glassmorphism card with blur
- Rounded corners and soft shadow
- Drag & drop upload support
- Large preview area
- Subtle hover highlight effect

Right panel (Style Image Upload):
- Upload image of watch strap or style
- Same design system as left panel
- Clear labeling and visual balance

Generate button:
- Large primary CTA centered below upload panels
- Text: "Generate Try-On"
- Premium 3D button style
- Soft gradient surface
- Strong but elegant shadow for depth
- Hover lift animation
- Press-down animation on click
- Disabled state until both images are uploaded

Loading experience:
- Full-screen overlay with background blur
- Animated soft gradient or particle background
- Floating watch animation continues subtly in the background
- Central loading indicator with smooth looping animation
- Text: "AI is generating your try-on..."

Result experience (Modal):
- Result displayed in an animated modal popup
- Modal uses glassmorphism with blur and rounded corners
- Spring-based entrance animation
- Generated watch image shown large and centered
- Watch appears to float inside the modal
- Soft glow and shadow around the result image

Modal actions:
- Primary button: Download image
- Secondary button: Share (mock)
- Save to history
- Close modal
- Buttons include hover and press animations

Result page (/result):
- Full-width luxury showcase
- Floating product presentation
- Soft background gradients and light effects
- Before / After comparison (slider or toggle)
- Download and share buttons

History page (/history):
- Masonry or grid layout
- History cards with floating watch thumbnails
- Timestamp and label displayed clearly
- Hover animation: lift and glow
- Click card to reopen result modal
- Persist data using localStorage
- Elegant empty state illustration

Animations & motion:
- Floating animations for product images
- Subtle parallax movement on scroll
- Page transition animations using Framer Motion
- Modal entrance using spring physics
- Micro-interactions on all interactive elements
- Motion should feel precise, calm, and premium (never playful)

UX & polish:
- Disable Generate button until required images are uploaded
- Smooth state transitions throughout the app
- Fully responsive for desktop and mobile
- Visual focus always remains on the watch product
- Clean, scalable, production-ready code

Folder structure:
app/
  page.tsx
  result/
  history/
components/
  HeroFloatingWatch.tsx
  UploadCard.tsx
  GenerateButton.tsx
  LoadingOverlay.tsx
  ResultModal.tsx
  HistoryCard.tsx

Expected output:
- Visually impressive VLUGS Next.js frontend
- Premium product-level UI and motion design
- Clear typography with no overlapping visuals
- Mock AI generation acceptable
- Ready for real AI Try-On integration later
