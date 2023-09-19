import { Deadline } from "@prisma/client"
import React, { ReactNode } from "react"
import { useState } from "react"

type ModalContext = {
  openModal: (d: { date: Date, deadlines: (Deadline | null)[]}) => void, 
  closeModal: () => void, 
  showCover: boolean, 
  showModal: boolean, 
  modalDeadlines: {date: Date, deadlines: ( Deadline|null)[]}, 
}

export const Context = React.createContext<ModalContext>(undefined as any)

export function ModalProvider({children}:{children:ReactNode}) {

  const [modalDeadlines, setModalDeadlines] = useState<{ date: Date, deadlines: (Deadline | null)[] }>({ date: new Date(), deadlines: [] })

  const [showModal, setShowModal] = useState(false)
  const [showCover, setshowCover] = useState(false)

  function openModal(d: { date: Date, deadlines: (Deadline | null)[] }) {
    setModalDeadlines(d)
    setshowCover(true)
    setTimeout(() => setShowModal(true), 10);
    document.body.classList.add("modalOpen")
  }

  function closeModal() {
    setShowModal(false);
    setTimeout(() => setshowCover(false), 300);
    document.body.classList.remove("modalOpen");
  }

  return (
    <Context.Provider value={{ openModal, closeModal, showCover, showModal, modalDeadlines }}>
      {children}
    </Context.Provider>
  )
}