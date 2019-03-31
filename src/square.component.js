import React from 'react';

export function Square(props) {
  const currentValue = props.value ? props.value : '';
  return (
    <button
      className={`square ${currentValue}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
