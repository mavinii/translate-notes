import logo from "./assets/logo-nlw-experts.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      
      {/* Logo */}
      <img src={logo} alt="nlw logo" />

      {/* Search */}
      <form className="w-full">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight focus:outline-none placeholder:text-slate-500"
        />
      </form>

      {/* Dashlined */}
      <div className="h-px bg-slate-600" />

      {/* Notes */}
      <div className="grid grid-cols-3 auto-rows-[250px] gap-5">

        <NewNoteCard />
        <NoteCard note={ {
          id: 'string',
          date: new Date(),
          content: 'string'
        } } />

      </div>
    </div>
  );
}
