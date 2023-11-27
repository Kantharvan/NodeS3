const { S3Client, 
    GetObjectCommand, 
    PutObjectCommand,
    ListObjectsCommand, 
    DeleteObjectCommand} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
    region : "ap-south-1",
    credentials: {
        accessKeyId:'AKIAQXV32IZVV5Y5YDWV',
        secretAccessKey:'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'
    }
})

const s3ClientAdmin = new S3Client({
    region : "ap-south-1",
    credentials: {
        accessKeyId:'AKIAQXV32IZV4DOBGCEW',
        secretAccessKey:'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'
    }
})

async function getObject(key) {
    const command = new GetObjectCommand({
        Bucket : "kandymanbucket",
        Key: key,
    })
    const url = await getSignedUrl(s3Client,command);
    return url;
}

async function putObject(filename, contentType) {
    const command = new PutObjectCommand({
        Bucket : "kandymanbucket",
        Key: `/upload/${filename}`,
        ContentType: contentType,
    })
    const url = await getSignedUrl(s3Client,command);
    return url;
}

async function listObjects() {
    const command = new ListObjectsCommand({
        Bucket : "kandymanbucket",
        Key: "/",
    })
    const url = await s3Client.send(command);
    return url;
}

async function init() {
    // console.log("URL for image : ",await getObject("Images/IMG20230529200950 (1).jpg"))
    // console.log("URL for uploading",await putObject(`image-${Date.now()}.jpeg`, "image/jpeg"))
    
    // const result = await listObjects();
    // console.log(result.Contents)

    const cmd = new DeleteObjectCommand({
        Bucket : "kandymanbucket",
        Key: "Images/IMG20230529200950 (1).jpg",
    })
    await s3ClientAdmin.send(cmd);
}

init();

