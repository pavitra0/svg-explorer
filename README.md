
# SVG Icon Explorer

A modern and intuitive web application to browse, search, and copy a vast collection of SVG icons.

![SVG Icon Explorer Screenshot](https://storage.googleapis.com/aistudio-ux-team-public/sdk_gallery_images/icon-explorer-screenshot.png)

## ✨ Key Features

- **Instant Search**: Find icons in real-time with a debounced search input.
- **Category Filtering**: Browse icons by categories, fetched dynamically from the API.
- **Light & Dark Mode**: Seamlessly switch between light and dark themes. Your preference is saved in local storage.
- **Icon Detail Panel**: Click any icon to open a slide-in panel with a larger preview.
- **Code Snippets**: Instantly get SVG and JSX code for any icon, ready to be copied to your clipboard.
- **Responsive Design**: A clean, responsive interface that works beautifully on all screen sizes.
- **Modern UI/UX**: Built with a focus on a great user experience, including tooltips, loading states, and click feedback.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first styling approach.
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts.

## 🚀 Getting Started

This project is set up to run directly in the browser with no build step required.

1.  **Clone the repository (or download the files):**
    ```bash
    git clone https://github.com/your-username/svg-icon-explorer.git
    cd svg-icon-explorer
    ```

2.  **Serve the directory:**
    You can use any simple local web server. If you have Python installed, you can run:
    ```bash
    # For Python 3
    python -m http.server
    ```
    Or use the popular `serve` package:
    ```bash
    npx serve
    ```

3.  **Open your browser:**
    Navigate to the local address provided by your server (e.g., `http://localhost:8000` or `http://localhost:3000`).

## 📁 Project Structure

```
.
├── components/          # Reusable React components
│   ├── CategoryList.tsx
│   ├── Header.tsx
│   ├── IconCard.tsx
│   ├── IconDetailModal.tsx
│   ├── IconGrid.tsx
│   ├── Loader.tsx
│   ├── Logo.tsx
│   ├── SearchBar.tsx
│   └── Sidebar.tsx
│   └── Tooltip.tsx
├── hooks/               # Custom React hooks
│   └── useDebounce.ts
├── services/            # API interaction logic
│   └── svgService.ts
├── App.tsx              # Main application component
├── index.html           # HTML entry point
├── index.tsx            # React root renderer
├── types.ts             # TypeScript type definitions
└── README.md            # You are here!
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
