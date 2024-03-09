import { useState } from 'react';
import { TypographyH2 } from './typography';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Navbar() {
  const [isFocused, setIsFocused] = useState(false);
  const [title, setTitle] = useState('Sin Titulo');

  return (
    <nav className="bg-white-900 shadow flex h-14 justify-between items-center px-4">
      <div className=""></div>
      {isFocused ? (
        <Input
          onBlur={() => setIsFocused(false)}
          autoFocus
          className="max-w-md outline-2 my-auto text-center"
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />
      ) : (
        <div onClick={() => setIsFocused(true)} className="flex justify-center items-center">
          <TypographyH2>{title}</TypographyH2>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button variant={'default'}>Exportar</Button>
        <Button variant={'secondary'}>Limpiar</Button>
      </div>
    </nav>
  );
}
