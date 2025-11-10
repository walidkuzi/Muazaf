import { Bell, HelpCircle, Search, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface TopNavbarProps {
  breadcrumbs: string[];
}

export default function TopNavbar({ breadcrumbs }: TopNavbarProps) {
  return (
    <header 
      className="h-12 border-b flex items-center justify-between px-6"
      style={{
        background: '#111111',
        borderColor: '#2A2A2A',
      }}
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-gray-400">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5" />}
            <span 
              className={`text-sm ${index === breadcrumbs.length - 1 ? 'text-white' : 'text-gray-500'}`}
            >
              {crumb}
            </span>
          </div>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input 
            placeholder="Search..." 
            className="w-56 h-8 pl-9 text-sm rounded-lg"
            style={{
              background: '#161616',
              borderColor: '#2A2A2A',
            }}
          />
        </div>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative rounded-lg w-8 h-8 hover:bg-white/5"
        >
          <Bell className="w-4 h-4 text-gray-400" />
          <span 
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #00E5FF 0%, #00A8CC 100%)',
              boxShadow: '0 0 6px rgba(0, 229, 255, 0.6)',
            }}
          ></span>
        </Button>

        {/* Support */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-lg w-8 h-8 hover:bg-white/5"
        >
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </Button>

        {/* User Avatar */}
        <Avatar 
          className="w-8 h-8"
          style={{
            border: '2px solid rgba(0, 229, 255, 0.3)',
          }}
        >
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
          <AvatarFallback 
            className="text-xs"
            style={{
              background: 'linear-gradient(135deg, #161616 0%, #1A1A1A 100%)',
              color: '#00E5FF',
            }}
          >
            AD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
