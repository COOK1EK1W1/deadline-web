import { DeadlinesProvider } from './deadlines';
import { ModalProvider } from "@/components/modal/modalProvider";
import ThemeProvider from './topBar/ThemeProvider';
import { Deadline } from '@prisma/client';

type Props = {
  children: React.ReactNode;
  deadlines: Deadline[];
};

export default function Providers({ children, deadlines }: Props) {
  return (
    <DeadlinesProvider deadlines={deadlines}>
      <ThemeProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </ThemeProvider>
    </DeadlinesProvider>
  );
}
