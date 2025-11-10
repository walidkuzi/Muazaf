# Advanced Workflow Builder Documentation

## Overview
A fully interactive workflow builder for AI Agent platforms using React Flow with drag-and-drop nodes, customizable connections, and a futuristic dark UI with glassmorphism effects.

## Architecture

### 3-Panel Layout

```
┌──────────────┬────────────────────────┬──────────────┐
│   Left       │       Center           │    Right     │
│ Node Library │   React Flow Canvas    │   Inspector  │
│  (280px)     │      (flex-1)          │   (384px)    │
└──────────────┴────────────────────────┴──────────────┘
```

**Responsive Breakdown:**
- Left Panel: 320px fixed width
- Center Canvas: Flexible (takes remaining space)
- Right Panel: 384px fixed width

## Left Panel - Node Library

### Features

**Search Bar**
- Real-time node filtering
- Searches across all categories
- Placeholder: "Search nodes..."

**Collapsible Categories**

Each category can be expanded/collapsed with smooth transitions:

1. **🟦 Messaging Nodes**
   - Send Text, Image, Audio, Video, File
   - Send Location, Card, Carousel

2. **⚙️ Database/API Nodes**
   - Execute Query, Get/Insert/Update/Delete Record
   - Find Record

3. **🧠 AI Providers**
   - OpenAI: Text, Image, Audio, Transcribe
   - Google AI: Text, Languages
   - Anthropic (Claude): Text
   - Groq/Fireworks/Cerebras: Text, Transcribe

4. **📊 Charts & Data Visualization**
   - Bar, Line, Pie, Scatter Charts
   - Doughnut, Radar, Bubble Charts

5. **📡 Communication Platforms**
   - Webchat: Configure, Send, Get Info, Widget Controls
   - WhatsApp: Text, Template, Media, Reactions

6. **🕒 Scheduler/Timing**
   - Fixed Schedule, Cron Schedule
   - Wait for X Seconds

7. **🎯 Logic & Flow**
   - Intent Trigger, If/Else Branch
   - Expression, Loop/Retry
   - AI Task, AI Transition

8. **📝 Capture User Information**
   - Single/Multiple Choice, Boolean
   - Email, Phone, Number
   - Address, DateTime, Price
   - Quantity, Color, Temperature
   - File Upload

9. **🛠️ Utilities**
   - Comment, Log
   - Image, Video
   - Extract Variables

### Node Card Design

```
┌─────────────────────────┐
│ [Icon] Node Name        │
│ Category color strip    │
└─────────────────────────┘
```

**Visual States:**
- Default: White/5 background, white/10 border
- Hover: White/10 background, purple/50 border
- Dragging: Cursor changes to grabbing

**Color-Coded Border:**
- Left border (3px) uses category color
- Visual identification at a glance

### Templates Section

Pre-built workflow templates at the bottom:

- **Customer Support Bot**
  - Description: Handle customer inquiries and support tickets
  
- **Sales Assistant**
  - Description: Guide customers through sales process
  
- **Flight Booking Bot**
  - Description: Help users book flights
  
- **Restaurant Reservation**
  - Description: Manage table bookings

**Template Cards:**
- Gradient background (purple to blue-gray)
- Click to load entire workflow
- Includes all nodes and connections

## Center Panel - React Flow Canvas

### Canvas Features

**Background:**
- Dots pattern (BackgroundVariant.Dots)
- Grid spacing: 20px
- Color: White at 20% opacity
- Base color: #0D0F13

**Interaction:**
- Infinite pan (drag canvas)
- Zoom with mouse wheel
- Snap to grid (15x15 grid)
- Double-click to add node (future)

**Top Toolbar (Panel position: top-left)**

Buttons:
1. **Import** - Load workflow from JSON file
2. **Export** - Save workflow as JSON
3. **Fit View** - Zoom to show all nodes
4. **Preview Flow** - Test workflow execution

**Bottom Status Bar (Panel position: bottom-center)**

Shows:
- Node count (e.g., "5 nodes")
- Connection count (e.g., "4 connections")
- Auto-save indicator

