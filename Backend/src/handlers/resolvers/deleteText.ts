import dynamoDb from '../../libs/dynamodb-lib'

type DeleteTextArgs = {
  id: string
}

export const deleteText = async(parent:any, args:DeleteTextArgs, ctx:any, info:any) =>{ 
  const params:any = {
    TableName: process.env.textTable,
    Key: {
      id: args.id
    },
  }
  await dynamoDb.delete(params)
  return true
} 