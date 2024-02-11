const typeDefs = `#graphql
  type Text {
    id: String,
    text: String,
    name: String,
    at  : String 
  },
  input TextInput {
    text    : String
    name: String
  },
  type Query {
    getText: [Text]
  },
  type Mutation {
    addText(textData: TextInput): Boolean,
    updateText(id:String, newTextData:TextInput): Boolean,
    deleteText(id:String): Boolean
  }
`

export default typeDefs
