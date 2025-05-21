import React from 'react';

interface RouteLoaderProps {
  children: React.ReactNode;
}

const RouteLoader: React.FC<RouteLoaderProps> = ({ children }) => {
  return <>{children}</>;
};

export default RouteLoader;
