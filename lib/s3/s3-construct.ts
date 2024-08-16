import {
  Bucket,
  BlockPublicAccess,
  BucketEncryption,
} from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";

export default class S3BucketConstruct extends Construct {
  public readonly _bucket: Bucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const randomString = Math.random().toString(36).substring(2, 8);
    const bucketName = `abj-test-${randomString}`;

    this._bucket = new Bucket(this, "S3Bucket", {
      bucketName: bucketName,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      versioned: true,
    });
  }

  public get bucket(): Bucket {
    return this._bucket;
  }
}
