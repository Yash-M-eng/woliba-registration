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
  A["Start: /registration"] --> B["Verify Company Name + Password"]
  B --> C["User Details + Send OTP"]
  C --> D["Verify OTP"]
  D --> E["Login Credentials + Profile Details"]
  E --> F["Select Wellness Interests"]
  F --> G["Select 3 Wellbeing Pillars"]
  G --> H["/dashboard/registrationloader"]
  H --> I["/dashboard/welcome"]
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



## Preview Images 

Screen 1 : 
<img width="1288" height="649" alt="image" src="https://github.com/user-attachments/assets/60a1bf7b-e44f-4b6c-88d7-914520cb17d6" />

Screen 2 : 
<img width="1288" height="649" alt="image" src="https://github.com/user-attachments/assets/48653c30-3c07-4eb7-95dd-8a472080dae3" />

Screen 3 : 
<img width="1288" height="649" alt="image" src="https://github.com/user-attachments/assets/465b34ad-97dc-4d64-9879-cfaaf8e1faf2" />

Screen 4 :
<img width="1288" height="649" alt="image" src="https://github.com/user-attachments/assets/52698b85-1ab5-40ff-bfdb-e0fdad45018d" />


Screen 5 :
<img width="1288" height="649" alt="image" src="https://github.com/user-attachments/assets/6c9c97ee-f71f-4798-9c87-5727ea774c93" />


Screen 6 :
<img width="1288" height="649" alt="image" src="https://github.com/user-attachments/assets/4c27c0b4-fe1d-4b28-aa3a-6e0790e1d6c2" />

Screen 7 : 
<img width="1288" height="649" alt="image" src="https://github.com/user-attachments/assets/094880ec-f97a-454c-b73b-fa33fa63148f" />


Screen 8 : 
<img width="1288" height="649" alt="image" src="https://github.com/user-attachments/assets/6f0db845-053c-43d1-bace-5b9c783ea49d" />







