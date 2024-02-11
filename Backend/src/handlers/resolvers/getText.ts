import dynamoDb from '../../libs/dynamodb-lib'

export const getText = async () => {
  const params:any = {
    TableName: process.env.textTable,
  }
  const result:any = await dynamoDb.scan(params)
  //console.log(process.env.wordsTable)
  return result.Items
}