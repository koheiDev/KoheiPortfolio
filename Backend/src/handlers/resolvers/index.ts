import { getText } from "./getText"
import {addText} from "./addText"
import {updateText} from "./updateText"
import {deleteText} from "./deleteText"

const resolvers:any = {
  Query: {
    getText: getText
  },
  Mutation: {
    addText: addText,
    updateText: updateText,
    deleteText: deleteText
  }
}

export default resolvers
