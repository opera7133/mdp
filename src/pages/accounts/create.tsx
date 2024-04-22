import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEditor, EditorContent } from '@tiptap/react'
import Strike from '@tiptap/extension-strike'
import Focus from '@tiptap/extension-focus'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import StarterKit from '@tiptap/starter-kit'
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsCodeSlash,
  BsArrowCounterclockwise,
  BsParagraph,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsListUl,
  BsListOl,
  BsBlockquoteLeft,
  BsCodeSquare,
} from 'react-icons/bs'
import { Button } from '../components/Button'
import { useState } from 'react'
import { AuthProvider } from '../../context/AuthContext'
import { getAuth } from 'firebase/auth'

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-row flex-wrap items-center gap-1 bg-gray-100 px-5 py-2 rounded-t-md ring-2 ring-gray-100">
      <a
        href="#"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive('bold')
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsTypeBold size={30} className="p-0.5" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive('italic')
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsTypeItalic size={30} className="p-0.5" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={
          editor.isActive('strike')
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsTypeStrikethrough size={30} className="p-0.5" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={
          editor.isActive('code')
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsCodeSlash size={30} className="p-0.5" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="hover:bg-gray-200 duration-200 rounded-md"
      >
        <BsArrowCounterclockwise size={30} className="p-1" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive('paragraph')
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsParagraph size={30} className="p-1" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive('heading', { level: 1 })
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsTypeH1 size={30} className="p-1" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive('heading', { level: 2 })
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsTypeH2 size={30} className="p-1" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive('heading', { level: 3 })
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsTypeH3 size={30} className="p-1" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive('bulletList')
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsListUl size={30} className="p-0.5" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive('orderedList')
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsListOl size={30} className="p-0.5" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive('codeBlock')
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsCodeSquare size={30} className="p-1" />
      </a>
      <a
        href="#"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive('blockquote')
            ? 'bg-gray-200 rounded-md'
            : 'hover:bg-gray-200 duration-200 rounded-md'
        }
      >
        <BsBlockquoteLeft size={30} className="p-0.5" />
      </a>
    </div>
  )
}

type Inputs = {
  type: string
  title: string
  body: string
}

export default function Create() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const auth = getAuth()
    const user = auth.currentUser
    const id = user?.uid
    const res = await fetch('/api/create', {
      body: JSON.stringify({
        type: data.type,
        title: data.title,
        body: data.body,
        userid: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const { error } = await res.json()
    if (error) {
      console.log(error)
      return
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Strike,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Focus.configure({
        className: 'outline-none',
        mode: 'all',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'px-6 py-5 prose lg:prose-lg max-w-full focus:outline-none font-content',
      },
    },
    onUpdate({ editor }) {
      setValue('body', editor.getHTML())
    },
  })

  return (
    <AuthProvider>
      <div>
        <Head>
          <title>Create | MDP</title>
        </Head>
        <main className="container my-10 px-4 mx-auto max-w-6xl min-h-screen">
          <Button
            primary={true}
            label="< Back to Articles"
            href="/accounts/"
            className="mb-5"
          />
          <h2 className="font-title text-3xl font-semibold mb-5">
            Create Article / Question
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border border-primary-500 inline-flex flex-row relative rounded-lg font-title">
              <div>
                <input
                  type="radio"
                  id="article"
                  {...register('type')}
                  value="article"
                  className="opacity-0 absolute peer"
                  checked
                />
                <label
                  htmlFor="article"
                  className="peer-checked:bg-primary-500 peer-checked:text-white rounded-l-lg inline-block px-8 py-2 duration-200"
                >
                  Article
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="question"
                  value="question"
                  className="opacity-0 absolute peer"
                  {...register('type')}
                />
                <label
                  htmlFor="question"
                  className="peer-checked:bg-primary-500 peer-checked:text-white rounded-r-lg inline-block px-8 py-2 duration-200"
                >
                  Question
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-8">
              <label htmlFor="title" className="text-lg font-medium font-title">
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register('title', {
                  required: true,
                })}
                className={`${
                  errors.title && 'ring-2 ring-red-500 bg-white'
                } bg-gray-100 w-full rounded-lg py-2 px-4 focus:ring-primary-500 focus:outline-none focus:ring-2 focus:bg-white duration-100`}
              />
            </div>
            <div className="my-5">
              <p className="text-lg font-medium font-title mb-2 cursor-default">
                Content
              </p>
              <textarea
                className="hidden"
                {...register('body', {
                  required: true,
                })}
              ></textarea>
              <MenuBar editor={editor} />
              <EditorContent
                editor={editor}
                className={`${
                  errors.body ? 'ring-red-500' : 'ring-gray-100'
                } ring-2 rounded-b-md min-h-[60vh] duration-200`}
              />
            </div>
            <button className="font-title text-white bg-primary-500 inline-block px-8 py-2 text-base rounded-full duration-200 hover:bg-primary-700 my-5">
              Submit
            </button>
          </form>
        </main>
      </div>
    </AuthProvider>
  )
}
