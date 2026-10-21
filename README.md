# 🍽️ MessMitra

> **Your mess, minus the mess.**  
> A hyper-local, student-audited web directory and comparison engine mapping 15 verified messes and canteens around **PICT Pune (Dhankawadi)**.

---

## 📌 Overview

**MessMitra** is designed to solve a daily struggle for outstation and hostel students at **Pune Institute of Computer Technology (PICT)**: finding healthy, hygienic, and affordable daily meals without trial-and-error.

Every listing is backed by an in-person campus survey auditing real plate prices, monthly subscriptions, walking distances, Sunday dinner availability, kitchen hygiene, and drinking water facilities.

---

## 🚀 Key Features & Capabilities

### 🔍 1. Smart Search & Instant Filtering
* **Live Keyword Search:** Debounced instant lookup across mess names, owners, cuisines, tags, and specialties (e.g., `"North Indian"`, `"RO"`, `"Unlimited"`).
* **Dietary Filter:** Instant toggle between **Pure Veg** and **Veg & Non-Veg**.
* **Cuisine Filters:** Categorized by **Maharashtrian**, **North Indian**, **Kokani Coastal**, and **Multi-Cuisine**.
* **Dynamic Sorting:** Sort by **Recommended**, **Closest first** (walking meters), **Lowest plate** (from ₹80), or **Highest rated**.

### 📋 2. Comprehensive Mess Profiles
* **Transparent Pricing:** Full rate breakdown for single daily plates (Veg / Egg / Non-Veg), monthly passes (1 meal/day and 2 meals/day), Sunday feasts, and room delivery terms.
* **Operational Timings:** Exact lunch and dinner operating hours, plus a dedicated **Sunday Night Open** indicator (critical for hostelers when most messes close).
* **Hygiene & Facilities:** On-site drinking water audit (**Certified RO Purifier** vs. **Normal Filter Jar**), seating capacity, handwash basins, and daily disinfection standards.
* **One-Tap Actions:** Direct dial to mess owners (`tel:`) and instant **Google Maps Walking Directions** from the PICT gate.
* **Audit Metadata:** Transparently displays survey date and auditor roll number for each mess.

### ⚖️ 3. Side-by-Side Comparison Engine
* Shortlist up to **3 messes** simultaneously via a floating bottom tray.
* Interactive side-by-side comparison matrix evaluating **14 critical parameters** (pricing, timings, Sunday night service, water system, distance, seating, and ratings).

### ✍️ 4. Student Reviews & Multi-Attribute Ratings
* **5-Point Attribute Ratings:** Students rate not just an arbitrary star score, but 4 crucial dimensions:
  * 🍛 **Taste & Homeliness**
  * 🧼 **Hygiene & Cleanliness**
  * 🌿 **Gut Comfort & Digestion**
  * 💰 **Value for Money**
* **PICT Student Verification:** Automatic detection of `@pict.edu` email IDs to award the **🎓 Verified PICT Student** badge.
* **OTP Verification Workflow:** In-modal email OTP verification to maintain honest, community-driven ratings.
* **Live Google Sheets Integration:** Fetches live student survey responses through a deployed Google Apps Script web service, merged with local browser caching.

### 🎙️ 5. "Student Voices" Review Carousel
* Interactive, touch-swipeable review carousel displaying real student testimonials, ratings, and feedback on the home screen.

---

## 🍱 Directory Snapshot (15 Verified Messes)

