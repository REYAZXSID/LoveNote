# LoveNote

A Next.js application to capture and cherish your love notes forever. Built with Firebase Studio.

## Features

- **Daily Love Notes**: Get a beautiful love note every day.
- **Calendar View**: See all your memories at a glance.
- **Note Editor**: Create and edit your notes with a mood selector.
- **AI-Powered Suggestions**: Get inspiration for your notes with AI.
- **Responsive Design**: Looks great on all devices.

---

## Deployment on Vercel

This project is ready to be deployed on [Vercel](https://vercel.com/), a platform for hosting modern web applications.

### Step-by-Step Guide

1.  **Sign up on Vercel**: If you don't have an account, sign up for free at [vercel.com](https://vercel.com/).
2.  **Connect Your Git Repository**: Connect your GitHub, GitLab, or Bitbucket account to Vercel.
3.  **Import Your Project**:
    *   From your Vercel dashboard, click "Add New... > Project".
    *   Select your "LoveNote" repository.
    *   Vercel will automatically detect that this is a Next.js project and configure the build settings for you.
4.  **Configure Environment Variables**:
    *   Before deploying, you need to add your Firebase configuration as environment variables.
    *   In your Vercel project settings, go to the "Environment Variables" section.
    *   Add the following variables with their corresponding values from your local `.env` file (if you have one) or your Firebase project settings:
        *   `NEXT_PUBLIC_FIREBASE_API_KEY`
        *   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
        *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
        *   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
        *   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
        *   `NEXT_PUBLIC_FIREBASE_APP_ID`
        *   `NEXT_PUBLIC_FIREBASE_VAPID_KEY`
5.  **Deploy**:
    *   Click the "Deploy" button. Vercel will build and deploy your application.
    *   Once the deployment is complete, you'll be given a live URL for your "LoveNote" app!
