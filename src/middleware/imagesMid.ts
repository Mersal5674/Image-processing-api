// import fs to parse and check if the acquired image exists
import fs from 'fs';
// import express to excute the req,res... functions
import { Request, Response, NextFunction } from 'express';
// import fullImagePath t use it in parsing
import { fullImagesPath } from '../util/util';
import { RequestHandler } from 'express-serve-static-core';
// import default height and width
import { defaultHeight, defaultWidth } from '../routes/const';

// checking if the entered dimensions are numbers and to avoid "Nan" value
export const checkParam: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const widthParam = req.params.width;
    const heightParam = req.params.height;

    // if given param ain't gonna work use || as if the first value is false it use the second on
    const width = widthParam || defaultWidth;
    const height = heightParam || defaultHeight;

    // use next as it after perform this fun it shall go for the next fun
    next();
};

//check if image exists
// the routing methods can have more than one callback function as arguments. With multiple callback functions, it is important to provide next as an argument to the callback function and then call next() within the body of the function to hand off control to the next callback.
export const findImage: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const requestedImage = '' + req.query.image;
    const { width, height } = req.params;
    const imageFile = fullImagesPath(requestedImage, width, height);

    // checking if the image file exists or not
    // use .access( path, mode, callback )...
    fs.access(imageFile, (err) => {
        if (err) {
            // image does not exist, move on to next step to resize and save new image
            next();
        } else {
            const readStream = fs.createReadStream(imageFile);
            readStream.pipe(res);
        }
    });
};
