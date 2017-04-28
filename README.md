# aws-quickdeploy

[![npm version](https://badge.fury.io/js/aws-quickdeploy.svg)](https://badge.fury.io/js/aws-quickdeploy)

An idea for setting up a website from a single config file.

Go from [this file](data.yml) to [this website](http://aws-quickdeploy-example-business.com.s3-website-us-west-1.amazonaws.com) or [this website](http://aws-quickdeploy-example-musician.com.s3-website-us-west-1.amazonaws.com)

### Prerequisites
  - Have `node` and `npm` installed. Get them both [here](https://nodejs.org/en/download/)
  - Have an AWS account with a S3 bucket.
  - (Optional) About $12

### Steps

Open a terminal

Run `mkdir <a directory>` and ` cd <that directory>`

Run `npm init`

Run `npm install aws-quickdeploy`

Populate the generated `aws.json` file with needed values

Modify the `data.yml` file too

Run `npm run render` to render and deploy.
