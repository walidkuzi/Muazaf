import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Settings } from 'lucide-react';

const CustomNode = ({ data, selected }: NodeProps) => {
  return (
    <div
      className={`px-4 py-3 rounded-[14px] border-2 backdrop-blur-md transition-all duration-300 min-w-[200px] ${
        selected
          ? 'border-[#00E5FF] shadow-lg'
          : 'border-white/20 hover:border-[#00E5FF]/50'
      }`}
      style={{
        background: `rgba(255, 255, 255, 0.08)`,
        boxShadow: selected 
          ? `0 0 30px ${data.color}60, 0 0 60px ${data.color}30` 
          : 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-[#00E5FF] !border-2 !border-[#0B0E12]"
        style={{ left: -6 }}
      />

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, ${data.color}40, ${data.color}20)`,
            border: `1px solid ${data.color}60`,
            boxShadow: `0 0 15px ${data.color}30`,
          }}
        >
          <Settings 
            className="w-5 h-5" 
            style={{ color: data.color }}
          />
        </div>
        
        <div className="flex-1">
          <p className="text-white font-medium mb-0.5">{data.label}</p>
          {data.nodeType && (
            <p className="text-[#aeb9e1] text-xs opacity-70">{data.nodeType}</p>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-[#00E5FF] !border-2 !border-[#0B0E12]"
        style={{ right: -6 }}
      />
    </div>
  );
};

export default memo(CustomNode);
