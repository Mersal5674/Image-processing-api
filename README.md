# Image-processing-api:
Image processing api for udacity, that creat an endpoint and waiting for the user to enter parameters { image-name, its width, and its length}, checking if this file existed before, showing it if existed before or creating it then send it to the localhost.

### Instalition process:
`npm run build` - creates the `dist` directory and copies all files to it.
`npm run lint` - parse the app.ts file to fix existed issue.
`npm run start` - runs express server starting the project.
`...` the rest of used scripts exist in package.json.

### rout used to reach the acquired image:
/api/images?image=name&width=width&height=height

## Used develping steps
- created the server using localhost 3000.
- creating const file with all consts I'am gonna use through the project.
- creeated utilities I shall use that helps with image path and resizing it.
- creating middlewares that shall help with checking if the eneterd params: numbers to use and resizing it.
- Adding the App file, importing all created functions to use.
- exporing App file to the server to use it.