import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
  params: {}
});

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return (window.location.pathname || '/') + (window.location.hash || '');
    }
    return '/';
  });

  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath((window.location.pathname || '/') + (window.location.hash || ''));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      const hasHash = path.includes('#');
      const hash = hasHash ? path.split('#')[1] : '';

      window.history.pushState({}, '', path);
      setCurrentPath(path);

      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Helper to extract params based on patterns
  useEffect(() => {
    const newParams: Record<string, string> = {};
    if (currentPath.startsWith('/programs/')) {
      const slug = currentPath.replace('/programs/', '').split('?')[0];
      newParams.programSlug = slug;
    } else if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '').split('?')[0];
      newParams.projectSlug = slug;
    } else if (currentPath.startsWith('/services/') && currentPath !== '/services') {
      const slug = currentPath.replace('/services/', '').split('?')[0];
      newParams.serviceSlug = slug;
    } else if (currentPath.startsWith('/insights/')) {
      const slug = currentPath.replace('/insights/', '').split('?')[0];
      newParams.articleSlug = slug;
    }
    setParams(newParams);
  }, [currentPath]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
};
