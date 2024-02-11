import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { getTexts, mutation, timestampToDateTime } from "../functions"
import { useEffect, useState } from "react"
import { loading } from "../functions"

const queries = {
  send: `
  mutation addText ($textData: TextInput) {
    addText(textData: $textData)
  }
  `,
  update: `
  mutation UpdateText($id: String, $textData: TextInput) {
    updateText(id:$id, newTextData:$textData)
  }
  `,
  delete: `
  mutation deleteText ($id: String) {
    deleteText(id: $id)
  }
  `
}

export type textData = {
  id: string,
  name: string,
  text: string,
  at: string
}


const IndexPage: React.FC<PageProps> = () => {

  const [list, setList] = useState<textData[]>([])
  const [nickname, setNickname] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [newNickname, setNewNickname] = useState<string>('')
  const [newText, setNewText] = useState<string>('')
  const [editMode, setEditMode] = useState<string>('')
  const [postForm, setPostForm] = useState<boolean>(true)

  useEffect(() => {
    getTexts().then(res => setList(res))
  }, [])

  return (<div className="w-[500px] mx-auto">
    <h1 className="text-4xl font-bold w-full bg-white sticky top-0 text-center py-5">
      Message Board
    </h1>
    {list.map(i => {
      return <div className="border-2 p-4">
        {editMode === i.id ? <div className='flex flex-col'>
          <label htmlFor="new_name" className="font-semibold">New Nickname</label>
          <input maxLength={10} value={newNickname} className="border-2" onChange={(e) => setNewNickname(e.target.value)} />
          <label htmlFor="new_name" className="font-semibold mt-4">New Message</label>
          <input maxLength={20} value={newText} className="border-2" onChange={(e) => setNewText(e.target.value)} />
          <button onClick={() => {
            mutation(queries.update,
              {
                id: i.id,
                textData: {
                  name: newNickname,
                  text: newText
                }
              },
              setList
            ).then(res => {
              loading(setList)
              setEditMode('')
            })
          }
          }
            className="border bg-green-400 text-white mt-4">Update</button>
          <button onClick={() => setEditMode('')} className="border bg-red-400 text-white mt-2">Cancel</button>
        </div>
          :
          <>
            <p className=""><span className="font-bold">Nickname:</span> {i.name}</p>
            <p><span className="font-bold">Message:</span> {i.text}</p>
            <p className="text-gray-500 mt-6">{timestampToDateTime(Number(i.at))}</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => {
                setEditMode(i.id)
                setNewNickname(i.name)
                setNewText(i.text)
              }} className="border bg-green-400 text-white p-2 w-16">Edit</button>
              <button onClick={() => {
                mutation(queries.delete,
                  {
                    id: i.id,
                  },
                  setList
                ).then(res => {
                  loading(setList)
                })
              }
              } className="border bg-red-500 text-white p-2 w-16">Delete</button>
            </div>
          </>}
      </div>
    })}

    {postForm ? <div className="fixed bottom-0 right-0 bg-white m-5 p-5 border-2 flex flex-col">
      <button onClick={() => setPostForm(false)} className="ml-64">✕</button>
      <label className="font-semibold" htmlFor="nickname">Nickname</label>
      <input id='nickname' maxLength={10} className="border-2" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <label className='font-semibold mt-4'>Message</label>
      <input maxLength={20} className="border-2" value={text} onChange={(e) => setText(e.target.value)} />
      <input type='button' className="border-2 mt-4 bg-yellow-400 p-2" value='Post'
        onClick={() => {
          mutation(queries.send, {
            textData: {
              text: text,
              name: nickname
            },
          },
            setList
          ).then(res => {
            loading(setList)
            setNickname('')
            setText('')
          })
        }} />
    </div>
      : <button onClick={() => setPostForm(true)} className="fixed bottom-0 right-0 text-2xl font-bold  border-2 m-5 rounded-full w-16 h-16">+</button>
    }
  </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
