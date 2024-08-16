import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import path = require("path");
import { Distribution } from "aws-cdk-lib/aws-cloudfront";

export default class S3DeployConstruct extends Construct {
  constructor(scope: Construct, id: string, bucket: Bucket, distribution: Distribution) {
    super(scope, id);

    new BucketDeployment(this, "DeployWebsite", {
      sources: [Source.asset(path.join(__dirname, "../../src"))],
      destinationBucket: bucket,
      distribution: distribution,
      distributionPaths: ["/*"],
    });
  }
}
