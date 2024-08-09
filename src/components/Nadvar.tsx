"use client"
import React from 'react'
import Style from "./nadvar.module.css"
import { signIn, signOut, useSession } from "next-auth/react"
import Login from './login/page'
export const Nadvar = () => {
  const { data: sesion } = useSession()
  return (
    <div className={Style.nadvar}>

      {
        sesion?.user ? (
          <> <img className={Style.foto} src={sesion.user.image as string} />
            <div className={Style.nombre}>{sesion.user.name} </div>
            <div className={Style.correo}>{sesion.user.email}</div>
            <button className={Style.oauthButton} onClick={() => { signOut({ callbackUrl: "/" }) }}>
              signOut
            </button>
          </>
        ) : <Login />
      }
    </div>

  )
}
