#To deploy
* https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html

#First Zip the Thing
zip -r function.zip .

# Deploy to Dev function
aws lambda update-function-code --function-name SlackContactForm --zip-file fileb://function.zip --profile NAMEHERE

# Deploy to Prod function
aws lambda update-function-code --function-name SlackContactForm-Prod --zip-file fileb://function.zip --profile NAMEHERE