**Controls (Built-in React Flow)**
- Zoom in/out buttons
- Fit view button
- Interactive lock/unlock
- Custom styling: dark background with purple accents

**MiniMap (Bottom-right corner)**
- Shows entire canvas overview
- Nodes colored by category
- Current viewport indicator
- Click to navigate

### Node Interaction

**Drag and Drop:**
1. Drag node from library
2. Drop onto canvas
3. Node appears at cursor position
4. Success toast notification

**Node Selection:**
- Click to select
- Selected state: Purple border with glow
- Opens inspector panel

**Node Connection:**
- Drag from output handle (right)
- Drop on input handle (left)
- Creates animated edge
- Purple stroke with arrow marker

**Context Menu (Future Enhancement):**
- Right-click node
- Options: Duplicate, Delete, Disable

### Edge (Connection) Styling

**Default Edge:**
- Type: Smoothstep (rounded corners)
- Animated: True (moving dashes)
- Color: #732CFF (purple)
- Width: 2px
- Arrow marker at end

**Selected Edge:**
- Color: #aeb9e1 (light blue)
- Width: 3px
- More prominent

## Right Panel - Node Inspector

### Empty State

When no node is selected:
```
┌────────────────────────┐
│   ⚙️  Settings Icon    │
│  No Node Selected      │
│  Click on a node...    │
└────────────────────────┘
```

### Node Selected State

**Header:**
- Node icon with color-coded background
- Node name (editable)
- Node ID display
- Close button (eye icon)

**Basic Settings (All Nodes):**

1. **Node Name**
   - Text input
   - Defaults to node type
   - Updates label in canvas

2. **Description**
   - Textarea input
   - Optional documentation
   - Stored in node data

### Dynamic Settings by Category

#### Messaging Nodes

**Fields:**
- Message Content (textarea, 5 rows)
- Placeholder: "Enter your message..."
- Supports variables: {{user.name}}

#### AI Provider Nodes

**Fields:**

1. **Model Selection**
   - Dropdown: GPT-4, GPT-3.5, Claude 3
   - Each provider has specific models

2. **Prompt**
   - Large textarea (5 rows)
   - Supports template variables
   - Syntax highlighting (future)

3. **Temperature Slider**
   - Range: 0.0 - 1.0
   - Step: 0.1
   - Label shows current value
   - Default: 0.7

4. **Max Tokens**
   - Number input
   - Default: 2000
   - Controls response length

#### Database Nodes

**Fields:**

1. **Query**
   - Textarea with monospace font
   - SQL syntax (future: syntax highlighting)
   - Example: "SELECT * FROM table..."

2. **Connection String**
   - Password-masked input
   - Format: postgresql://...
   - Secure storage

#### Logic Nodes

**Fields:**

1. **Condition**
   - Textarea for expressions
   - Example: "user.age > 18"
   - Supports JavaScript syntax

### Action Buttons

**Save Settings**
- Primary button (purple)
- Shows loading spinner
- Success toast on save
- Updates node data

**Duplicate Node**
- Outline button
- Creates copy offset by (50, 50)
- Maintains all settings

**Delete Node**
- Red outline button
- Removes node and connections
- Confirmation toast

**Tip Box:**
- Purple background with border
- Helpful hints for users
- 💡 icon

## Node Component Design

### CustomNode Structure

```tsx
<div className="node-container">
  <Handle type="target" position="left" />
  
  <div className="node-content">
    <div className="node-icon">Icon</div>
    <div className="node-label">Label</div>
  </div>
  
  <Handle type="source" position="right" />
</div>
```

### Visual Specifications

**Container:**
- Padding: 12px 16px
- Border-radius: 12px
- Border: 2px solid
- Min-width: 180px
- Backdrop-filter: blur(12px)

**Background:**
- Linear gradient: `${color}40` to `${color}20`
- 40% transparency for glass effect
- Category color determines gradient

**Border States:**
- Default: white/20 (subtle)
- Hover: purple/50 (purple glow)
- Selected: #732CFF (solid purple)

**Shadow:**
- Default: None
- Selected: `0 0 30px ${color}40` (glow effect)

