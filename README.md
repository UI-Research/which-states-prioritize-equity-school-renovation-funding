# Urban - K12 Expenditures State Search Tool

## Developing

The tool is built using Svelte. Project files are found in `src/` directory.

To run the development server:

```bash
npm run dev
```

## Site data

The data for the tool is stored locally in `src/lib/data`

## Deploy

The tool is hosted via github pages. To push the latest updates, run

```bash
npm run deploy
```

This command will run `/scripts/deployToGithub.sh` which builds the page and pushes the update to github. The built site will be in the `docs` folder.
