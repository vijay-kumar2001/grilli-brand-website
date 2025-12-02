# 📌 **Grilli Brand Website**

A premium, fully–responsive restaurant landing page
**Designed & Developed by Vijay Kumar**

---

# 🌐 Live Demo

🔗 **[View the Website](#)**
*(https://vijay-kumar2001.github.io/grilli-brand-website/)*

---

# 📸 Project Screenshots


### 🔹 Hero Section

![Desktop-hero](<Assets\Screenshots\Images\desktop hero.png>) ![Mobile-hero](<Assets\Screenshots\Images\mobile hero.png>)

### 🔹 About Section (Masked Reveal)

![Desktop-aboutus1](<Assets\Screenshots\Images\desktop about us 1.png>) ![Desktop-aboutus2](<Assets\Screenshots\Images\desktop about us 2.png>)

### 🔹 Specialties / Menu Section

![Desktop-specialties](<Assets\Screenshots\Images\Desktop specialties.png>) ![tab-specialties](<Assets\Screenshots\Images\tab specialties.png>) ![mobile-specialties](<Assets\Screenshots\Images\mobile specialties.png>)

### 🔹 Reservation Section

![Tab-reservation](<Assets\Screenshots\Images\tab reservation section.png>) ![Mobile-reservation](<Assets\Screenshots\Images\Mobile reservation.png>)

### 🔹 Footer (Desktop / Tablet / Mobile)

![Desktop-footer](<Assets\Screenshots\Images\desktop footer.png>) ![Tab-footer](<Assets\Screenshots\Images\tab footer.png>) ![Mobile-footer](<Assets\Screenshots\Images\Mobile footer.png>)

### 🔹 Menu Highlights Modal

![Desktop-menu-modal](<Assets\Screenshots\Images\Desktop menu highlights.png>) ![Mobile-menu-modal](<Assets\Screenshots\Images\mobile menu highlights.png>)

### 🔹 Mobile Menu & Feedback Modal

![alt text](<Assets\Screenshots\Images\mobile menu open.png>) ![alt text](<Assets\Screenshots\Images\mobile reservation feedback modal.png>) 

### 🔹 Full Page Preview

![Desktop-full](Assets\Screenshots\Images\Full-website-desktop.png) ![Tab-full](Assets\Screenshots\Images\Full-website-tab.png) ![Mobile-full](Assets\Screenshots\Images\Full-website-mobile.png)

### 🔹 Project Walkthroughs(Videos)

<video controls src="Assets\Screenshots\Videos\desktop full walkthrough final.mp4" title="Title">
 <video controls src="Assets\Screenshots\Videos\tab walkthrough.mp4" title="Title"></video>
 </video> <video controls src="Assets\Screenshots\Videos\mobile walkthrough.mp4" title="Title"></video>

👉 **For the all Screenshots, see:**
📄 **[Screenshots](Assets/Screenshots)**

---

# 📖 About the Project

The **Grilli Brand Website** is a polished, cinematic restaurant landing page that combines premium UI/UX, smooth animations, advanced interactions, and performance-optimized front-end engineering.

This project showcases:

* Modern layout systems (Grid + Flexbox)
* Precision typography and branding
* Smooth scroll experience (Lenis)
* Cinematic intro video transitions
* Scroll-based animations (GSAP + ScrollTrigger)
* Advanced About section masking effect
* Mobile-first navigation with scroll lock
* Interactive modals with History API back-button handling
* Responsive images, videos, and fully fluid spacing using `clamp()`

The website is inspired by high-end luxury restaurant brands and focuses on creating a **premium first impression**, backed by technically solid engineering.

---

# ✨ Features

### 🎬 **Cinematic Hero Intro**

* Video intro with scroll lock
* Smooth fade-in transition into hero content
* Auto/manual image slider behind the hero

### 📱 **Fully Responsive Design**

* Mobile (one-column)
* Tablet (adaptive layout adjustments)
* Desktop (multi-column grid footer, wide layouts)

### ⚙️ **Smooth & Animated Experience**

* GSAP-powered animations
* ScrollTrigger interactions
* Lenis smooth scrolling
* Animated section reveals

### 🍽️ **Restaurant Highlight Sections**

* About section with custom CSS mask reveal
* Specialties / services cards with hover + scroll-based activation
* Menu items with modal pop-ups

### 🧩 **Smart Modal System**

* Opens/close modals with animations
* Scroll lock during modal open
* Fake-history entries for back-button behavior
* Double-back-to-exit UX for mobile users

### 📩 **Forms & Feedback**

* Reservation form with async handling
* Success/Error/Warning status modal
* Inline toasts for back-exit confirmation

### 🗺️ **Integrated Google Map**

* Dark-theme adapted using `filter` and `hue-rotate`

### 📩 **Newsletter Embed**

* Customized Brevo email subscription form with overridden styles

---

# 🛠️ Tech Stack

### **Frontend**

* **HTML5**
* **CSS3** (custom properties, mask-image, fluid typography with clamp)
* **JavaScript (ES6+)**

### **Libraries / Tools**

* **GSAP** + **ScrollTrigger**
* **Lenis Smooth Scroll**
* **IntersectionObserver API**
* **History API** (custom navigation logic)
* **Ionicons**
* **Google Fonts**
* **Brevo Subscription Embed**

### **Media**

* MP4 / WEBM video intro
* Optimized and compressed images in multiple formats

---

# 🧠 What I Learned (High-Level Summary)

This project helped me grow significantly as a front-end developer. At a high level, I learned:

* How to design and implement a cohesive, branded UI using a design-system mindset (colors, spacing tokens, typography scale).
* Building **fluid, responsive layouts** using `clamp()`, Flexbox, and Grid across mobile, tablet, and desktop.
* Creating **cinematic interactions** using GSAP + ScrollTrigger, including timeline-based animations tied to scroll.
* Implementing scroll behavior enhancements with Lenis and scroll locking for modals/navigation.
* Developing advanced CSS effects like **mask-image** animations for the About section.
* Managing complex state flows using JavaScript—including modals, async form handling, and back-button interception with the History API.
* Structuring and cleaning a real project like a professional repo: asset management, code cleanup, folder hygiene, and documentation.

👉 **For the full detailed learnings, see:**
📄 **[LEARNINGS.md](./LEARNINGS.md)**

---

# 📂 Folder Structure

```
GRILLI-BRAND-WEBSITE/
│
├── Assets/
│   ├── CSS/
│   │   └── style.css
│   │
│   ├── Images/
│   │
│   ├── JS/
│   │   └── script.js
│   │
│   └── Screenshots/
│       ├── Images/
│       └── Videos/
│
├── Videos/
│   ├── opening.mp4
│   └── opening.webm
│
├── favicon.svg
├── index.html
├── LEARNINGS.md
└── README.md

```

---

# 🚀 Getting Started

### **1️⃣ Clone the Repository**

```
git clone https://github.com/vijay-kumar2001/grilli-brand-website.git
```

### **2️⃣ Open `index.html`**

Just open it directly in any browser.

### **3️⃣ No Build Tools Needed**

This is a pure front-end project — no npm install required.

---

# 🌐 Deployment

You can host this easily using **GitHub Pages**:

1. Go to **Settings → Pages**
2. Select branch: `main`
3. Folder: `/ (root)`
4. Save
5. GitHub will provide your live link

Replace the placeholder link at the top of this README.

---

# 🧭 Future Improvements (Optional Ideas)

* Add dark/light mode toggle
* Add booking backend integration (Node/Express or Firebase)
* Add micro-interactions on hover using GSAP Flip plugin
* Add multi-language support
* Add image optimization pipeline (WebP responsive sets)
* Expand menu modals with dynamic data

---

# 👨‍💻 Author

**Vijay Kumar**
Front-End Developer
🔗 [![LinkedIn](https://img.shields.io/badge/LinkedIn-Vijay--Kumar-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/vijay-kumar-5b33002b2/)


---

# ⭐ If you like this project

Give the repository a ⭐ on GitHub and share your feedback!

---

