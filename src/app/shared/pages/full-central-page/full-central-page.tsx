import { ReactNode } from 'react';

export interface FullCentralPageProps {
   children: ReactNode;
}

export function FullCentralPage({ children }: FullCentralPageProps) {
   return (
      <div className="min-h-screen flex items-center justify-center bg-white">
         <div className="container mx-auto px-4">
            <div className="mx-auto max-w-[50%] sm:max-w-none xl:max-w-6xl bg-white rounded-lg">
               {children}
            </div>
         </div>
      </div>
   );
}

export default FullCentralPage;
