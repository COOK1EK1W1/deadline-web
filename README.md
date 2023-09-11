
## Deadline-o-matic website

[Current Deployment](https://deadline-web.vercel.all)

This website accompanies the [deadline bot](https://github.com/COOK1EK1W1/Deadline-o-matic)

## Contributing
### prerequisites:
- make sure you have node and npm installed preferably `node 18 lts`
- have a postgresql server
### installation
- first fork and download the repo with `git clone`
- install the dependencies with `npm install`
- create a `.env` file in the project directory and add the environment variables
  - LOCAL_ADDRESS="http://localhost:3000"
  - POSTGRES_URL=""
  - POSTGRES_HOST="postgres://..."
  - POSTGRES_USER="default"
  - POSTGRES_PASSWORD=""
  - POSTGRES_DATABASE=""

- TODO create a database of the correct schema

- run `npm run dev` to start the server
- run `npm run build` to build the website

