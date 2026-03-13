# Portfolio

A modern personal portfolio showcasing my software development projects across web development, backend programming, databases and embedded systems.  
The site is intentionally built without frameworks to keep the structure lightweight, readable and easy to maintain.

Live site: https://llaamari.github.io/portfolio/

## Features

- Clean, responsive single-page portfolio
- Projects loaded from a JSON file for easy maintenance and extension
- Project cards with image previews, categories and technologies
- Detailed modal view with:
  - multiple project images in a responsive grid
  - project description, technologies and key implementation highlights
  - clickable images with a lightbox view
- Search and category filtering for browsing projects
- Dark / light theme with persistence via `localStorage`
- Accessibility-focused implementation:
  - keyboard navigation
  - visible focus states
  - semantic HTML
- Contact form powered by Formspark (no custom backend required)
- Dedicated “Thank you” page after form submission

## Technologies

- **HTML5** – semantic, accessible markup  
- **CSS3** – modern layout with Grid, Flexbox, theming and responsive behavior  
- **JavaScript (Vanilla)** – UI logic, project rendering, filtering, modal and lightbox handling  
- **JSON** – structured project content separated from the UI layer  
- **Formspark** – form handling without a custom backend  

No frameworks by design – the goal is clarity, performance and maintainability.

## Project Structure
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
  ├── avatar.png
  └── projects/
    └── project pictures
```
- **projects.json** → all project data (content, technologies, images)
- **styles.css** → themes, layout and reusable components
- **app.js** → filtering, search, modals, lightbox and theme logic
- **assets/projects/** → project preview images

## Project Images

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

## Local Development

The project can be opened directly in a browser or served locally:
```bash
python -m http.server 8000
```
Then open:<br>
http://localhost:8000

## Project Goals

- Present software projects in a way that is clear and easy to browse
- Demonstrate strong **HTML, CSS and JavaScript fundamentals**
- Show attention to **UI detail, UX, accessibility and maintainability**
- Keep the codebase **clean, readable and extensible**
- Serve as a realistic portfolio project that can be updated as new work is added

## Contact

Feel free to reach out via the contact form on the website or through GitHub.<br>
© Laura Similä
