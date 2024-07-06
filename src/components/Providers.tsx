import { DeadlinesProvider } from './deadlines';
import { ModalProvider } from "@/components/modal/modalProvider";
import { ProgrammeDeadlines } from '@/types/programmeDeadline';

type Props = {
  children: React.ReactNode;
  deadlines: ProgrammeDeadlines
};

export default function Providers({ children, deadlines }: Props) {
  return (
    <DeadlinesProvider deadlines={deadlines}>
      <ModalProvider>
        {children}
      </ModalProvider>
    </DeadlinesProvider>
  );
}