**Icon Container:**
- Size: 32x32px
- Border-radius: 8px
- Background: `${color}30`
- Border: `1px solid ${color}50`

**Handles (Connection Points):**
- Size: 12x12px (3 x 3 in Tailwind)
- Color: #732CFF
- Border: 2px white/50
- Position: -6px from edge

## Data Models

### Node Data Structure

```typescript
interface NodeData {
  label: string;          // Display name
  icon: LucideIcon;       // Icon component
  color: string;          // Category color (hex)
  category: string;       // Category ID
  subtitle?: string;      // Optional subtitle
  settings: {             // Dynamic settings object
    [key: string]: any;
  };
}
```

### Node Definition

```typescript
interface NodeDefinition {
  id: string;             // Unique node type ID
  type: string;           // React Flow type ('custom')
  label: string;          // Display name
  icon: LucideIcon;       // Icon component
  category: string;       // Category ID
  color: string;          // Hex color code
  data?: any;             // Default data
}
```

### Workflow Export Format

```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "custom",
      "position": { "x": 250, "y": 100 },
      "data": {
        "label": "Send Text",
        "category": "messaging",
        "color": "#732CFF",
        "settings": {
          "message": "Hello {{user.name}}!"
        }
      }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "type": "smoothstep",
      "animated": true
    }
  ]
}
```

## Color Palette

### Category Colors

| Category | Color | Usage |
|----------|-------|-------|
| Messaging | #732CFF | Purple - Primary actions |
| Database | #606283 | Blue-Gray - Data operations |
| AI | #aeb9e1 | Light Blue - AI/ML operations |
| Charts | #F46D6B | Coral - Visualizations |
| Communication | #535E82 | Dark Blue-Gray - Channels |
| Scheduler | #606283 | Blue-Gray - Time-based |
| Logic | #732CFF | Purple - Flow control |
| Capture | #aeb9e1 | Light Blue - Input collection |
| Utilities | #535E82 | Dark Blue-Gray - Tools |

### UI Colors

| Element | Color | Opacity |
|---------|-------|---------|
| Background | #0D0F13 | 100% |
| Card | #191919 | 100% |
| Card Alt | #2A2A2A | 100% |
| Border | #ffffff | 10% |
| Text Primary | #ffffff | 100% |
| Text Secondary | #aeb9e1 | 100% |
| Accent | #732CFF | 100% |
| Error | #F46D6B | 100% |

## Interactions & Animations

### Drag & Drop

**States:**
1. **Idle**: Node card in library
2. **Drag Start**: Cursor becomes `grab`
3. **Dragging**: Cursor becomes `grabbing`
4. **Over Canvas**: Drop cursor appears
5. **Drop**: Node appears with fade-in

**Visual Feedback:**
- Source node gets dragging cursor
- Canvas shows drop zone
- Toast notification on success

### Node Selection

**Animation:**
- Border color: white/20 → #732CFF (200ms)
- Shadow: none → glow effect (300ms)
- Scale: 1.0 → 1.0 (no scale)

**Effects:**
- Purple border appears
- Glow shadow adds depth
- Inspector panel updates

### Edge Creation

**Flow:**
1. Click on source handle
2. Drag connection line (follows cursor)
3. Hover over target handle (handle highlights)
4. Release to connect
5. Animated edge appears

**Animation:**
- Connection line: Smooth bezier curve
- Edge animation: Moving dashes
- Duration: Continuous loop

### Button Interactions

**Hover States:**
- Background: transparent → white/10 (200ms)
- Border: Subtle glow
- Cursor: pointer

**Click States:**
- Scale: 1.0 → 0.95 → 1.0 (150ms)
- Background flash

**Loading States:**
- Button disabled
- Spinner icon animates
- Text changes to "Saving..."

## Features Implementation

### ✅ Implemented

1. **Drag & Drop**
   - From library to canvas
   - Node positioning
   - Toast notifications

2. **Node Library**
   - 9 categories
   - 50+ node types
   - Collapsible sections
   - Search functionality

3. **Canvas Controls**
   - Pan and zoom
   - Snap to grid
   - Background dots
   - MiniMap

