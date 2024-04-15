import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Importeer CSS voor Quill

// Importeer je firebase-config om toegang te krijgen tot je Firestore
import { projectFirestore } from './firebase-config';

function QuillEditor() {
  const quillRef = useRef(null); // Een referentie om de Quill-editor te kunnen aanspreken

  useEffect(() => {
    // Initialiseer Quill op quillRef
    const quill = new Quill(quillRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }]
        ],
      },
    });

    return () => {
      quill.off('text-change');
    };
  }, []);

  const handleSubmit = async () => {
    // Verzamel de inhoud van de Quill-editor
    const content = quillRef.current.getContents();
    
    try {
      // Voeg het document toe aan je Firestore-database
      await projectFirestore.collection('documents').add({
        content: content.ops, // Zorg ervoor dat je de juiste inhoudsstructuur hier plaatst
        createdAt: projectFirestore.FieldValue.serverTimestamp()
      });
      alert('Inhoud verstuurd!');
    } catch (error) {
      console.error('Fout bij het versturen van de inhoud:', error);
      alert('Fout bij het versturen van de inhoud.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', width: '500px', margin: 'auto' }}>
      <div ref={quillRef} style={{ height: '500px' }}></div>
      <button onClick={handleSubmit} style={{ display: 'block', width: '100%', marginTop: '20px' }}>
        Verstuur
      </button>
    </div>
  );
}

export default QuillEditor;
