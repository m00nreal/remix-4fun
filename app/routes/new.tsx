import { useState } from 'react';
import Navbar from '~/components/navbar';
import { Button } from '~/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';

export default function New() {
  const [elements, setElements] = useState(['Dia 1']);

  const onAddElement = () => {
    setElements((prev) => [...prev, 'Dia ' + (prev.length + 1)]);
  };

  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <div className="bg-slate-100 flex-1 p-2 md:py-8 md:px-12">
        <Days elements={elements} onAddElement={onAddElement} />
        <section className=""></section>
      </div>
    </div>
  );
}

type DaysProps = {
  elements: string[];
  onAddElement: () => void;
};

function Days({ elements, onAddElement }: DaysProps) {
  return (
    <div className="flex gap-4">
      <Button onClick={onAddElement}>Añadir día</Button>
      <ToggleGroup className="flex gap-2" type="single">
        {elements.map((element) => (
          <ToggleGroupItem variant={'outline'} key={element} className="bg-white" value={element.toLowerCase()}>
            {element}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
