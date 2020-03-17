title Saving a note (SPA)

note over browser:
User enters the note on the form's input
then clicks "Save"
end note
note over browser:
Client JS triggered:
1.- Form post default functionality stopped with preventDefault()
2.- redrawNotes() function re-renders the notes (including the new note).
3.- sendToServer() function sends the new data (note) to the server through a POST request.
end note
browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
server->browser: Response: HTTP status 201. JSON Content: {"message":"note created"}
