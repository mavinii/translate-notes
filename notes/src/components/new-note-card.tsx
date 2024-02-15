import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner"

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoard, setShouldShowOnBoard] = useState(true)
  const [content, setContent] = useState('')

  // Start the editor
  function handleStartEditor() {
    setShouldShowOnBoard(false)
  }

  // Return the value of the textarea
  function handContentChanged(events : ChangeEvent<HTMLTextAreaElement>) {
    setContent(events.target.value)

    if (events.target.value === '') {
      setShouldShowOnBoard(true)
    }
  }

  // Save the notes
  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    onNoteCreated(content)

    setContent('')

    setShouldShowOnBoard(true) 

    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('Note saved')
        }, 2000)
      }),
      {
        loading: 'Saving note...',
        success: 'Note saved',
        error: 'Failed to save note'
      }
    )
  }

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

          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-xm font-medium text-slate-200">
                Add a new note
              </span>

              {shouldShowOnBoard ? (
                <p className="text-sm leading-6 text-slate-400">
                  Staring a new note with <button onClick={handleStartEditor} className="text-lime-500"> AUDIO </button> or a note with <button onClick={handleStartEditor} className="text-lime-500">TEXT</button>.
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  placeholder="Start typing..."
                  onChange={handContentChanged}
                  value={content} />
              )}
            </div>

            <button
              type="submit"
              className="bg-lime-500 hover:bg-lime-300 p-3 w-full text-sm text-slate-800 font-medium outline-none"
              >
              <span 
                className="text-lime-950">Save note</span>
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
