import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();


const s3Bucket = new AWS.S3({
    accessKeyID: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    // Following region refers to the region of server location
    region: "ap-south-1",
});

export const s3Upload = (options) => {
    // Here we have used Promise instead of 'try-catch' function as in case of 'try-catch' we might get error or warning message (most of the time)
    return new Promise((resolve, reject) => {
        s3Bucket.upload(options, (error, data) => {

            if (error) return reject(error);
            return resolve(data);
        });
    });
};