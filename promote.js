const _ = require('lodash')
const AWS = require('aws-sdk');
const co = require('co')
AWS.config.loadFromPath("./awsCreds.json");
const lambda = new AWS.Lambda();
const lambdaFuncName = require('./package.json').lambdaFuncName

co( function* () {
	try {
		var data = yield lambda.listVersionsByFunction({FunctionName: lambdaFuncName}).promise()

		var newVersion = _.max(_.map(data.Versions, 'Version'))

		// console.log(newVersion)

		yield lambda.updateAlias({FunctionName: lambdaFuncName, Name : 'prod', FunctionVersion: newVersion}).promise()
		console.log("Successfully updated alias!")
	}
	catch (e){
		throw e
	}
})