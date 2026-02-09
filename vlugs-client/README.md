# Vlugs Try-On Studio Client

AI-powered virtual try-on experience built with modern web technologies.

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

Follow these steps to set up the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd vlugs-client

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server with auto-reloading
npm run dev
```

## Development

- **Dev Server**: `npm run dev` - Starts the development server on port 8080
- **Build**: `npm run build` - Builds the project for production
- **Lint**: `npm run lint` - Runs ESLint to check code quality
- **Test**: `npm run test` - Runs tests once
- **Test Watch**: `npm run test:watch` - Runs tests in watch mode
- **Preview**: `npm run preview` - Preview production build locally

## Technologies

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **shadcn-ui** - High-quality UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Framer Motion** - Animation library
- **Vitest** - Unit testing framework

## Project Structure

```
src/
├── components/     # React components
│   └── ui/        # shadcn-ui components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and API calls
├── assets/        # Static assets
└── main.tsx       # Application entry point
```

## Deployment

Build the project and deploy the contents of the `dist` directory to your hosting platform.

```sh
npm run build
```
