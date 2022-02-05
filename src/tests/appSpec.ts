// import supertest framwork to help with testing our endpoint
import path from 'path';
import supertest from 'supertest';
// import the fun you wanna test
import app from '../app/app';
// import fs
import fs from 'fs'
import { thisFile } from '../util/util';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api/images?');
        expect(response.status).toBe(200);
    });
});

describe('Test resizing', () =>{
    it('Check if resized image exists', async() => {
        const image = 'fjord'
        const width = 200
        const height = 200
        const file = path.resolve(
            `${thisFile}/src/images/${image}_${width}_${height}.jpg`
            )
        const check = fs.accessSync(file, fs.constants.F_OK)
        expect(check).not.toThrow;
    })
})
