# Cosmic Pass: Advanced Password Strength Checker & Generator

![Cosmic Pass Banner](https://cosmicpass.example.com/og-image.png) 

**Cosmic Pass** is a modern, client-side React application designed for dual purposes: analyzing the strength of user-provided passwords and generating cryptographically secure, customizable passwords. Built with React, TypeScript, and Tailwind CSS, it offers a sleek, responsive user interface with an animated cosmic background theme.

> **Privacy First:** All calculations are performed in-browser using pure JavaScript. No passwords or data are ever sent to a server, ensuring 100% user privacy.

## ✨ Key Features

- **Dual-Function Interface**: Seamlessly switch between the Password Strength Checker and the Password Generator in a single, fluid interface.
- **Instant Strength Analysis**:
  - **Real-time Feedback**: Get immediate insights on password strength as you type.
  - **Entropy-based Scoring**: Calculates the true cryptographic strength (in bits) for an accurate security assessment.
  - **Estimated Time to Crack**: Provides a human-readable estimate of security (e.g., "milliseconds", "trillions of years").
  - **Visual Strength Meter**: A color-coded bar provides an at-a-glance understanding of your password's security level.
  - **Requirement Checklist**: Dynamically updates to show compliance with common password rules (length, uppercase, numbers, symbols).
- **Secure Password Generation**:
  - **Customizable Length**: Use a slider to select a password length from 8 to 32 characters.
  - **Character Set Control**: Fine-tune your password with toggles for uppercase letters, lowercase letters, numbers, and symbols.
  - **Cryptographically Secure**: Leverages the Web Crypto API (`crypto.getRandomValues`) for high-quality, unpredictable randomness.
  - **One-Click Copy**: Easily copy the generated password to your clipboard.
- **Modern & Responsive Design**:
  - **Tailwind CSS**: A clean, mobile-first design that looks great on any device.
  - **Animated Cosmic Background**: A beautiful, non-intrusive animated background provides a unique and engaging aesthetic.
  - **Friendly UX**: Centralized layout, clear calls-to-action, and interactive elements create a comfortable user experience.

## 🛠️ Key Technologies

- **Frontend**: [React 18](https://reactjs.org/) (with Hooks), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Core Logic**: Pure TypeScript/JavaScript, utilizing the browser's native [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) for secure random number generation.

##  SEO & Accessibility

This project was built with search engine visibility and user accessibility in mind.
- **Rich Metadata**: Comprehensive `meta` tags, Open Graph data, and Twitter card information ensure excellent social sharing previews.
- **JSON-LD Schema**: Detailed schema definitions for `WebApplication`, `WebSite`, `Article`, and `FAQPage` provide rich context for search engines, improving search result appearance.
- **Semantic HTML**: Proper use of HTML tags ensures the application is understandable by both crawlers and screen readers.

## 📁 Project Structure

```
/
├── public/
│   ├── index.html        # Main HTML file with SEO metadata and JSON-LD Schema
│   └── favicon.svg       # Site favicon
├── src/
│   ├── components/
│   │   ├── ThemeLayout.tsx   # Main layout, cosmic background, header, footer
│   │   └── PasswordTool.tsx  # Core UI for checker and generator
│   ├── utils/
│   │   ├── SecurityMath.ts   # Core logic for strength calculation and generation
│   │   └── SeoArticle.tsx    # Component for the collapsible SEO article
│   ├── App.tsx             # Main application component
│   └── index.tsx           # React entry point
├── README.md             # This file
├── ...
```

## 🚀 Getting Started

To run this project locally:

1.  **Clone the repository**: `git clone <repository-url>`
2.  **Navigate to the project directory**: `cd cosmic-pass`
3.  **Install dependencies**: `npm install`
4.  **Start the development server**: `npm start`
    The application will then be available at `http://localhost:3000`.

## ✒️ Author

**HSINI MOHAMED**
- **GitHub**: [hsinidev](https://github.com/hsinidev)
- **Email**: [hsini.web@gmail.com](mailto:hsini.web@gmail.com)
- **Website**: [doodax.com](https://doodax.com)

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
