---
name: rov-skill
description: Specialized knowledge and workflows for the RoV Draft Arena project. Use for: developing, debugging, or extending the RoV Draft training system (React + Firebase).
---

# RoV Draft Arena Skill

This skill provides guidance for working with the RoV Draft Arena project, ensuring consistency and preventing hallucinations when modifying the draft logic, UI, or Firebase integration.

## Project Overview

The **RoV Draft Arena** is a modern draft training system for Realm of Valor (RoV) built with **React 19**, **Firebase 12**, and **Vite**. It features a single-player draft mode against AI with a "Liquid Glass" UI.

## Core Workflows

### 1. Modifying Hero Data
When adding or updating heroes, always modify the `HEROES` array in `services/draftService.js`.
- **Structure**: `{ id: number, name: string, role: string, imageUrl: string }`
- **Roles**: Assassin, Mage, Tank, Support, Marksman, Warrior.
- **Image URLs**: Ensure URLs are accessible and follow the project's CDN pattern.

### 2. Updating Draft Logic
The draft logic is primarily handled in `pages/SinglePlayerDraft.jsx` and `services/draftService.js`.
- **Draft Order**: 15 phases (3 bans per team, 5 picks per team).
- **Timer**: 30-second countdown per phase.
- **AI Behavior**: AI picks/bans are triggered automatically when the current phase belongs to the opponent.

### 3. Firebase Integration
The project uses Firestore for data storage:
- **`drafts` collection**: Stores completed draft history.
- **`userStats` collection**: Stores user performance statistics.
- **Configuration**: Always refer to `firebaseConfig.js` for project credentials.

## Guidelines to Prevent Hallucinations

1. **Check `draftService.js` first**: Never assume the list of available heroes or their roles. Always read `services/draftService.js` to get the current state of the `HEROES` array.
2. **Follow the 15-Phase Format**: The draft system is strictly designed around a 15-phase competitive format. Do not introduce new phases or change the order without updating both the UI and the service logic.
3. **Maintain "Liquid Glass" UI**: When adding new components or pages, follow the existing CSS patterns in `styles/` to maintain the modern, translucent UI aesthetic.
4. **Use Firebase Services**: Always use the functions exported from `services/draftService.js` for Firestore operations instead of writing raw Firebase queries in components.

## Reference Materials

- **Project Structure**: See `references/project_structure.md` for a detailed file layout and component descriptions.
- **Firebase Config**: See `firebaseConfig.js` for initialization details.
- **Draft Logic**: See `pages/SinglePlayerDraft.jsx` for the state management of the draft process.

## Common Tasks

- **Add a new hero**: Update `HEROES` in `services/draftService.js`.
- **Change ban/pick duration**: Update the timer logic in `SinglePlayerDraft.jsx`.
- **Modify UI styles**: Edit the corresponding `.css` file in `styles/`.
- **Add a new page**: Create the component in `pages/`, add styles in `styles/`, and update routes in `App.jsx`.
