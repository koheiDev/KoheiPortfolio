import dynamoDb from '../../libs/dynamodb-lib'

type UpdateTextArgs = {
    id: string,
    newTextData: {
      text: string,
      name: string
    }
}

export const updateText = async(parent:any, args:UpdateTextArgs, ctx:any, info:any) =>{ 
  const params: any = {
    TableName: process.env.textTable,
    Key: {
      id: args.id
    },
    UpdateExpression: 'SET #text = :text, #name = :name, #at = :at',
    ExpressionAttributeNames: {
      '#text' : 'text',
      '#name' : 'name',
      '#at'   : 'at',
  },
    ExpressionAttributeValues: {
      ':text': args.newTextData.text,
      ':name': args.newTextData.name,
      ':at'  : Date.now()
    },
    ReturnValues: 'ALL_NEW',
  }
  await dynamoDb.update(params)
  return true
}