| # | Mess Name | Type | Cuisine | Distance | Single Plate | Sunday Night |
|---|---|---|---|---|---|:---:|
| 1 | **Kirteshwar Khanawal** | Veg & Non-Veg | Maharashtrian | 250m | ₹80 | ✅ Open |
| 2 | **Deep's Kitchen** | Veg & Non-Veg | Maharashtrian | 250m | ₹80 | ✅ Open |
| 3 | **Aai Mess** | Pure Veg | Maharashtrian | 250m | ₹80 | ❌ Closed |
| 4 | **Kashi Vishweshwar Mess** | Veg & Non-Veg | Maharashtrian | 250m | ₹80 | ✅ Open |
| 5 | **Hotel Abhiruchi** | Veg & Non-Veg | Multi-Cuisine | 500m | ₹90 | ✅ Open |
| 6 | **Jay Shankar Mess** | Veg & Non-Veg | Maharashtrian | 300m | ₹80 | ❌ Closed |
| 7 | **SK Dining (Santosh Mess)** | Pure Veg | North Indian | 260m | ₹90 | ✅ Open |
| 8 | **Sadguru Mess** | Pure Veg | North Indian | 250m | ₹80 | ✅ Open |
| 9 | **Sujata Mess** | Veg & Non-Veg | Maharashtrian | 250m | ₹100 | ✅ Open |
| 10 | **Hotel Maitri Katta** | Veg & Non-Veg | Multi-Cuisine | 500m | ₹90 | ✅ Open |
| 11 | **Kokan Katta** | Veg & Non-Veg | Kokani Coastal | 300m | ₹100 | ✅ Open |
| 12 | **Shankar Maharaj Mess** | Veg & Non-Veg | Maharashtrian | 350m | ₹100 | ✅ Open |
| 13 | **Annapurna Dining Centre** | Veg & Non-Veg | Multi-Cuisine | 850m | ₹90 | ❌ Closed |
| 14 | **Madhura Mess** | Veg & Non-Veg | Maharashtrian | 170m | ₹90 | ❌ Closed |
| 15 | **PICT Campus Canteen & Mess** | Pure Veg | Multi-Cuisine | 0m (Campus) | ₹80 | ❌ Closed |

---

## 🛠️ Tech Stack

* **Frontend:** [React 18](https://react.dev/) (Single Page Application with hash routing)
* **Build System:** [Vite 6](https://vitejs.dev/)
* **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) with custom brand theme and typography
* **Icons:** [Lucide React](https://lucide.dev/)
* **Typography:** Plus Jakarta Sans & Inter
* **Backend / Data Sync:** Google Apps Script Web App REST API connected to Google Sheets + client-side `localStorage` sync

---

## 📂 Project Structure

```text
MessMitra/
├── public/                 # Static assets & brand logos
│   ├── logo-full.png
│   ├── logo-horizontal.png
│   ├── logo-icon.png
│   └── logo-symbol.png
├── src/
│   ├── components/         # Modular React components
│   │   ├── BottomCta.jsx       # Bottom call-to-action banner
│   │   ├── CompareModal.jsx    # Side-by-side comparison modal table
│   │   ├── CompareTray.jsx     # Floating bottom shortlist tray
│   │   ├── DetailView.jsx      # In-depth mess profile page
│   │   ├── Footer.jsx          # Footer with category quick links
│   │   ├── Hero.jsx            # Hero search bar and quick stats
│   │   ├── MessCard.jsx        # Grid card item with quick actions
│   │   ├── Navbar.jsx          # Sticky frosted-glass navigation bar
│   │   ├── ReviewModal.jsx     # OTP & PICT verified review submission modal
│   │   ├── StarRating.jsx      # Reusable SVG star rating component
│   │   ├── StudentVoices.jsx   # Automated reviews carousel
│   │   ├── Toast.jsx           # Toast notification system
│   │   └── WhyChooseUs.jsx     # Key value propositions
│   ├── data/
│   │   ├── initialReviews.json # Pre-bundled initial student reviews
│   │   └── messesData.json     # Curated 15-mess database with audited specs
│   ├── services/
│   │   └── reviewsService.js   # Google Sheets & Google Apps Script API sync
│   ├── utils/
│   │   └── helpers.js          # Currency, distance, and storage helpers
│   ├── App.jsx             # Main application orchestrator & routing
│   ├── index.css           # Tailwind directives & global utility classes
│   └── main.jsx            # React root entry point
├── package.json            # Scripts & project dependencies
├── tailwind.config.js      # Custom theme colors and font families
└── vite.config.js          # Vite configuration
```

---

## 💻 Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** or **yarn**

### Installation

1. **Clone or open the repository:**
   ```bash
   cd MessMitra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready assets will be generated inside the `dist/` directory.

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 👥 Contributors & Survey Credits

Built as part of a **Community Engagement Project (CEP)** by students of **Pune Institute of Computer Technology (PICT)** to help freshers and hostelers navigate mess options around Dhankawadi, Pune.
