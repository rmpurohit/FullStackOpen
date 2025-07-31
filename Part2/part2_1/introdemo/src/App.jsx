const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/*<li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
        
        <ul>
        {notes.map((note, i) => 
          <li key={i}>
          {note.content}
          </li>
        )}
        </ul>
        */}

        
        {notes.map(note => 
          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App