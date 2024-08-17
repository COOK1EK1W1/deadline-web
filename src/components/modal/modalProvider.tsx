"use client";
import React, { ReactNode, useCallback, useContext, useMemo } from "react";
import { useState } from "react";

type DeadlineDate = {
  date: Date,
  deadlines: (number | null)[];
};

type ModalDataContext = {
  showCoverDay: boolean,
  showModalDay: boolean,
  showCoverCourse: boolean,
  showModalCourse: boolean,
  modalDeadlines: DeadlineDate,
  modalCourse: string|null,
};

type ModalMutatorContext = {
  openModalDay: (d: DeadlineDate) => void,
  closeModalDay: () => void,
  openModalCourse: (c: string) => void,
  closeModalCourse: () => void,
};

export const ContextData = React.createContext<ModalDataContext>(
  { showCoverDay: false, showModalDay: false, showCoverCourse: false, showModalCourse: false, modalDeadlines: { date: new Date(), deadlines: [] }, modalCourse: null}
);

export function useModalData() {
  const context = useContext(ContextData);
  if (context === undefined) throw new Error('No modal context provided');
  return context;
}

export const ContextMutator = React.createContext<ModalMutatorContext>({
  openModalDay: () => { },
  closeModalDay: () => { },
  openModalCourse: () => { },
  closeModalCourse: () => { },
});

export function useModalMutators() {
  const context = useContext(ContextMutator);
  if (context === undefined) throw new Error('No modal context provided');
  return context;
}

export function ModalProvider({ children }: { children: ReactNode; }) {

  const [modalDeadlines, setModalDeadlines] = useState<DeadlineDate>({ date: new Date(), deadlines: [] });
  const [modalCourse, setModalCourse] = useState<string|null>(null);

  const [showModalDay, setShowModalDay] = useState(false);
  const [showCoverDay, setshowCoverDay] = useState(false);
  const [showModalCourse, setShowModalCourse] = useState(false);
  const [showCoverCourse, setshowCoverCourse] = useState(false);

  const openModalDay = useCallback((d: DeadlineDate) => {
    setModalDeadlines(d);
    setshowCoverDay(true);
    setTimeout(() => setShowModalDay(true), 10);
    document.body.classList.add("modalOpen");
  }, []);

  const openModalCourse = useCallback((c: string) => {
    setModalCourse(c);
    setshowCoverCourse(true);
    setTimeout(() => setShowModalCourse(true), 10);
    document.body.classList.add("modalOpen");
  }, []);

  const closeModalDay = useCallback(() => {
    setShowModalDay(false);
    setTimeout(() => setshowCoverDay(false), 300);
    document.body.classList.remove("modalOpen");
  }, []);

  const closeModalCourse = useCallback(() => {
    setShowModalCourse(false);
    setTimeout(() => setshowCoverCourse(false), 300);
    document.body.classList.remove("modalOpen");
  }, []);

  const values = useMemo(() => ({
    openModalDay, closeModalDay, openModalCourse, closeModalCourse
  }), [openModalDay, closeModalDay, openModalCourse, closeModalCourse
]);

  return (
    <ContextMutator.Provider value={values}>
      <ContextData.Provider value={{ showCoverDay, showModalDay, showCoverCourse, showModalCourse, modalDeadlines, modalCourse }}>
        {children}
      </ContextData.Provider>
    </ContextMutator.Provider>
  );
}
