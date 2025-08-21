import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../Asset/logo.png'

export default function Navbar() {
  return (
    <div>
      <nav>
        <div>
            <Image src={logo} alt="Logo" width={80} />
        </div>
        <ul>
            <Link href = {"/"}> <li>Home</li></Link>
            <Link href = {"/items"}> <li>Items</li></Link>
            <Link href = {"/about"}> <li>About</li></Link>
        </ul>
        <div>
            <Link href="/login">Log In</Link>
        </div>
      </nav>
    </div>
  )
}
