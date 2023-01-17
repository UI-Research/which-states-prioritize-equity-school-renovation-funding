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

The tool currently uses CircleCI for deployment. This process runs 
```bash
npm run build 
```
in order to build the application in the `/docs` folder. To deploy to our staging and production environment, we required a change to the prefixer in the `svelte.config.js` file which will break the github pages deployment process. It could be possible to accommodate both in the future if this is desired.

The tool had previously been hosted via github pages. That process required running`npm run deploy`.

This command will run `/scripts/deployToGithub.sh` which builds the page and pushes the update to github. The built site will be in the `docs` folder.
