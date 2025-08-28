/// <reference types="nativewind/types" />

declare module 'nativewind' {
  
  export const styled: {
    <T extends React.ComponentType<any>>(Component: T): T & {
      className?: string;
    };
  };
}
