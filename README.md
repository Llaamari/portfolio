# Portfolio

A personal portfolio showcasing my skills in front-end development, user interface refinement and accessibility.  
The project was intentionally implemented without frameworks to ensure that the structure, code and user experience are clear and easy to understand.

👉 Live: https://llaamari.github.io/portfolio/

---

## ✨ Features

- Clear and responsive single-page portfolio
- Projects are retrieved from a JSON file (easy to maintain and expand)
- Project cards with image previews
- More detailed presentation of projects in a modal window
  - Multiple images in a two-column grid
  - Project description, technologies and highlights
- Search and filter projects
- Dark/light theme (remembered in `localStorage`)
- Accessibility taken into account:
  - Keyboard support
  - Focus states
  - Semantic HTML
- Contact form via Formspark
- Separate "Thank you" page after submitting the form

---

## 🛠️ Technologies

- **HTML5** – semantic and accessible structure
- **CSS3** – modern layout (Grid, Flexbox), themes and responsiveness
- **JavaScript (Vanilla)** – UI logic, state, modals and theme management  
- **Formspark** – form processing without a backend  

No frameworks – lightweight, fast and easy to read.

---

## 📁 Project structure
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
└──assets/
  ├── avatar.svg
  └── projects/
    └──project pictures
```
- **projects.json** → all project information (texts, technologies, images)
- **styles.css** → themes, layout and components
- **app.js** → search, filtering, modals and theme management
- **assets/projects/** → project image previews

---

## 🖼️ Project images

For each project, 1–4 images can be added to the `projects.json` file:

```json
"images": [
  "assets/projects/example-1.png",
  "assets/projects/example-2.png"
   etc.
]
```
- The first image is displayed as a preview on the project card.
- All images are displayed in a two-column grid in the modal.
- If there are no images, the UI still functions normally.

## 🚀 Development and local driving

The project can be opened directly in a browser or run on a local server:
```bash
python -m http.server 8000
```
Open in browser:<br>
http://localhost:8000

## 🎯 Project objectives

- Demonstrate expertise in front-end development and UI refinement
- Emphasize accessibility and user experience
- Keep code clear, readable and easily extensible
- Serve as a realistic, production-level portfolio example

## 📬 Contact

Please contact me via the form on my portfolio page or via my GitHub profile.<br>
© Laura