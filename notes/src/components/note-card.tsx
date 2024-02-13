import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { X } from "lucide-react";

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Dialog.Root>
      
      {/* Card */}
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-4 gap-2 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-xm font-medium text-slate-400">
          {formatDistanceToNow(note.date, { addSuffix: true })}
        </span>

        <p className="text-sm leading-6 text-slate-400">{note.content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/85 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      {/* Card Modal */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute top-4 right-4 text-slate-400 hover:text-white">
            <X size={24} />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-xm font-medium text-slate-400">
              {formatDistanceToNow(note.date, { addSuffix: true })}
            </span>

            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <button
            type="button"
            className="bg-slate-800 hover:bg-red-500 p-3 w-full text-sm text-slate-300 font-medium outline-none group"
          >
            <span className="group-hover:text-white">Delete this note</span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
