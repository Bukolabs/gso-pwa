import classNames from 'classnames';
import styles from './error-page.module.scss';

export interface ErrorPageProps {
   title: string;
   message: string;
}

export function ErrorPage({ title, message }: ErrorPageProps) {
   return (
      <div className={classNames(styles['container'])}>
         <div className="flex flex-column align-items-center justify-content-center">
            <div
               style={{
                  padding: '0.3rem',
               }}
            >
               <div
                  className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
                  style={{ borderRadius: '53px' }}
               >
                  <div
                     className="flex justify-content-center align-items-center bg-red-500 border-circle"
                     style={{ height: '3.2rem', width: '3.2rem' }}
                  >
                     <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                  </div>
                  <h1 className="text-900 font-bold text-5xl mb-2 text-center">
                     {title}
                  </h1>
                  <div className="text-600 mb-5 text-center">{message}</div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ErrorPage;
