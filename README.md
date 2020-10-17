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
* AWS CLI installed

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
    * `AWSLambdaFullAccess`
    * `AmazonAPIGatewayAdministrator`
    * `IAMFullAccess`
1. You can leave the remaining settings set to whatever the defaults are. Once your user is created, make sure to take note of the Access Key ID and Access Key Secret (you can't view the secret again after you leave the confirmation page).
1. Add this newly created IAM user to your `~/.aws/credentials` file. This is the file the AWS CLI uses for authentication to AWS.
    1. You can create a new profile for `claudia` as to not interfere with any other credentials you have setup already.
    1. Copy the following code snippet and add it to `~/.aws/credentials` replacing _YOUR_ID_ and _YOUR_SECRET_ with your Access Key ID and Access Key Secret from the confirmation screen.
    ```
    [claudia]
    aws_access_key_id = _YOUR_ID_
    aws_secret_access_key = _YOUR_SECRET_
    ```
1. Run the command `export AWS_PROFILE=claudia` to set the `claudia` as the default profile for the AWS CLI to use.

## Setup codebase
1. Make a new directory to place your code in. For the purposes of this tutorial we'll use 'voterbot'.
1. Make a new file called `bot.js` and paste the code found in [bot.js](https://github.com/speakerbug/voterbot/blob/main/bot.js) in this repo.
1. In the directory run the following commands:
    1. `npm init` _You can use all default values_
    1. `npm install claudia-bot-builder`
