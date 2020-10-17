# voterbot
A tutorial on how to use Wit.ai with a Messenger bot to help voters get information on how and when to vote.

# Overview
This is a tutorial on how to build a simple Messenger bot that utilizes Wit.ai to provide information to voters. The backend is deployed on AWS with API Gateway and Lambda.

# Prerequisites
* A Facebook Developer account
* A Wit.ai account
* An AWS account (Must be able to create Lambda functions, API Gateway end-points, and IAM roles)
* Node.js installed
* NPM installed
* Claudia.js installed (`npm install claudia -g`)

# Getting Started

## Setup Facebook App
1. Create a new app on [Facebook Developers](https://developers.facebook.com/apps/) for your Messenger bot.
    1. Choose **Manage Business Integrations**.
    1. Give your app a display name and enter your email address.
    1. Click **Create App ID** and answer the CAPTCHA when it appears.
1. Find **Messenger** from the grid of products and click **Set Up**.
1. Scroll to the **Access Tokens** section and either connect an existing page on Facebook or create a new page. *NOTE: A Messenger bot must be assigned to a Facebook Page in order to work.*
  ![Screenshot of assigning a page to an app](https://speakerbug.github.io/voterbot/images-for-readme/assign_page_to_app.png)

## Setup AWS
1. Click **Users** from the [Identity and Access Management (IAM)](https://console.aws.amazon.com/iam/) Dashboard.
1. Click **Add user**.
  ![Screenshot of add user button](https://speakerbug.github.io/voterbot/images-for-readme/iam-dashboard.png)
1. Create a new *Programmatic access* user with the username `claudia`. *This IAM user will be used by Claudia.js to create the necessary resources for your bot on AWS automatically.*
  ![Screenshot of claudia user](https://speakerbug.github.io/voterbot/images-for-readme/create-user.png)
1. Attach the following **existing policies directly** to the user `claudia`.
    * AWSLambdaFullAccess
    * AmazonAPIGatewayAdministrator
    * IAMFullAccess
