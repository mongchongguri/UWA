import AWS from "aws-sdk";

function AwsUpload(dir, file) {
  const name = Date.now();
  AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: "",
    secretAccessKey: "",
  });

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: "",
      Key: `${dir}/${name}`,
      Body: file,
    },
  });

  return upload;
}

export default AwsUpload;
