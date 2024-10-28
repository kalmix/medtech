import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment)
    .map(segment => ({
      label: segment
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      path: segment,
    }));

  const breadcrumbs = pathSegments.map((segment, index) => ({
    ...segment,
    href: '/' + pathSegments.slice(0, index + 1).map(seg => seg.path).join('/'),
  }));

  const isServiceRoute = pathSegments[0]?.path === 'service';

  // (/) Separator component
  const Separator = () => (
    <div className="flex items-center mx-2">
      <div className="h-4 w-px bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 rotate-12 transform" />
    </div>
  );

  return (
    <div className="hidden sm:flex mb-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1">
          {location.pathname === '/' ? (
            <li>
              <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <LayoutDashboard size={18} />
                <span>Home</span>
              </span>
            </li>
          ) : (
            <>
              <li>
                <Link 
                  to="/" 
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-opacity-80 transition-colors"
                >
                  <LayoutDashboard size={18} />
                  <span>Home</span>
                </Link>
              </li>
              
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.href} className="flex items-center">
                  <Separator />
                  {index === breadcrumbs.length - 1 || (isServiceRoute && index === 0) ? (
                    <span 
                      className="text-sm font-medium text-gray-500"
                      aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}
                    >
                      {breadcrumb.label}
                    </span>
                  ) : (
                    <Link
                      to={breadcrumb.href}
                      className="text-sm font-medium text-primary hover:text-opacity-80 transition-colors"
                    >
                      {breadcrumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;