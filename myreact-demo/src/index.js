import React from 'react';
import ReactDOM from 'react-dom/client';
const jsx = <div>hello</div>;
console.log('myReact', React);
console.log('myReact', jsx);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(jsx);
