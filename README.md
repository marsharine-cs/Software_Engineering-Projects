# Interactive Balance Sheet

A responsive JavaScript financial dashboard that allows users to explore assets, liabilities, net worth, and debt-to-assets ratios across multiple reporting periods.

Users can edit financial values and see the dashboard recalculate instantly without refreshing the page.

This project demonstrates **JavaScript calculations, application state management, DOM manipulation, event handling, number formatting, responsive interface design, accessible form controls, and print-friendly reporting**.

---

## 🚀 Live Demo

A public live deployment will be added after final testing.

---

## ✨ Features

* Interactive financial dashboard
* Three reporting periods: 2024, 2025, and 2026
* Editable asset values
* Editable liability values
* Automatic total-assets calculation
* Automatic total-liabilities calculation
* Automatic net-worth calculation
* Debt-to-assets ratio
* Positive and negative financial-position feedback
* Year switching without page reload
* Financial values preserved while switching between years
* Reset Sample Data functionality
* Print Report functionality
* Currency formatting
* Responsive desktop, tablet, and mobile layout
* Accessibility-conscious form controls
* Reduced-motion support
* Print-friendly CSS layout

---

## 📊 Financial Categories

### Assets

The dashboard currently tracks:

* Cash & Cash Equivalents
* Accounts Receivable
* Savings & Investments

### Liabilities

The dashboard currently tracks:

* Loans Payable
* Credit Card Balance
* Other Liabilities

---

## 🧮 Financial Calculations

The application calculates several financial measures automatically.

### Total Assets

```text
Cash
+ Accounts Receivable
+ Savings & Investments
= Total Assets
```

### Total Liabilities

```text
Loans Payable
+ Credit Card Balance
+ Other Liabilities
= Total Liabilities
```

### Net Worth

```text
Total Assets − Total Liabilities = Net Worth
```

### Debt-to-Assets Ratio

```text
Total Liabilities ÷ Total Assets × 100
```

The dashboard updates these calculations whenever a financial value changes.

---

## 🧠 How the JavaScript Works

### 1. Sample Financial Data

Financial information for each reporting year is stored in a JavaScript object.

Each year contains values for:

* cash
* receivables
* investments
* loans
* credit-card balances
* other liabilities

### 2. Year Selection

Users can switch between 2024, 2025, and 2026.

JavaScript loads the selected year's financial information into the dashboard while maintaining any values the user has edited during the session.

### 3. Input Handling

Each financial input listens for changes.

When a value is edited, JavaScript:

1. reads the updated value
2. stores it for the selected year
3. recalculates totals
4. updates the dashboard

### 4. Financial Position

The application calculates whether the financial position is:

* positive
* balanced
* negative

If liabilities exceed assets, the net-worth card changes visual state to clearly communicate the result.

### 5. Currency Formatting

JavaScript's `Intl.NumberFormat` API formats calculated values as U.S. currency.

### 6. Reset Functionality

The **Reset Sample Data** button restores the original demonstration values and returns the dashboard to the 2026 reporting period.

### 7. Print Functionality

The **Print Report** button uses the browser's print functionality.

A separate print stylesheet removes unnecessary interface elements and prepares the financial dashboard for printing.

---

## 🛠️ Technologies & Development Tools

* **HTML5** — semantic dashboard structure and accessible form controls
* **CSS3** — responsive design, financial cards, visual states, and print layout
* **JavaScript** — calculations, application state, DOM updates, input handling, and formatting
* **Visual Studio Code** — code editing and project development
* **Replit** — browser-based development experience
* **Git** — version control
* **GitHub** — source-code management and project organization
* **Vercel** — web application deployment

---

## 💻 JavaScript Concepts Demonstrated

This project includes practical examples of:

* Objects
* Functions
* Constants and variables
* DOM element selection
* Event listeners
* Application state
* Numeric calculations
* `Number.parseFloat()`
* Conditional logic
* Template literals
* `Intl.NumberFormat`
* Array iteration
* CSS class manipulation
* Data attributes
* Input validation
* Browser print functionality
* Dynamic interface updates

---

## ♿ Accessibility & Usability

The project includes accessibility-conscious features such as:

* Semantic HTML structure
* Descriptive form labels
* Keyboard-accessible controls
* Visible focus indicators
* ARIA button-state attributes
* `aria-live` financial updates
* Responsive input controls
* Clear financial-status feedback
* Reduced-motion support
* Print-friendly presentation

---

## 📱 Responsive Design

The dashboard adapts for:

* Desktop computers
* Tablets
* Mobile phones

On smaller screens:

* summary cards stack vertically
* asset and liability panels become single-column
* financial fields expand to full width
* year controls remain easy to select
* dashboard buttons become full-width controls
* financial calculations remain readable

---

## 📂 Project Structure

```text
├── index.html
├── styles.css
├── script.js
├── README.md
└── LICENSE
```

### File Overview

* `index.html` — financial dashboard structure and interface
* `styles.css` — responsive layout, dashboard styling, and print design
* `script.js` — financial data, calculations, year switching, state management, reset logic, and print functionality
* `README.md` — project documentation
* `LICENSE` — MIT License

---

## 🔧 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/marsharine-cs/Software_Engineering-Projects.git
```

### 2. Enter the repository

```bash
cd Software_Engineering-Projects
```

### 3. Switch to the Balance Sheet branch

```bash
git checkout Balance_Sheet_Project
```

### 4. Open the application

Open `index.html` in your preferred web browser.

You can also open the project in Visual Studio Code and use a local development server.

---

## 🎯 Skills Demonstrated

This project demonstrates experience with:

* JavaScript programming
* Financial calculations
* Front-end web development
* Interactive dashboard design
* DOM manipulation
* Event-driven programming
* Application state management
* Number and currency formatting
* Form development
* Responsive web design
* Accessibility-conscious development
* Print stylesheet development
* Git and GitHub workflows
* Technical documentation

---

## 🌱 Project Development

This project began as a basic multi-year balance sheet exercise.

It has since been redesigned into a more complete interactive financial dashboard with improved accounting categories, year-based application state, real-time calculations, net-worth analysis, debt-to-assets reporting, reset functionality, print support, responsive styling, accessibility improvements, and professional documentation.

---

## 🔗 Main Repository

This project is part of my larger **Software Engineering Projects** collection:

[View the Software Engineering Projects Repository](https://github.com/marsharine-cs/Software_Engineering-Projects)

---

## 📜 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

## 📬 Connect

**Marsharine A. Simpson**

* [GitHub](https://github.com/marsharine-cs)
* [LinkedIn](https://www.linkedin.com/in/marsharine-a-simpson)

---

Thank you for exploring the Interactive Balance Sheet project.
