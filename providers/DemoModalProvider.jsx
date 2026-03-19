'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const DemoModalContext = createContext(undefined);

export function DemoModalProvider({ children }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const openDemoModal = useCallback(() => setIsDemoModalOpen(true), []);
  const closeDemoModal = useCallback(() => setIsDemoModalOpen(false), []);

  return (
    <DemoModalContext.Provider value={{ isDemoModalOpen, openDemoModal, closeDemoModal }}>
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (!context) {
    throw new Error('useDemoModal must be used within a DemoModalProvider');
  }
  return context;
}
