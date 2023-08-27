# Store-CMS-TS

[VIEW SITE HERE!](https://store-cms-client-dev.up.railway.app/)

<a name="Description"></a>

## Description

Store-CMS is a content management system (CMS) tailored for small businesses designed to help organize and aliviate the stresses of owning a small buisness. Manage all your customers, orders, and products, all in one place and all for free, using a very simplistic and easy to understand design. 😎

| **Tabel of Contents**                           |
| ----------------------------------------------- |
| [Project Setup](#project-setup)                 |
| [ENV Setup](#env-setup)                 |
| [Database](#database-architecture) |
| [Client](#client)                               |
| [Server](#server)                               |
| [Testing](#testing)                             |
| [Additional Info](#additional-info)             |

<a name="Project Setup"></a>

## Project Setup

This project is hosted via railway, but if you wish to run it locally feel free.\

This application is built using Typescript, therefore `node.js` is required. You can install node.js [here](https://nodejs.org/en/).\
Aditionally you will need `git` and a local instance of `SQL` installed.\
You can install git [here](https://git-scm.com/downloads) and you can download and install mySQL workbench [here](https://dev.mysql.com/downloads/workbench/).\

Run `git clone <project URL>` in your terminal or download it via github to add the project to your system.\
Once you have the project, run `npm run package` from the root of the project.\
Then open up the server folder and navigate to config to add your environment variables. If you are running locally, you do not need to create a `.env` file here. Simply add your varibles in `default.ts`.\
Next navigate to the client folder and add `.env.local` in the root of that folder.
Finally, you're ready to run the application by running `npm run dev` in the root of the project.

<a name="ENV Setup"></a>

## Env Setup

If you wish to host your own version, make sure to not skip this section!

<strong>Server</strong>
Create a `.env` file in the root of `/server`. You will need to match the names on the right in `/server/config/custom-environment-variables.ts` with the names in your `.env` file.
You can generate your own public and private RSA keys [here](https://travistidwell.com/jsencrypt/demo/). If you wish to encode your keys, please be sure to add in a buffer in `/server/src/middleware/deserializedUser.ts`. An encoding tool can be found [here](https://www.base64encode.org/), but feel free to use an encoding tool of your choice. Be aware, you do not need to encode your keys in order for the application to run.

<strong>Client</strong>
Create a `.env.local`. in the root of `/client`. You only need to add `VITE_SERVER_ENDPOINT=http://localhost:5000` into the file. If you are using another port to run your server, please be sure to match it or else your client will not be able to connect to your server!

Finally to start the project run `npm run dev`.

<a name="Database"></a>

## Database

Information Coming soon 😉

<a name="Client"></a>

## Client Structure
<details>
    <summary>Client File Structure</summary>
    <br>

```
/client
    /public
    /src
        /assests
        /components
            /Deposits
            /Footer
            /Header
            /ListItems
            /Nav
            /Orders
            /Stats
            /Title
        /context
        /pages
            /auth
                /login
                /register
            /customers
            /dashboard
            /landing
            /notFound
            /orders
            /products
            /settings
            /statistics
        /app.tsx
```    
<br>
</details>

<a name="Server"></a>

## Server Structure


<details>
<summary> Server File Structure</summary>
<br>

```
/server
    /config
        /default.ts
        /custom-environment-variables.ts
        /test.ts
    /src
        /controllers
            /user.controller.ts
            /session.controller.ts
            /customer.controller.ts
            /order.controller.ts
            /item.controller.ts
            /stock.controller.ts
            /category.controller.ts
            /color.controller.ts
        /middleware
            /deserializedUser.ts
            /requireUser.ts
            /validateResource.ts
        /models
            /user.model.ts
            /session.model.ts
        /schemas
            /user.schemas.ts
            /session.schemas.ts
            /customer.schemas.ts
            /order.schemas.ts
            /item.schemas.ts
            /stock.schemas.ts
            /category.schemas.ts
            /color.schemas.ts
        /services
            /user.services.ts
            /session.services.ts
            /customer.services.ts
            /order.services.ts
            /item.services.ts
            /stock.services.ts
            /category.services.ts
            /color.services.ts
        /utils
            /connect.ts
            /jwt.utils.ts
            /logger.ts
            /server.ts
        /routes
            /user.routes.ts
            /session.routes.ts
            /customer.routes.ts
            /order.routes.ts
            /item.routes.ts
            /stock.routes.ts
            /category.croutests
            /color.routes.ts
        /app.ts
```
<br>
</details>

<a name="Testing"></a>

## Testing

Information Coming soon 😉

<a name="Additional Info"></a>

## Additional Info

Feel free to contact me [via email](nate31196@outlook.com) at nate31196@outlook.com for anymore information or for information on how to contribute. ❤️

Idea insipired by my buddy [Daniel Moore](https://github.com/daedadev). Check out his version [here](https://github.com/daedadev/Shop-CMS).

