import { useState, useRef, useEffect } from 'react';
import { Menu, X, TrendingUp, Database, MessageSquare, FileText, HardDrive } from 'lucide-react';
import { Button } from './ui/button';
import { NavigationItem } from '../App';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  items: NavigationItem[];
  currentPage: string;
  onNavigate: (path: string, label: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ items, currentPage, onNavigate, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [showUsageDropdown, setShowUsageDropdown] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUsageDropdown(false);
      }
    };

    if (showUsageDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showUsageDropdown]);

  const usageData = {
    spent: 1.42,
    limit: 5.0,
    percentage: 28,
    breakdown: [
      { label: 'File Storage', percentage: 34, icon: FileText },
      { label: 'Messages & Events', percentage: 62, icon: MessageSquare },
      { label: 'Table Rows', percentage: 20, icon: Database },
      { label: 'Vector DB Storage', percentage: 15, icon: HardDrive },
    ]
  };

  return (
    <div 
      className={`relative h-full border-r transition-all duration-300 ${
        isCollapsed ? 'w-[72px]' : 'w-[220px]'
      }`}
      style={{ 
        borderRadius: 0,
        background: 'linear-gradient(180deg, #111111 0%, #191919 100%)',
        borderColor: '#2A2A2A',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo + Toggle Button */}
        <div className="h-[64px] flex items-center justify-between px-4 border-b" style={{ borderColor: '#2A2A2A' }}>
          <div className="flex items-center gap-2">
            {!isCollapsed && (
              <>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #00E5FF 0%, #00A8CC 100%)',
                  }}
                >
                  <span className="text-white">FM</span>
                </div>
                <span className="text-lg text-white">Muazaf.ai</span>
              </>
            )}
            {isCollapsed && (
              <div className="w-8 h-8 mx-auto rounded-lg flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #00E5FF 0%, #00A8CC 100%)',
                }}
              >
                <span className="text-white">M</span>
              </div>
            )}
          </div>
          
          {/* Toggle Button - Top Right Corner */}
          <button
            onClick={onToggleCollapse}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/5"
            style={{
              border: '1px solid #2A2A2A',
              background: '#161616',
            }}
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4 text-gray-400" />
            ) : (
              <X className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const isActive = currentPage === item.path || currentPage.startsWith(item.path + '/');
            
            return (
              <div 
                key={item.id}
                className="relative"
                onMouseEnter={() => isCollapsed && setShowTooltip(item.id)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <button
                  onClick={() => onNavigate(item.path, item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isCollapsed ? 'justify-center' : 'justify-start'
                  } ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={{
                    background: isActive ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                    position: 'relative',
                  }}
                >
                  {/* Active indicator - vertical bar on left */}
                  {isActive && (
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r"
                      style={{
                        background: 'linear-gradient(180deg, #00E5FF 0%, #00A8CC 100%)',
                        boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
                      }}
                    />
                  )}
                  
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="flex-1 text-left text-sm">{item.label}</span>
                  )}
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && showTooltip === item.id && (
                  <div 
                    className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg text-sm text-white whitespace-nowrap z-50"
                    style={{
                      background: '#1A1A1A',
                      border: '1px solid #2A2A2A',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* AI Usage Component - Bottom */}
        <div className="relative p-3" ref={dropdownRef}>
          {/* Dropdown Panel - Opens Upwards */}
          <AnimatePresence>
            {showUsageDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-3 right-3 mb-2 p-4 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(22, 22, 22, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid #2A2A2A',
                  boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.6)',
                }}
              >
                {/* AI Spend Card */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">AI Spend</span>
                    <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
                  </div>
                  <div className="mb-2">
                    <span className="text-white">${usageData.spent.toFixed(2)}</span>
                    <span className="text-gray-500 text-sm"> of ${usageData.limit.toFixed(2)} used</span>
                  </div>
                  
                  {/* Animated Progress Bar */}
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#1A1A1A' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${usageData.percentage}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #00E5FF 0%, #00A8CC 100%)',
                        boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
                      }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-gray-500">{usageData.percentage}%</div>
                </div>

                {/* Usage Breakdown */}
                <div className="space-y-3">
                  <div className="text-xs text-gray-400 mb-2">Usage Breakdown</div>
                  {usageData.breakdown.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <item.icon className="w-3.5 h-3.5 text-gray-500" />
                          <span className="text-gray-300">{item.label}</span>
                        </div>
                        <span className="text-gray-400">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: '#1A1A1A' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="h-full rounded-full"
                          style={{
                            background: item.percentage > 50 
                              ? 'linear-gradient(90deg, #F46D6B 0%, #E63946 100%)' 
                              : 'linear-gradient(90deg, #00E5FF 0%, #00A8CC 100%)',
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed State Button */}
          <button
            onClick={() => setShowUsageDropdown(!showUsageDropdown)}
            className="w-full p-3 rounded-lg transition-all duration-200 hover:bg-white/5"
            style={{
              background: 'rgba(22, 22, 22, 0.8)',
              border: '1px solid #2A2A2A',
            }}
          >
            {isCollapsed ? (
              <div className="flex flex-col items-center gap-1">
                <TrendingUp className="w-5 h-5 text-[#00E5FF]" />
                <div className="text-[10px] text-gray-400">{usageData.percentage}%</div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">AI Spend</span>
                  <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-white">
                    ${usageData.spent.toFixed(2)} <span className="text-gray-500">/ ${usageData.limit.toFixed(2)}</span>
                  </div>
                </div>
                {/* Mini Progress Bar */}
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#1A1A1A' }}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${usageData.percentage}%`,
                      background: 'linear-gradient(90deg, #00E5FF 0%, #00A8CC 100%)',
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500">{usageData.percentage}% used</div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
