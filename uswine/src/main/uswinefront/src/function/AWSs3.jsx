import AWS from "aws-sdk";

function AwsUpload(dir, file) {
  const name = Date.now();
  AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: "AKIAZNVISYDYJEQ3FE46",
    secretAccessKey: "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",
  });

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: "mongchongguriforum",
      Key: `${dir}/${name}`,
      Body: file,
    },
  });

  return upload;
}

export default AwsUpload;
