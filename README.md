# Comments Component

> A React component for comments

## 🚀 How to run

```bash
npm i
npm run dev
```

## 🧪 How to test

```bash
npm run test
```

## 🧰 Tech stack

- Vite + React + TypeScript
- Tailwind CSS
- Dexie (IndexedDB) for persistence

## ✨ Features

- List comments
- Add / **Delete (cascade)**
- **Nested replies** (deep threads work)
- Data **stays after refresh** (IndexedDB)

## ⏭️ If I had more time

- **Tombstone delete** (keep child comments, show “deleted” marker)
- **User avatars**
- **Better accessibility** (e.g. close menus with **Esc**, improve focus states)
- **Loading state** (skeleton for initial load and after actions)
- **Multi-tab sync** with BroadcastChannel 😔
- **Local-first sync** (add a `syncAll()` to push IndexedDB changes to the server and pull updates back when online)

---

### Thanks for reviewing! 😊
