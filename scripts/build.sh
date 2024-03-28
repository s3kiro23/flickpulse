#!/bin/bash

source /opt/flickpulse/config.ini

# Set your AWS credentials (make sure you have the necessary AWS CLI installed and configured)
echo "AWS Region: $AWS_REGION"
echo "AWS Account ID: $AWS_ACCOUNT_ID"

APP_NAME="flickpulse"
APP_PATH="/opt/dev_custom/projects/$APP_NAME/"

cd $APP_PATH

#git stash
#git checkout main
#git pull origin main

GIT_COMMIT=`git rev-parse --short HEAD`

# Authenticate Docker with AWS ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Check if the repository exists; if not, create it
aws ecr describe-repositories --repository-names $APP_NAME || aws ecr create-repository --repository-name $APP_NAME

# Build Docker image
docker build --no-cache -t $APP_NAME:$GIT_COMMIT .
docker tag $APP_NAME:$GIT_COMMIT $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$APP_NAME:$GIT_COMMIT
docker tag $APP_NAME:$GIT_COMMIT $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$APP_NAME:latest

# Push the image to AWS ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$APP_NAME:$GIT_COMMIT
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$APP_NAME:latest