# Simple Chat (No Database, No Cost)

Ekta realtime chat app jekhane traditional database (MongoDB/MySQL/Postgres
etc.) kichu lagena. Message gula ekta simple `messages.json` file e save
hoy — kono message delete hoy na, server restart korleo age r shob message
thake. Notun user connect korle age theke joto message ache shob dekhte pabe.

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
- **Storage:** `messages.json` naam er ekta file e shob message append kora
  hoy (kono database nai, tobe delete o hoy na). Notun kono client connect
  korle server shei file theke shob purono message pathiye dey, tarpor
  notun je kono message ashle shathe shathe shobar kache live pathiye dey
  ebong file e o save kore rakhe.

### ⚠️ Ekta Important Point (Deploy Korar Somoy)

Onek free hosting platform (jemon Render.com er free tier) er "ephemeral
filesystem" thake — mane server restart/redeploy hole `messages.json` file
ta reset hoye jete pare, karon disk permanently save thake na. Ei karone:

- **Local e ba nijer VPS e** chalale message gula sotti e permanently
  thakbe (jotokkhon file ta delete na koro).
- **Render/Railway free tier e** deploy korle, app sleep/restart korle
  purono message harate pare — eta hosting er limitation, code er problem
  na.
- Permanently save rakhte chaile **Render er "Persistent Disk"** (paid
  feature) use korte hobe, ba free alternative hisebe **Railway.app**
  (jeta free tier e o volume support kore) try korte paro.

## Improve Korte Chaile (Optional)

- **Private rooms/1-to-1 chat:** Socket.io "rooms" feature use koro
- **File/image sharing:** Socket.io diye base64 pathano jay (choto file
  er jonno), ba WebRTC diye direct peer-to-peer
- **Better UI:** React diye rewrite kora jay, logic same thakbe
