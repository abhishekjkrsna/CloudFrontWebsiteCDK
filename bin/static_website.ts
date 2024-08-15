#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StaticWebsiteStack } from '../lib/static_website-stack';

const app = new cdk.App();
new StaticWebsiteStack(app, 'StaticWebsiteStack');
