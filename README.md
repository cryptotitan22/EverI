# Simple Chat (No Database, No Cost)

Ekta realtime chat app jekhane kono message store hoy na. Sob message shudhu
connected user der majhe live relay hoy — server memory te o kono message
save thake na. Server restart korle sob gone jabe.

## Kivabe Local e Chalabe

```bash
npm install
npm start
```

Tারপর browser e খোলো: `http://localhost:3000`

## Kivabe GitHub e Push Korbe

```bash
git init
git add .
git commit -m "Initial commit: simple no-db chat app"
git branch -M main
git remote add origin https://github.com/<tomar-username>/<repo-name>.git
git push -u origin main
```

## Free Deploy Korbe Kivabe (Render.com)

1. [render.com](https://render.com) e free account banao (GitHub diye login kora jay)
2. "New +" -> "Web Service" select koro
3. Tomar GitHub repo connect koro
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Deploy dile ekta free URL pabe (jemon `https://tomar-app.onrender.com`)

> Note: Render er free tier e app inactive thakle "sleep" e chole jay,
> prothom request e ektu delay hote pare (~30-50 sec) — eta normal, kono
> cost lagbe na.

## Alternative Free Hosting

- **Railway.app** — free tier, similar process
- **Cyclic.sh** — Node.js app er jonno free, always-on
- **Fly.io** — free allowance ache, thoda beshi setup lage

## Kivabe Kaj Kore (Architecture)

- **Backend:** Express + Socket.io — WebSocket connection er madhyome
  realtime message pathay
- **Frontend:** Plain HTML/CSS/JS — kono framework lagena
- **Storage:** KONO NAI. Message gula shudhu `io.emit()` diye connected
  shokol client er kache pathiye deya hoy, kothao likhe rakha hoy na.
  Ei karone message history bole kichu nai — join korar por theke jei
  message ashbe shudhu shei gula dekha jabe.

## Improve Korte Chaile (Optional)

- **Private rooms/1-to-1 chat:** Socket.io "rooms" feature use koro
- **File/image sharing:** Socket.io diye base64 pathano jay (choto file
  er jonno), ba WebRTC diye direct peer-to-peer
- **Better UI:** React diye rewrite kora jay, logic same thakbe
