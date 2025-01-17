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
in order to build the application in the `/docs` folder. To deploy to our [staging](https://apps-staging.urban.org/features/which-states-prioritize-equity-school-renovation-funding) and [production](https://apps.urban.org/features/which-states-prioritize-equity-school-renovation-funding) environment, we required a change to the prefixer in the `svelte.config.js` file which will break the github pages deployment process. It could be possible to accommodate both in the future if this is desired.

It is not required to run and commit the built site in this github repository, but having the files in the repository does no harm. 

The tool had previously been hosted via github pages. That process required running`npm run deploy`. This `deploy` command will run `/scripts/deployToGithub.sh` which builds the page and pushes the update to github. The built site will be in the `docs` folder.
