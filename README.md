# Nextjs Static AB Testing

This example shows how you can AB test with nextjs without losing the benefits of static site generation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Setup edge config

1. Setup a new project in vercel, using the fork of this repo
2. Setup a new edge config in vercel
3. Paste the following on the edge config item tab (then save): 
```
{
  "ab_tests": [
    {
      "treatments": [
        {
          "size": 50,
          "route": "/pokemon/blastoise",
          "name": "blastoise"
        },
        {
          "size": 50,
          "route": "/pokemon/pikachu",
          "name": "pikachu"
        }
      ],
      "name": "pokemon_test",
      "defaultRoute": "/pokemon/pikachu",
      "routeTrigger": "/pokemon"
    }
  ]
}
```
4. Connect your project on the edge config project tab (select the new vercel project you created)
5. Pull your .env by running `vercel env pull .env.development.local` in the root of your project. (if you don't have the cli you will need to install it)
6. Deploy your app or run it locally and presto!

### The example treatment

The treatment that I gave as an example will redirect 50% of users to a pikachu page and 50% to a blastoise page.

Feel free to modify those numbers in your edge config to switch up what percentage gets what.
