# Arvon — Handcrafted Ceramics & Living (Client)

A boutique e-commerce web application for **Arvon**, an artisan studio specializing in handmade ceramic mugs, fluted vases, and home decor.

## Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Pure handcrafted CSS (warm terracotta, raw stoneware cream, sand, and charcoal tones)
- **Animations**: GSAP (GreenSock Animation Platform) for smooth editorial hero reveals, modal transitions, card lifts, and drawer animations
- **Celebration Effects**: canvas-confetti on successful order placement
- **Icons**: Lucide React
- **Currency**: Indian Rupees (₹)

## Features Included
1. **Interactive Product Catalog**:
   - Filter by categories: *Mugs & Cups*, *Vases & Vessels*, *Bowls & Tableware*, *Home Decor & Accents*
   - Live search matching product titles, descriptions, and master potter names
   - Sorting by Featured, Price (Low to High, High to Low), Top Rated, and Most Reviewed
   - In-Stock toggle filter
2. **GSAP Micro-Interactions**:
   - Hero entrance animation sequence
   - Product card hover elevation & image zooms
   - Quick View dialog with smooth scale/fade
   - Slide-in Tote (Cart) and Wishlist drawers
3. **Cart Drawer**:
   - Persistent tote state in `localStorage`
   - Free shipping progress bar (Free insured express shipping above ₹1,499)
   - Quantity stepper and item removal
   - Promo code engine (`ARVON10` for 10% off, `CLAY15` for 15% off)
   - Indian GST (5% ceramic tax) & shipping calculations
4. **Product Details Modal**:
   - Multi-angle gallery thumbnails
   - Atelier specifications (Dimensions, Capacity, Clay composition, Glaze finish, Care instructions)
   - Batch stock counter ("Only X left in current kiln batch")
   - Instant "Add to Tote" and "Instant Order" buttons
5. **Checkout Flow**:
   - Step 1: Customer details & Indian delivery address (with PIN code)
   - Step 2: Payment method selection (Instant UPI / GPay / PhonePe, Credit/Debit cards, Netbanking, Cash on Delivery)
   - Step 3: Mock order confirmation receipt with confetti, generated Order ID (`PEB-XXXXXX`), and dispatch timeline
6. **Backend Server Integration**:
   - Live connection indicator pinging `http://localhost:5000/api/health` without modifying `server/`.

## Running the Application

### 1. Start the Frontend
```bash
cd client
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Start the Backend (Optional)
```bash
cd server
npm run dev
```
Runs Express + MongoDB on [http://localhost:5000](http://localhost:5000). The frontend will automatically detect the server and show the green "API Live" badge in the navbar.
