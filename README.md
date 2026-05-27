# Woliba Registration Flow

## Features

- Multi-step registration with controlled validation
- Local state persistence with Redux Toolkit
- Clear routing and layout separation
- Mobile-first layout with Tailwind CSS
- Reusable form and UI primitives

## Tech Stack

- React + Vite
- JavaScript (no TypeScript)
- Redux Toolkit + React Redux
- React Router DOM
- Tailwind CSS
- Lucide React icons

## Requirements

- Node.js 18+ (recommended)
- npm 9+

## Quick Start

```bash
npm install
npm run dev
```

Open the Vite URL and visit:

```bash
/registration
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Project Structure

```bash
src/
├── assets/              # Images and video assets
├── components/
│   ├── forms/           # Reusable form controls
│   ├── layouts/         # Page layouts
│   └── ui/              # Shared UI primitives
├── constants/           # Route and option constants
├── pages/               # Registration flow screens
├── redux/               # Redux store and slices
├── routes/              # Route configuration
├── styles/              # Global styles
├── utils/               # Validation helpers
├── App.jsx
└── main.jsx
```

## Registration Flow

1. Verify company name and company password
2. Save user details locally and continue to OTP
3. Verify 6-digit OTP locally
4. Complete login credentials and profile details
5. Select wellness interests
6. Select exactly 3 wellbeing pillars
7. Show processing loader
8. Show welcome screen

API integration is intentionally omitted for the test task. Add it later inside a dedicated `src/api/` or `src/services/` layer.

## Validation Rules

- Company password requires at least 8 characters, 1 uppercase letter, and 1 number.
- Email must use a valid email format.
- First and last names allow letters and spaces only.
- OTP requires 6 digits.
- Profile password and confirm password must match.
- Phone number requires 7 to 15 digits with optional leading `+`.
- At least one wellness interest is required.
- Exactly 3 wellbeing pillars are required.

## State Management

Global state is stored in Redux and scoped to the registration flow. The registration slice contains form data, validation state, and the current step index.

## Routing

Routes are centralized in `src/routes/AppRoutes.jsx`. The registration flow is mounted under `/registration`.

## Build and Preview

```bash
npm run build
npm run preview
```

## Deployment Notes

- The app is a static SPA built with Vite.
- Configure your host to serve `index.html` for all routes.
- For production, set up caching for assets under `/assets/` and no-cache for `index.html`.

## Testing

No automated tests are configured in this repository. If you add tests, keep them colocated with the features they cover and wire scripts in `package.json`.

## Contributing

1. Create a feature branch.
2. Keep commits focused and descriptive.
3. Run `npm run lint` before opening a PR.