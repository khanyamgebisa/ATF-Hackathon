# ATF Hackathon Execution Tasks

Use this file as the execution checklist for GitHub Copilot / VS Code Copilot.

## Goal
Build and publish a public hackathon-ready prototype for a South African talent intelligence platform, with at least one end-to-end feature and a public deployment URL.

## Required final outcome
- Public GitHub repository
- React + Vite app running successfully
- At least one end-to-end flow is complete
- App deployed publicly via GitHub Pages
- Judges can open the app and see a working demo

## End-to-end feature to prioritize
The primary end-to-end flow should be:
1. User fills out a talent profile form
2. Profile is saved locally in browser storage
3. Dashboard updates with profile totals, filters, and aggregate analytics
4. User submits employer demand
5. Skills gap dashboard updates based on demand

This is the core demo story to emphasize in the repo and pitch.

## Task list

### 1) Project setup verification
- Confirm the repo contains the build files:
  - package.json
  - vite.config.ts
  - index.html
  - src/main.tsx
  - src/App.tsx
  - src/index.css
- Confirm dependencies are installed and app builds successfully.
- Fix any missing app entry or config issues before continuing.

### 2) App completion
- Ensure the app renders without runtime errors.
- Keep the UI polished and responsive for hackathon judges.
- Make sure the landing page, profile form, employer dashboard, and skills-gap visualizations are present.
- Make the app visually coherent and modern.

### 3) End-to-end feature implementation
- Implement a working profile form for youth talent registration.
- Save the profile in browser localStorage.
- Ensure the dashboard reflects the saved profile counts and analytics.
- Add skill filter logic to the dashboard.
- Implement employer demand submission.
- Ensure the skills gap chart updates from demand data.
- Confirm the feature works across refreshes without crashing.

### 4) Data and analytics
- Use realistic sample data for demo purposes.
- Create aggregate charts for:
  - employment status
  - qualification distribution
  - province distribution
  - NQF distribution
  - skills vs vacancy demand
- Ensure the UI reads clearly for judges and non-technical viewers.

### 5) Deployment configuration
- Update Vite config for GitHub Pages base path.
- Use a GitHub Pages deployment workflow in `.github/workflows/deploy.yml`.
- Confirm the repo is public.
- Enable GitHub Pages in repository settings using GitHub Actions.

### 6) Documentation
- Write a clean README explaining:
  - what the app does
  - how to run locally
  - the end-to-end demo flow
  - GitHub Pages deployment steps
  - the stack used

### 7) Validation and final polish
- Run `npm install`
- Run `npm run build`
- Fix TypeScript or Vite build errors
- Verify there are no console errors in the browser
- Confirm the deployed page loads publicly
- Make sure the app is easy to demo in under 5 minutes

## Acceptance criteria
- App loads successfully in browser
- A profile can be created and persists after refresh
- Dashboard updates with the submitted profile data
- Employer demand can be submitted and reflected in the skills-gap section
- Repo is public
- GitHub Pages deployment is live
- README clearly states how to run and where the app is deployed

## Suggested commands
Run these in terminal when the work is ready:

```bash
npm install
npm run build
npm run dev -- --host 0.0.0.0
```

## Deployment URL target
Use this as the target public URL if repository is `khanyamgebisa/ATF-Hackathon`:

https://khanyamgebisa.github.io/ATF-Hackathon/

## Important notes
- Keep the demo simple, polished, and presentation-friendly.
- Judges care more about a working end-to-end flow than a huge feature set.
- One complete flow is better than multiple broken features.
- Prefer a reliable local demo and clean public deployment over complex backend integrations that might fail under time pressure.

## Copilot execution prompt
Use this prompt with VS Code Copilot if needed:

"Review this repo, fix any missing app setup issues, ensure the prototype implements one complete end-to-end flow from profile submission to dashboard analytics, configure GitHub Pages deployment, and make sure the app builds cleanly and is ready for public deployment."
