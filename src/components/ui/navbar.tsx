import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Menu, Search } from 'lucide-react';
import Cookies from 'js-cookie';
import { useAuth } from '@hooks/use-auth';

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

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
    { label: 'Contact Us', to: '/contact' },
  ];

  return (
    <nav className="flex items-center justify-between bg-white px-6 md:px-12 py-4 shadow-md border-b">
      {/* Brand */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide text-blue-600 hover:text-blue-700 transition"
      >
        TDSG
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {menuItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right side (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-3 py-2 w-56 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <Button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white">
          Logout
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {menuItems.map(item => (
              <DropdownMenuItem key={item.to} asChild>
                <Link to={item.to}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
