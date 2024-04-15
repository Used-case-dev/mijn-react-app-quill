import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // importeer CSS voor Quill

// Importeer je firebase-config om toegang te krijgen tot je Firestore
import { projectFirestore } from './firebase-config';

function QuillEditor() {
  const quillRef = useRef(null); // Een referentie om de Quill-editor te kunnen aanspreken

  useEffect(() => {
    const editor = new Quill(quillRef.current, {
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

    const handleSubmit = async () => {
      const content = editor.getContents(); // Haalt de inhoud van de Quill-editor op

      try {
        // Voeg het document toe aan je Firestore-database
        await projectFirestore.collection('documents').add({
          content: content,
          createdAt: projectFirestore.FieldValue.serverTimestamp()
        });
        alert('Inhoud verstuurd!');
      } catch (error) {
        console.error('Fout bij het versturen van de inhoud:', error);
        alert('Fout bij het versturen van de inhoud.');
      }
    };

    // Zoek de 'Verstuur'-knop in je index.html en voeg een event listener toe
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', handleSubmit);

    // Cleanup event listener wanneer de component niet meer in gebruik is
    return () => {
      submitBtn.removeEventListener('click', handleSubmit);
    };
  }, []);

  return (
    <div>
      <div ref={quillRef} style={{ height: '400px' }}></div>
      <button id="submitBtn">Verstuur</button>
    </div>
  );
}

export default QuillEditor;
