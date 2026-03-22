import './About.css';

function About() {
  return (
    <div className="page about-page">
      <h1>About</h1>
      <div className="about-card">
        <p>
          This project follows a scalable folder structure with dedicated
          directories for <strong>components</strong>, <strong>pages</strong>,
          and <strong>services</strong>.
        </p>
        <ul>
          <li>
            <strong>Components</strong> — Reusable UI elements (buttons, cards,
            modals, etc.)
          </li>
          <li>
            <strong>Pages</strong> — Top-level route views (Home, About,
            Dashboard, etc.)
          </li>
          <li>
            <strong>Services</strong> — API calls and business logic (api.ts,
            userService.ts, etc.)
          </li>
          <li>
            <strong>Router</strong> — Centralized route configuration with
            layout wrappers
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
