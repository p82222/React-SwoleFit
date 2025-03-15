import React from 'react'

export default function Button({text}) {
  return (

    <button className='px-8 py-4 rounded-md border-2 bg-slate-950 border-blue-400 blueShadow
            duration-200'>
        <p>{text}</p>
    </button>
  )
}
