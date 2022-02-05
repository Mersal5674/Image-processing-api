// import "express" to help with setting endpoint...
import express from 'express';
import { Request, Response } from 'express';

import { Application } from 'express-serve-static-core';
// import "fs" to help with "parsing/creating" output files when needed
import fs from 'fs';
import { checkParam, findImage } from '../middleware/imagesMid';
// import defaultImages... to use it to get the fullImagePath
import { defaultImagesPath } from '../routes/const';
// import resizer to resize givin images and not to have to import sharp here again...
import { resizer } from '../util/util';

const app: Application = express();

// what user asking for specific image shall looks like:
const ask = `P.S: In the "Url" enter ( ... /api/images?image=name&width=width&height=height ) ...format to select an 'image' giving it {width,height}`;
console.log(ask);

// adding the "connection type" "get" ("endpoint"(to talk to the user), used middlewares, (req...))
app.get(
    '/api/images?',
    checkParam,
    findImage,
    async (req: Request, res: Response): Promise<void> => {
        try {
            // start pasringIn
            const requestedImage: string = '' + req.query.image;
            const width = Number(req.query.width);
            const height = Number(req.query.height);

            // checking for input errors
            // {
            // 1- width
            if (isNaN(width)) {
                res.send(`Invalid 'Width', try again!`);
            }
            // 2- height
            if (isNaN(height)) {
                res.send(`Invalid 'Height', try again!`);
            }

            // reaching the image using the fun() we created in const + image name user entered
            const acquiredImage = `${defaultImagesPath}/${requestedImage}.jpg`;

            // creating a route to the acquired images to check if it existed before if not use it t create the file
            const outputFile = `${defaultImagesPath}/${requestedImage}_${width}_${height}.jpg`;
            // // the resizing option
            try {
                await resizer({
                    acquiredImage,
                    width,
                    height,
                    outputFile,
                });
                const readStream = fs.createReadStream(outputFile);
                readStream.pipe(res);
                console.log('Successful Resizing!');
            } catch (error) {
                console.log(`Error occured while processing: ${error}`);
                res.send(`Invalid 'Image', try again!`);
            }
        } catch (error) {
            console.log(`Error occured while processing: ${error}`);
        }
    }
);

export default app;
