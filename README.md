# EMDASH Text RPG 

## Todos:

I believe this is the correct way to re-map everything so concerns are properly separated:

- `+server.js` should probably be used for authentication globally?
- `+page.server.js` should fetch the thread/forum details by id and then fetch all of the thread/post details matching the forum/thread id and return them as props. 
- `+page.js` should handle the user's interactions with the page.
- `+page.svelte` should handle the rendering of the page, using the props from +page.server.js and the user's interactions from `+page.js`.

-- is it okay/good to keep my store files as is, with each CRUD action centralized?
-- do i need to simplify my current store system? 
--- 
- look into implementing [svelte tip-tap](https://tiptap.dev/installation/svelte) for rich text. 
- set character limit to 3 for free tier. 
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
