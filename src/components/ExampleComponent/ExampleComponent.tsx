import { useState } from 'react';
import './ExampleComponent.css';

interface ExampleComponentProps {
  title: string;
  description?: string;
}

function ExampleComponent({ title, description }: ExampleComponentProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="example-component">
      <h2>{title}</h2>
      {description && <p className="description">{description}</p>}
      <div className="counter">
        <button onClick={() => setCount((c) => c - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
      </div>
    </div>
  );
};

export default ExampleComponent;
