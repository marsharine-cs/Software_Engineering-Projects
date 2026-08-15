# Palindrome Checker

A responsive JavaScript web application that determines whether a word, phrase, or sentence reads the same forward and backward.

The application normalizes user input by ignoring **spaces, punctuation, special characters, and capitalization**, then compares the cleaned text with its reversed version.

This project demonstrates practical use of **JavaScript string processing, DOM manipulation, event handling, input validation, responsive interface design, and accessible user feedback**.

---

## ✨ Features

* Check words, phrases, or sentences for palindrome patterns
* Ignore spaces, punctuation, special characters, and capitalization
* Clear and reset the application
* Character counter with a 250-character input limit
* Clickable example phrases
* Distinct visual feedback for:

  * Palindrome results
  * Non-palindrome results
  * Empty or invalid input
* Press **Enter** to check an entry
* Use **Shift + Enter** to insert a new line
* Responsive layout for desktop, tablet, and mobile devices
* Screen-reader-friendly result announcements
* Reduced-motion support for users who prefer less animation

---

## 🧪 Try These Examples

### Palindromes

* `racecar`
* `Never odd or even`
* `A man, a plan, a canal: Panama!`

### Not a Palindrome

* `Hello world`

The checker normalizes each entry before evaluating it.

---

## 🧠 How the JavaScript Works

The application follows three main steps:

### 1. Normalize

The entered text is converted to lowercase and filtered so only letters and numbers remain.

For example:

```text
A man, a plan, a canal: Panama!
```

becomes:

```text
amanaplanacanalpanama
```

### 2. Reverse

JavaScript splits the normalized text into characters, reverses the array, and joins the characters back together.

### 3. Compare

The normalized text is compared with its reversed version.

If both strings match, the input is identified as a palindrome.

---

## 🛠️ Technologies & Development Tools

* **HTML5** — semantic application structure
* **CSS3** — responsive layout, visual states, and interface design
* **JavaScript** — application logic, DOM manipulation, validation, and event handling
* **Visual Studio Code** — code editing and development
* **Replit** — browser-based coding and development
* **Git** — version control
* **GitHub** — source-code management and project organization

---

## 💻 JavaScript Concepts Demonstrated

This project includes practical examples of:

* Functions
* Constants and variables
* DOM element selection
* Event listeners
* Form submission handling
* String normalization
* Regular expressions
* Unicode-aware text filtering
* Arrays
* `.split()`
* `.reverse()`
* `.join()`
* Conditional logic
* Template literals
* Dataset attributes
* CSS class manipulation
* Keyboard events
* Character counting
* Input validation

---

## ♿ Accessibility & Usability

The application includes several accessibility-conscious features:

* Semantic HTML structure
* Proper form labels
* Keyboard-accessible controls
* Visible focus states
* `aria-live` result announcements
* Clear success, warning, and non-palindrome feedback
* Mobile-friendly button sizing
* Reduced-motion support
* Descriptive helper text

---

## 📱 Responsive Design

The interface adapts for:

* Desktop computers
* Tablets
* Mobile phones

The project uses responsive layouts, flexible typography, stacked mobile controls, and adaptable content cards so the application remains usable across screen sizes.

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

* `index.html` — application structure and content
* `styles.css` — responsive layout and visual design
* `script.js` — palindrome logic and interactive functionality
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

### 3. Switch to the Palindrome Checker branch

```bash
git checkout Palindrome_Checker
```

### 4. Open the application

Open `index.html` in your preferred browser.

You can also open the project directory in Visual Studio Code and use a local development server.

---

## 🎯 Skills Demonstrated

This project demonstrates experience with:

* JavaScript programming
* Front-end web development
* DOM manipulation
* String processing
* Input validation
* Event-driven programming
* Responsive web design
* User interface development
* Accessibility-conscious development
* Git and GitHub workflows
* Technical documentation

---

## 🌱 Project Development

The Palindrome Checker began as a smaller JavaScript exercise and has since been redesigned into a more complete responsive mini-application.

The updated version expands the original logic with stronger input handling, interactive examples, keyboard controls, accessible result feedback, character counting, responsive styling, and improved technical documentation.

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

Thank you for exploring the Palindrome Checker project.
