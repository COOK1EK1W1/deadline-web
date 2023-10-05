"use client";
import React, { ReactNode, useCallback, useContext, useMemo } from "react";
import { useState } from "react";

type DeadlineDate = {
  date: Date,
  deadlines: (number | null)[];
};

type ModalDataContext = {
  showCover: boolean,
  showModal: boolean,
  modalDeadlines: DeadlineDate,
};

type ModalMutatorContext = {
  openModal: (d: DeadlineDate) => void,
  closeModal: () => void,
};

export const ContextData = React.createContext<ModalDataContext>(
  { showCover: false, showModal: false, modalDeadlines: { date: new Date(), deadlines: [] } }
);

export function useModalData() {
  const context = useContext(ContextData);
  if (context === undefined) throw new Error('No modal context provided');
  return context;
}

export const ContextMutator = React.createContext<ModalMutatorContext>({
  openModal: () => { },
  closeModal: () => { }
});

export function useModalMutators() {
  const context = useContext(ContextMutator);
  if (context === undefined) throw new Error('No modal context provided');
  return context;
}

export function ModalProvider({ children }: { children: ReactNode; }) {

  const [modalDeadlines, setModalDeadlines] = useState<DeadlineDate>({ date: new Date(), deadlines: [] });

  const [showModal, setShowModal] = useState(false);
  const [showCover, setshowCover] = useState(false);

  const openModal = useCallback((d: DeadlineDate) => {
    setModalDeadlines(d);
    setshowCover(true);
    setTimeout(() => setShowModal(true), 10);
    document.body.classList.add("modalOpen");
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setTimeout(() => setshowCover(false), 300);
    document.body.classList.remove("modalOpen");
  }, []);

  const values = useMemo(() => ({
    openModal, closeModal
  }), [openModal, closeModal]);

  return (
    <ContextMutator.Provider value={values}>
      <ContextData.Provider value={{ showCover, showModal, modalDeadlines }}>
        {children}
      </ContextData.Provider>
    </ContextMutator.Provider>
  );
}