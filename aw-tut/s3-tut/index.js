import { S3Client } from "@aws-sdk/client-s3";

const S3Client = new S3Client({
    region : "ap-south-1",
    credentials: {
        accessKeyId:'AKIAQXV32IZV62BS3TPP',
        secretKey:'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'
    }
})