4. **Node Inspector**
   - Dynamic settings
   - Category-specific fields
   - Save functionality
   - Duplicate/Delete

5. **Import/Export**
   - JSON format
   - File download
   - File upload

6. **Auto-save**
   - Every 5 seconds
   - Status indicator
   - Console logging

7. **Templates**
   - 4 pre-built workflows
   - One-click loading
   - Descriptions

### 🚧 Future Enhancements

1. **Advanced Features**
   - Undo/Redo stack
   - Multi-node selection
   - Group nodes
   - Node alignment tools

2. **Context Menu**
   - Right-click on node
   - Quick actions
   - Keyboard shortcuts

3. **Validation**
   - Required connections
   - Input validation
   - Error highlighting

4. **Execution**
   - Test individual nodes
   - Run entire workflow
   - Debug mode
   - Trace data path

5. **Collaboration**
   - Real-time editing
   - Comments on nodes
   - Version history

6. **Advanced Nodes**
   - Custom node types
   - Subflows (nested workflows)
   - API integrations

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Delete` | Delete selected node |
| `Ctrl/Cmd + C` | Copy selected node |
| `Ctrl/Cmd + V` | Paste node |
| `Ctrl/Cmd + Z` | Undo (future) |
| `Ctrl/Cmd + Shift + Z` | Redo (future) |
| `Ctrl/Cmd + S` | Save workflow |
| `Space + Drag` | Pan canvas |
| `+` or `=` | Zoom in |
| `-` | Zoom out |
| `0` | Reset zoom |
| `F` | Fit view |

## Performance Optimization

### Virtual Rendering

React Flow handles:
- Only renders visible nodes
- Efficient edge calculation
- Smooth 60fps interactions

### State Management

- `useNodesState`: Optimized node updates
- `useEdgesState`: Optimized edge updates
- `useCallback`: Prevents unnecessary re-renders
- `memo`: CustomNode component memoized

### Auto-save Strategy

- Debounced writes
- Background saves
- No UI blocking
- Error recovery

## Testing Checklist

### Manual Tests

- [ ] Drag node from library
- [ ] Drop node on canvas
- [ ] Connect two nodes
- [ ] Select node
- [ ] Edit node settings
- [ ] Save node settings
- [ ] Duplicate node
- [ ] Delete node
- [ ] Export workflow
- [ ] Import workflow
- [ ] Use minimap
- [ ] Pan canvas
- [ ] Zoom canvas
- [ ] Fit view
- [ ] Collapse/expand categories
- [ ] Search nodes
- [ ] Load template
- [ ] Preview flow

### Edge Cases

- [ ] Drop outside canvas
- [ ] Connect node to itself
- [ ] Delete connected node
- [ ] Import invalid JSON
- [ ] Large workflow (100+ nodes)
- [ ] Empty workflow
- [ ] Overlapping nodes
- [ ] Edge crossing

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Supported |
| Firefox | 88+ | ✅ Supported |
| Safari | 14+ | ✅ Supported |
| Edge | 90+ | ✅ Supported |

## Dependencies

### Core

- `react`: ^18.0.0
- `reactflow`: Latest
- `lucide-react`: Icons

### UI Components

- Custom UI library (shadcn/ui based)
- Tailwind CSS v4

### Utilities

- `sonner`: Toast notifications

## File Structure

```
components/
├── pages/
│   └── WorkflowsPage.tsx       # Main workflow page
├── workflow/
│   └── CustomNode.tsx          # Custom node component
└── ui/                         # UI component library

styles/
└── globals.css                 # React Flow overrides
```

## API Integration (Future)

### Endpoints

```typescript
// Save workflow
POST /api/workflows
Body: { name, nodes, edges }

// Load workflow
GET /api/workflows/:id

// List workflows
GET /api/workflows

// Delete workflow
DELETE /api/workflows/:id

// Execute workflow
POST /api/workflows/:id/execute
Body: { input }
```

## Conclusion

This advanced workflow builder provides a professional, intuitive interface for creating complex AI agent workflows with a beautiful dark futuristic design and smooth user experience.
