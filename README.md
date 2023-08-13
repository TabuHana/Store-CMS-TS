# Store-CMS-TS

[VIEW SITE HERE!](https://store-cms-client-dev.up.railway.app/)

<a name="Description"></a>

## Description

A robust and user-friendly content management system (CMS) tailored for stores offers seamless control over customers, orders,  and products. With the intuitive interface store owners can effortlessly update product information, track customer orders, and manage inventory. This CMS empowers businesses to curate an immersive online shopping experience, optimizing customer interactions and driving sales growth. 😎

| **Tabel of Contents**                           |
| ----------------------------------------------- |
| [Project Setup](#project-setup)                 |
| [Database](#database-architecture) |
| [Client](#client)                               |
| [Server](#server)                               |
| [Testing](#testing)                             |
| [Additional Info](#additional-info)             |

<a name="Project Setup"></a>

## Project Setup

This application is built using Typescript, therefore `node.js` is required. You can install node.js [here](https://nodejs.org/en/).\
Aditionally you will need `git` installed. You can install git [here](https://git-scm.com/downloads).

Run `git clone <project URL>` in your terminal to add the project to your system.\
Once you have the project run `npm run package`.\
This will install the all server and client side dependencies.

You will need to create a `.env` file for each folder. Check below for details!

Finally to start the project simply run `npm run dev` and you'll have the development version of the application.

<a name="Database"></a>

## Database

Information Coming soon 😉

<a name="Client"></a>

## Client
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

## Server


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

This project is insipired by my buddy [Daniel Moore](https://github.com/daedadev). Check out his version [here](https://github.com/daedadev/Shop-CMS).

Feel free to contact me [via email](nate31196@outlook.com) at nate31196@outlook.com for anymore information or for information on how to contribute. ❤️
