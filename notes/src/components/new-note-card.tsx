import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function NewNoteCard() {
  return (
    <Dialog.Root>

      {/* Card */}
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-600 p-4 gap-2 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">Example 1</span>
        <p className="text-sm leading-6 text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero beatae
          in ullam expedita iste, inventore quia. Expedita porro quaerat earum
          quae sint corrupti, dolore quam nisi quia error consequatur rem!
        </p>
      </Dialog.Trigger>

      {/* Card Modal */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute top-4 right-4 text-slate-400 hover:text-white">
            <X size={24} />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-xm font-medium text-slate-200">
              Add a new note
            </span>

            <p className="text-sm leading-6 text-slate-400">
              Staring a new note is easy. Just click{" "}
              <button className="text-lime-500">HERE</button> to get started.
            </p>
          </div>

          <button
            type="button"
            className="bg-lime-500 hover:bg-lime-300 p-3 w-full text-sm text-slate-800 font-medium outline-none"
          >
            <span className="text-lime-950">Save note</span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
