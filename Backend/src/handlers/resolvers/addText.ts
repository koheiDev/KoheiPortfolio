import dynamoDb from '../../libs/dynamodb-lib'

interface AddTextArgs {
  textData: {
  text: string,
  name: string,
  }
}

export const addText = async (parent: any, args: AddTextArgs, ctx: any, info: any) => {
  const shortid = require('shortid');
  const params: any = {
    TableName: process.env.textTable,
    Item: {
      id: shortid.generate(),
      text: args.textData.text,
      name: args.textData.name,
      at: Date.now()
    }
  }
  await dynamoDb.put(params)
  return true
}