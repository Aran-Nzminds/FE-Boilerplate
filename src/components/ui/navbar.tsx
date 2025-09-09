import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@components/ui/button';
import { DropdownMenu } from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';
import { useAuth } from '@hooks/use-auth';

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    localStorage.clear();
    Object.keys(Cookies.get()).forEach(cookie => Cookies.remove(cookie));
    logout();
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Products', to: '/products' },
    { label: 'Contact', to: '/contact' },
  ];

  const LanguageOptions = [
    { label: 'English', onClick: () => changeLanguage('en') },
    { label: 'Français', onClick: () => changeLanguage('fr') },
    { label: 'Deutsch', onClick: () => changeLanguage('de') },
    { label: '中文', onClick: () => changeLanguage('zh') },
    { label: '日本語', onClick: () => changeLanguage('ja') },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="flex items-center justify-between bg-white px-6 md:px-12 py-4 shadow-md border-b">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide text-blue-600 hover:text-blue-700 transition"
      >
        TDSG
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {menuItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            {t(item.label)}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-3 py-2 w-56 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <DropdownMenu
          trigger={
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {i18n.language.toUpperCase()}
            </Button>
          }
          items={LanguageOptions}
        />

        <Button onClick={handleLogout} className=" text-white">
          Logout
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <DropdownMenu
          trigger={
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
          }
          items={[
            { label: 'Home', onClick: () => console.log('Home') },
            { label: 'About', onClick: () => console.log('About') },
            { type: 'separator', label: '' },
            { label: 'Logout', onClick: handleLogout },
          ]}
        />
      </div>
    </nav>
  );
}
