# About

A React+Express app to find country informations including a search bar and an interactive map.

![home](https://github.com/CraneWvs/Pictures/blob/main/Country-Explorer/home.png)

![detail](https://github.com/CraneWvs/Pictures/blob/main/Country-Explorer/detail.png)

![list](https://github.com/CraneWvs/Pictures/blob/main/Country-Explorer/list.png)

# Setup
*Note: Node.js required for local running.*
## Front-end

Go to the root directory of front-end app ('./frontend')
Run
```
# install packages
npm install
# run local server
npm run dev
```
If success, information like below is shown:
```
> frontend@0.0.0 dev
> vite


  VITE v5.0.4  ready in 277 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Back-end

Go to the root directory of front-end app ('./backend')
Run
```
# install packages
npm install
# run local server
node src/server.js
```
If success, information like below is shown:
```
Server is running on port 3001
```

Open browser and access `http://localhost:5173/` to see the app.

*Note: if the port is different from above, go to the `./backend/.env` file or `./frontend/.env.development` file to modify the port, which can match front and backend server*.