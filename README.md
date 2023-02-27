# EMDASH Text RPG 

## Todos:
 
- add archive col to threads db so users can archive finished threads + admin can auto archive stale threads
- Move shared js into a lib folder and update to use $/lib imports  https://kit.svelte.dev/docs/modules#$lib
- Standardize language conventions for toggling crud modals. (`openEditModal`, `openDeleteModal`, `openEditModal`).
- Standardize component naming for clarity 
- Figure out how to use +server.js file types to fetch supabase DB data faster versus on page.js/page.svelte files
- collapse CRUD uis so that there's a  ThreadCRUD, CharacterCRUD, PostCRUD, etc. 






----------------


# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
