import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { TypographyH1, TypographyMuted } from '~/components/typography';
import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [{ title: '4Fun' }, { name: 'description', content: '4Fun Site' }];
};

export default function Index() {
  return (
    <div className="container bg-background h-dvh flex justify-center">
      <div className="">
        <div className="text-center md:text-left mt-12 ">
          <TypographyH1>
            Crea planes alimenticios en <span className="text-orange-600 underline">minutos</span>
          </TypographyH1>
          <span className="text-center">
            <TypographyMuted>Ajustados 100% a tus necesidades y metas alimenticias</TypographyMuted>
          </span>
        </div>

        <Button asChild className="mt-8 mx-auto self-center">
          <Link to={'/new'} className="w">
            Crear mi primer plan
          </Link>
        </Button>
      </div>
    </div>
  );
}
