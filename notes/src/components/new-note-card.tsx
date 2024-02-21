import * as Dialog from "@radix-ui/react-dialog";
import { set } from "date-fns";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner"

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoard, setShouldShowOnBoard] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
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

    // If the content is empty, return
    if (content.trim() === '') {
      return
    }

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

  // Start recording
  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
      || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      toast.error('Ops! It looks like your browser do not support Speech Recognition!')
      return
    }

    setIsRecording(true)
    setShouldShowOnBoard(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
 
    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'en-US'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, results) => {
        return text.concat(results[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.log(`Speech recognition error detected: ${event.error}`);
      console.log(`Additional information: ${event.message}`);
      toast.error('Ops! Something went wrong!')
    };    
    
    speechRecognition.start()

    toast('Recording audio...')
  }

  // Stop recording
  function handleStopRecording() {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    }
  }

  return (
    <Dialog.Root>
      {/* Card */}
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-600 p-4 gap-2 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">Example 1</span>
        <p className="text-sm leading-6 text-slate-400">
          This is an example of a new note card created with audio or text.
          Click here to start a new note...
        </p>
      </Dialog.Trigger>

      {/* Card Modal */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute top-4 right-4 text-slate-400 hover:text-white">
            <X size={24} />
          </Dialog.Close>

          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-xm font-medium text-slate-200">
                Add a new note
              </span>

              {shouldShowOnBoard ? (
                <p className="text-sm leading-6 text-slate-400">
                  Starting a new note with <button type="button" onClick={handleStartRecording} className="text-lime-500">AUDIO</button> or <button type="button" onClick={handleStartEditor} className="text-lime-500"> TEXT </button>.
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  placeholder="Start typing..."
                  onChange={handContentChanged}
                  value={content}
                />
              )}
              </div>
            
            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="bg-slate-900 flex items-center justify-center gap-2 hover:bg-red-900 p-3 w-full text-sm text-slate-100 font-medium outline-none"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-lime-100">Recording... (click to stop)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="bg-lime-500 p-3 w-full text-sm text-slate-800 font-medium outline-none"
              >
                <span className="text-lime-950">Save note</span>
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
