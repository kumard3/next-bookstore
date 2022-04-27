/* eslint-disable @next/next/link-passhref */

import React, { useState } from 'react'

export default function Home() {
  const [bookTitle, setBookTitle] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookGenre, setBookGenre] = useState('')
  const [bookData, setBookData] = useState([])
  const resetForm = () => {
    setBookTitle('')
    setBookAuthor('')
    setBookGenre('')
  }

  const GetBooks = async () => {
    try {
      const response = await fetch('/api/books', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      setBookData(await response.json())
    } catch (err) {
      console.log(err)
    }
  }

  const handelSubmit = async (e: any) => {
    e.preventDefault()
    const body = { bookTitle, bookAuthor, bookGenre }
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (response.status !== 200) {
        console.log('something went wrong')
      } else {
        resetForm()
        console.log('success')
        GetBooks()
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(bookTitle, bookAuthor, bookGenre)
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="flex justify-center  items-center ">
        <form action="#" method="POST">
          <div className=" my-6">
            <label
              htmlFor="bookTitle"
              className="block mx-1 text-2xl font-mono"
            >
              Book Title
            </label>
            <div className="">
              <input
                type="text"
                name="bookTitle"
                id="bookTitle"
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Book Title"
                className="px-6 py-2 text-3xl rounded-xl text-black"
              />
            </div>
          </div>
          <div className=" my-6">
            <label
              htmlFor="bookAuthor"
              className="block mx-1 text-2xl font-mono"
            >
              Book Author
            </label>
            <div className="">
              <input
                type="text"
                name="bookAuthor"
                id="bookAuthor"
                onChange={(e) => setBookAuthor(e.target.value)}
                placeholder="Book Author"
                className="px-6 py-2 text-3xl rounded-xl text-black"
              />
            </div>
          </div>
          <div className=" my-6">
            <label
              htmlFor="bookGenre"
              className="block mx-1 text-2xl font-mono"
            >
              Book Genre
            </label>
            <div className="">
              <input
                type="text"
                name="bookGenre"
                id="bookGenre"
                onChange={(e) => setBookGenre(e.target.value)}
                placeholder="Book Genre"
                className="px-6 py-2 text-3xl rounded-xl text-black"
              />
            </div>
          </div>
          <button
            type="submit"
            className="border-white border px-6 py-2 rounded text-xl"
            onClick={handelSubmit}
          >
            {' '}
            Submit
          </button>
        </form>
        {/* {bookData && <div>{bookData.map((n) => {})} </div>} */}
      </div>
      <div>
        {bookData?.map(
          (
            n: { bookeTitle: string; bookeAuthor: string; bookeGenre: string },
            index,
          ) => {
            return (
              <div key={index} className="text-white">
                {n.bookeTitle}
              </div>
            )
          },
        )}
      </div>
    </div>
  )
}
