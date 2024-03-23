import uniqid from "uniqid";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
/* 
    import { NextResponse } from "next/server";
    import { writeFile } from "fs/promises";
    import { join } from "path";
    export default async function POST(req){
        const data = await req.formData();
        const file = data.get('file');
        console.log('Filesssssss',file);
        if(!file){
            return NextResponse.json({
                success:false
            });
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        console.log(buffer);
        const path = join('/','tmp',file.name);
        await writeFile(path,buffer);
        console.log(`open ${path} to see the uploaded file`)
        return NextResponse.json({success:true});

    }
*/
export async function POST(req) {
    const formData = await req.formData();
    if(formData.has('file')){
        const file = formData.get('file');
        console.log('has fileeeee:',file);
        const s3Client = new S3Client({
            region:'us-east-1',  
            credentials:{
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
            }
        }) 
        
        const randomId = uniqid();
        const ext = file.name.split('.').pop();
        const newFilename = randomId + '.' + ext;
        const bucketName = process.env.BUCKET_NAME;
    
        const chunks = [];
        for await (const chunk of file.stream()) {
          chunks.push(chunk);
        }
    
        await s3Client.send(new PutObjectCommand({
          Bucket: bucketName,
          Key: newFilename,
          ACL: 'public-read',
          Body: Buffer.concat(chunks),
          ContentType: file.type,
        }));
    
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    
        return Response.json(link);
    }

}