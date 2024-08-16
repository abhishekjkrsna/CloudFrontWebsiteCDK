import { OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { Construct } from "constructs";

export default class OAIConstruct extends Construct {
    public readonly _cloudfrontOAI: OriginAccessIdentity;
    constructor(scope: Construct, id: string) {
        super(scope, id);
        this._cloudfrontOAI = new OriginAccessIdentity(this, "OAIBucketAccess");
    }

    public get cloudfrontOAI(): OriginAccessIdentity {
        return this._cloudfrontOAI;
    }
}