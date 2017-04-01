#!/bin/bash

if [ -f ./*.zip ]
then
	rm -rf ./*.zip
fi

npm install
zip -r rekt.zip *
aws lambda update-function-code --publish --function-name rekt --zip-file fileb://rekt.zip