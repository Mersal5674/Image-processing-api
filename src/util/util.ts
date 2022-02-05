// making this utility to perform the resize function and give the image an aboslute path
// calling sharp
import sharp, { OutputInfo } from 'sharp';
// calling the defaultImagePath
import { defaultImagesPath } from '../routes/const';

// write a path for this file to use later
export const thisFile = process.cwd();
// console.log(thisFile)

// add the full path to the root dir we created before using .resolve
// when calling the fullimagePath() you will shall call it ...(image,width,height), giving em "string" values
// 1- made this export ...() although it shall be written in the app.ts again scince it is gonna be imported and used in the middleware.ts...
// to "findImage: RequestHandler...",
// 2- and resizer shall be imported at app.ts.. as we don't have to re-interface types of used parameters...

export const fullImagesPath = (
    image: string,
    width: string,
    height: string
): string => {
    // return a value since the used type is string
    // console.log(`${defaultImagesPath}/${image}_${width}_${height}.jpg`)
    return `${defaultImagesPath}/${image}_${width}_${height}.jpg`;
};
// fullImagePath("ford","200","200")

// know we need to use the resize method
// first we want to declare parameters we shall use and give'em type
interface rsizeType {
    width: number;
    height: number;
    acquiredImage: string;
    outputFile: string;
}
export const resizer = async ({
    acquiredImage,
    width,
    height,
    outputFile,
}: rsizeType): Promise<OutputInfo> => {
    return await sharp(acquiredImage).resize(width, height).toFile(outputFile);
};
