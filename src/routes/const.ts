// importing path so we can use path.join to reach image location
import path from 'path';
// creating constants that are gonna be used later
export const defaultHeight = '200';
export const defaultWidth = '200';
export const defaultFormat = 'jpg';
export const port = 3000;

// making the image file is the 'root dir' using .resolve
export const defaultImagesPath = path.resolve(__dirname, '../images');
// console.log(defaultImagesPath);
