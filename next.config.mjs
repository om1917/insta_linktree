/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            hostname:'*.googleusercontent.com'
        },{
            hostname:'linklist-docupload.s3.amazonaws.com'
        }]
    }
};

export default nextConfig;
