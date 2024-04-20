import React from 'react';

const Hello = (props) => {
  //we expect props to have a property called name
  let greeting = `Hello ${props.name}`;
  if (!props.name) {
    greeting = `Hello World`;
  }
  return <h1>{greeting}</h1>;
}
export default Hello;