#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { StaticWebsiteStack } from "../lib/static_website-stack";

const app = new cdk.App();

const env = {
  account: "062356463880",
  region: "us-east-1",
};
new StaticWebsiteStack(app, "StaticWebsiteStack", { env });
