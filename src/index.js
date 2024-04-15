import React from 'react';
import ReactDOM from 'react-dom';
import QuillEditor from './QuillEditor'; // Zorg dat dit pad klopt

const App = () => (
  <div>
    <h1>Hallo</h1>
    <QuillEditor /> {/* Dit is je QuillEditor component */}
  </div>
);

ReactDOM.render(<App />, document.getElementById('react-target'));
