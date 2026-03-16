# RA Artist Event Notifier — Frontend

A minimal Next.js web app that lets users sign in with their email and manage the artists they want to track for Berlin events.

---

## Pages

### Sign In `/`

![Sign In Page](https://i.imgur.com/0EUsZYF.png)

Users enter their email address to sign in. If the email doesn't exist in the database, a new account is created automatically. The email is then stored in `localStorage` and the user is redirected to the artists page.

---

### Artists `/artists`

![Artists Page](https://i.imgur.com/qFhSykr.png)

Users can view, add, and remove artists they want to follow. The list is fetched from MongoDB and updates instantly on every change.

---

## Live Demo

🔗 [Deployed Link](https://new-events-notification-frontend.vercel.app/) 

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules** — dark theme, `Bebas Neue` + `IBM Plex Mono`
- **MongoDB** via native driver

---

## Project Structure

```
app/
├── page.tsx                  # Sign-in page
├── page.module.css
├── artists/
│   ├── page.tsx              # Artist management page
│   └── artists.module.css
└── api/
    ├── users/
    │   └── route.ts          # POST /api/users — create user
    └── artists/
        └── route.ts          # GET / POST / DELETE /api/artists
```

---

## API Routes

### `POST /api/users`
Creates a new user if the email doesn't already exist.

**Body:** `{ email: string }`

---

### `GET /api/artists`
Returns the list of artists the user follows.

**Header:** `email: string`

---

### `POST /api/artists`
Adds an artist to the user's list. Also creates an entry in the global `artists` collection if it doesn't exist yet.

**Body:** `{ email: string, artist: string }`

---

### `DELETE /api/artists`
Removes an artist from the user's list.

**Body:** `{ email: string, artist: string }`

---

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

---

## Design

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Text | `#f0ede8` |
| Accent | `#e8ff00` |
| Display font | Bebas Neue |
| Body font | IBM Plex Mono |
