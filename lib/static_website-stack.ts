import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import CDNConstruct from "./cdn/distribution-construct";
import S3BucketConstruct from "./s3/s3-construct";
import { Construct } from "constructs";
import OAIConstruct from "./cdn/oai-construct";
import S3DeployConstruct from "./s3Deploy/s3-deploy-construct";

export class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const cloudFrontOAI = new OAIConstruct(this, "OAIBucketAccess").cloudfrontOAI;

    const bucket = new S3BucketConstruct(this, "S3Stack").bucket;

    const cdn = new CDNConstruct(this, "CDNStack", bucket, cloudFrontOAI).distribution;

    new S3DeployConstruct(this, "S3DeployStack", bucket, cdn);

    new CfnOutput(this, "BucketName", {
      value: bucket.bucketName,
    });

    new CfnOutput(this, "DistributionId", {
      value: cdn.distributionId,
    });

    const domainName = `https://${cdn.distributionDomainName}`;

    new CfnOutput(this, "DistributionDomainName", {
      value: domainName,
    });
  }
}
