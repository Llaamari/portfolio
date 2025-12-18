# Portfolio

A modern personal portfolio showcasing my front-end skills, projects and approach to building clear, accessible user interfaces.  
The site is intentionally built without frameworks to keep the structure lightweight, readable and easy to maintain.

👉 Live site: https://llaamari.github.io/portfolio/

---

## ✨ Features

- Clean, responsive single-page portfolio
- Projects loaded from a JSON file (easy to maintain and extend)
- Project cards with image previews
- Detailed project view in a modal
  - multiple images displayed in a two-column grid
  - project description, technologies and highlights
  - clickable images with a lightbox view
- Search and filter functionality for projects
- Dark / light theme with persistence via `localStorage`
- Accessibility-focused implementation:
  - keyboard navigation
  - visible focus states
  - semantic HTML
- Contact form powered by Formspark (no backend required)
- Dedicated “Thank you” page after form submission

---

## 🛠️ Technologies

- **HTML5** – semantic, accessible markup  
- **CSS3** – modern layout (Grid & Flexbox), theming, responsiveness  
- **JavaScript (Vanilla)** – UI logic, state handling, modals and theming  
- **Formspark** – form handling without a custom backend  

No frameworks by design – the goal is clarity, performance and maintainability.

---

## 📁 Project Structure
```
portfolio/
├── index.html
├── thank-you.html
├── data/
│ └── projects.json
├── styles/
│ └── styles.css
├── scripts/
│ └── app.js
└── assets/
  ├── avatar.svg
  └── projects/
    └── project pictures
```
- **projects.json** → all project data (content, technologies, images)
- **styles.css** → themes, layout and reusable components
- **app.js** → filtering, search, modals, lightbox and theme logic
- **assets/projects/** → project preview images

---

## 🖼️ Project Images

Each project can define one or more images in `projects.json`:

```json
"images": [
  "assets/projects/example-1.png",
  "assets/projects/example-2.png"
]
```
- the first image is used as a preview in the project card
- all images are shown in the modal in a responsive grid
- images can be opened in a lightbox for a larger view
- projects without images are handled gracefully

## 🚀 Local Development

The project can be opened directly in a browser or served locally:
```bash
python -m http.server 8000
```
Then open:<br>
http://localhost:8000

## 🎯 Project Goals

- Demonstrate strong **front-end fundamentals**
- Show attention to **UI detail, UX and accessibility**
- Keep the codebase **clean, readable and extensible**
- Serve as a realistic, production-level portfolio project

## 📬 Contact

Feel free to reach out via the contact form on the website or through GitHub.<br>
© Laura Similä