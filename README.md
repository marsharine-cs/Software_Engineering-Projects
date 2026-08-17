# Ada Lovelace — The Poetry of Computation

An interactive educational storytelling project exploring Ada Lovelace, Charles Babbage's Analytical Engine, and several early ideas that helped shape the history of computing.

The project combines historical content with responsive editorial design and JavaScript-powered interactions, including an interactive timeline and an explorer for concepts drawn from Lovelace's 1843 notes.

Rather than presenting a simple static tribute page, this version was redesigned as a small **digital-history and educational technology experience**.

---

## 🚀 Live Demo

The project is deployed with Vercel. The public production link will be added after verification.

---

## ✨ Features

- Responsive digital-history experience
- Interactive Ada Lovelace timeline
- Dynamic historical content
- Analytical Engine notes explorer
- JavaScript-powered tab interfaces
- Keyboard-accessible timeline navigation
- Keyboard-accessible notes navigation
- Historical portrait presentation
- Educational storytelling sections
- Legacy and computing-history content
- Responsive mobile navigation
- Escape-key menu support
- Skip-to-content accessibility link
- Visible focus states
- Reduced-motion support
- Historical resource links
- Desktop, tablet, and mobile layouts

---

## 🧠 Project Focus

This project explores several important ideas associated with Ada Lovelace and the Analytical Engine.

Topics include:

- Ada Lovelace's mathematical education
- Charles Babbage's Analytical Engine
- Lovelace's 1843 translation and notes
- Machine-executable sequences of operations
- Bernoulli-number calculations
- Symbolic processing
- Programmability
- Algorithmic thinking
- The relationship between logic and imagination
- Lovelace's continuing place in computing history

---

## 📜 Historical Context

Ada Lovelace was an English mathematician and writer who worked closely with Charles Babbage's ideas for the Analytical Engine.

In 1843, she translated Luigi Menabrea's description of the proposed machine into English and added extensive notes of her own.

Those notes explored both how the machine could operate and what a programmable machine might eventually be capable of doing.

One section, commonly known as **Note G**, contains a detailed procedure for calculating Bernoulli numbers using the Analytical Engine.

The project deliberately avoids reducing Lovelace's contribution to a single title such as "the first programmer." Instead, it focuses on the specific ideas documented in her work and their significance to the history of computing.

---

## 🕰️ Interactive Timeline

The timeline allows users to explore four milestones:

### 1815 — Birth

Augusta Ada Byron was born in London.

### 1833 — Charles Babbage

Ada became acquainted with Babbage and developed a strong interest in his mechanical computing designs.

### 1843 — The Notes

Her translation of Menabrea's description of the Analytical Engine was published together with extensive original notes.

### 1852 — Legacy

Lovelace died at age 36, but her writings later became an important part of computing history.

JavaScript updates the timeline content without reloading the page.

---

## 📝 Analytical Engine Notes Explorer

The project includes an interactive interface highlighting three ideas.

### The Engine

Explores the idea of a machine capable of following programmable sequences of operations.

### Beyond Numbers

Introduces Lovelace's observation that machine operations could potentially act on symbols according to defined rules rather than being limited only to arithmetic quantities.

### Note G

Highlights the sequence of operations Lovelace described for calculating Bernoulli numbers with the Analytical Engine.

---

## ⌨️ Keyboard Navigation

The timeline and notes explorer are implemented as accessible interactive tab interfaces.

Users can navigate with:

- Arrow Right
- Arrow Left
- Arrow Up
- Arrow Down
- Home
- End

JavaScript updates:

- active interface state
- `aria-selected`
- keyboard focus
- `tabIndex`
- displayed content

This allows the project to demonstrate more than mouse-only interaction.

---

## 📱 Responsive Navigation

On smaller screens, the desktop navigation becomes a mobile menu.

JavaScript controls:

- opening the navigation
- closing the navigation
- `aria-expanded` state
- accessible button labels
- automatic closing after selecting a link
- Escape-key support
- cleanup when returning to desktop width

---

## 🛠️ Technologies & Development Tools

- **HTML5** — semantic storytelling structure and accessible interactive regions
- **CSS3** — editorial layouts, responsive design, typography, portrait presentation, and visual hierarchy
- **JavaScript** — timeline state, dynamic note content, keyboard navigation, and mobile-menu behavior
- **Visual Studio Code** — code editing and development
- **Replit** — browser-based development experience
- **Git** — version control
- **GitHub** — source-code management and project organization
- **Vercel** — web application deployment

---

## 💻 JavaScript Concepts Demonstrated

This project includes practical examples of:

- Objects
- Arrays
- Constants and variables
- Functions
- DOM selection
- Event listeners
- Data attributes
- Dynamic content rendering
- Conditional logic
- Array iteration
- CSS class manipulation
- ARIA attribute management
- `tabIndex` management
- Keyboard events
- Focus management
- Responsive interface behavior
- Application state through UI selection

---

## 🎨 CSS Concepts Demonstrated

The interface demonstrates:

- CSS custom properties
- CSS Grid
- Flexbox
- Responsive media queries
- Editorial typography
- Sticky navigation
- Responsive portrait layouts
- Gradients
- Shadows
- Rounded compositions
- Interactive states
- Accessible focus styling
- Mobile navigation
- Responsive typography with `clamp()`
- Reduced-motion preferences

---

## ♿ Accessibility & Usability

Accessibility-conscious features include:

- Semantic HTML
- Skip-to-content navigation
- Keyboard-accessible controls
- Visible focus indicators
- Descriptive link and button labels
- `aria-expanded` mobile navigation
- `aria-selected` timeline states
- `aria-selected` notes states
- `aria-live` dynamic content regions
- Arrow-key tab navigation
- Home and End key navigation
- Escape-key menu closing
- Responsive touch targets
- Reduced-motion support

---

## 📱 Responsive Design

The application adapts across:

- Desktop computers
- Tablets
- Mobile phones

Responsive behavior includes:

- stacked hero content
- adaptable portrait presentation
- simplified story grids
- single-column educational cards
- mobile timeline controls
- stacked notes interface
- responsive historical imagery
- stacked legacy cards
- mobile navigation
- mobile footer layout

---

## 📂 Project Structure

```text
├── index.html
├── styles.css
├── script.js
├── README.md
└── LICENSE
