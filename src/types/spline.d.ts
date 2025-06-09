declare module '@splinetool/react-spline' {
  import { FC, ReactNode } from 'react';
  
  interface SplineProps {
    scene: string;
    onLoad?: () => void;
    onError?: (error: Error) => void;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
  }
  
  const Spline: FC<SplineProps>;
  
  export default Spline;
}

declare module '@splinetool/runtime' {
  export interface Spline {
    findObjectByName: (name: string) => any;
    findObjectById: (id: string) => any;
    findObjectsByType: (type: string) => any[];
  }
}