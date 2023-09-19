import { Deadline } from "@prisma/client"
import React, { ReactNode } from "react"
import { useState } from "react"

type ModalDataContext = {
  showCover: boolean, 
  showModal: boolean, 
  modalDeadlines: {date: Date, deadlines: ( Deadline|null)[]}, 
}

type ModalMutatorContext2 = {
  openModal: (d: { date: Date, deadlines: (Deadline | null)[]}) => void, 
  closeModal: () => void, 
}

export const ContextData = React.createContext<ModalDataContext>(undefined as any)
export const ContextMutator = React.createContext<ModalMutatorContext2>(undefined as any)

export function ModalProvider({children, modal}:{children:ReactNode, modal: ReactNode}) {

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
    <ContextMutator.Provider value={{openModal, closeModal}}>
      {children}
      <ContextData.Provider value={{ showCover, showModal, modalDeadlines }}>
        {modal}
      </ContextData.Provider>
    </ContextMutator.Provider>
  )
}