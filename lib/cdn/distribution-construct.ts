import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { PriceClass } from "aws-cdk-lib/aws-cloudfront";
import { PolicyStatement, CanonicalUserPrincipal } from "aws-cdk-lib/aws-iam";

export default class CDNConstruct extends Construct {
    private readonly _distribution: Distribution;
    constructor(scope: Construct, id: string, bucket: Bucket, cloudfrontOAI: OriginAccessIdentity) {
        super(scope, id);

        this._distribution = new Distribution(this, "Distribution", {
            defaultRootObject: "index.html",
            priceClass: PriceClass.PRICE_CLASS_ALL,
            defaultBehavior: {
                origin: new S3Origin(bucket, {
                    originAccessIdentity: cloudfrontOAI,
                }),
            },
        });

        bucket.addToResourcePolicy(
            new PolicyStatement({
                actions: ["s3:GetObject"],
                resources: [bucket.arnForObjects("*")],
                principals: [
                    new CanonicalUserPrincipal(
                        cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
                    ),
                ],
            })
        );
    }
    public get distribution(): Distribution {
        return this._distribution;
    }
}