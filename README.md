# Woliba Registration Flow

A responsive multi-step user registration flow for Woliba, built with React, Vite, Redux, Axios, React Router, and Tailwind CSS.

## Live Deployment

Vercel deployment: https://woliba-registration.vercel.app/registration

## Clone And Run 

```bash
git clone https://github.com/Yash-M-eng/woliba-registration.git
cd woliba-registration
npm install
npm run dev
```

Open the local Vite URL and visit:

```bash
/registration
```

## Environment

Local development can use the Vite API proxy by leaving `VITE_API_BASE_URL` unset.

To call the API directly, create an `.env` file:

```bash
VITE_API_BASE_URL=https://dev.woliba.io/v1/
```

## Tech Stack

- React + Vite
- Redux Toolkit + React Redux
- React Router DOM
- Axios for API calls
- React Toastify for toast messages
- Tailwind CSS for styling
- Lucide React icons

## Folder Structure

```bash
src/
├── assets/                    # Images and loader video
├── components/
│   ├── forms/                 # Reusable form controls
│   ├── layouts/               # Registration layout
│   ├── registration/          # Registration flow components
│   └── ui/                    # Shared UI primitives
├── constants/                 # Routes and static constants
├── pages/                     # Page-level route controllers
├── redux/                     # Store and registration slice
├── routes/                    # App routing
├── services/                  # Axios API service
├── styles/                    # Tailwind/global styles
├── utils/                     # Validation and toast helpers
├── App.jsx
└── main.jsx
```

## Registration Flow

```mermaid
flowchart TD
  A[Start: /registration] --> B[Verify Company Name + Password]
  B --> C[User Details + Send OTP]
  C --> D[Verify OTP]
  D --> E[Login Credentials + Profile Details]
  E --> F[Select Wellness Interests]
  F --> G[Select 3 Wellbeing Pillars]
  G --> H[/dashboard/registrationloader]
  H --> I[/dashboard/welcome]
```

## API Integration

API calls are handled with Axios in `src/services/registrationApi.js`.

Integrated endpoints:

- Verify company name and password
- Save user details and send OTP
- Verify OTP
- Resend OTP
- Get wellness interests
- Get wellbeing pillars
- Complete user registration

Redux is used to store registration data, company details, OTP token, selected interest IDs, selected pillar IDs, and final registration result where needed.

## Error Handling

The app includes production-level error boundaries:

- App-level boundary
- Route/page-level boundary
- Step-level boundary
- Input/field-level boundaries

API errors are normalized from backend responses and shown with toast messages. JSON and XML backend error responses are supported.

## Validation

Proper validation is added for all input fields:

- Company name is required
- Company password is required and validated
- Email format is validated
- First and last names allow letters and spaces only
- OTP accepts digits only and requires 6 digits
- Password and confirm password must match
- Phone number accepts digits only
- Terms and privacy policy must be accepted
- At least one wellness interest is required
- Exactly 3 wellbeing pillars are required

Calendar validation is also added:

- Users cannot select future dates for birthday
- Future dates are disabled in the calendar picker
- Future date values are blocked during form validation

## Responsive Design

The UI is built with Tailwind CSS and is responsive across mobile, tablet, and desktop devices.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Deployment

The project is deployed on Vercel. For production builds:

```bash
npm run build
```

Vercel should serve the Vite SPA and fallback routes to `index.html`.
