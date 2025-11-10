# Advanced Inbox Page Documentation

## Overview
Enterprise-grade inbox module for AI Agent platform with conversation management, ticketing system, appointment scheduling, and AI/human collaboration features. Designed to compete with Zendesk, Intercom, and Front.

## Architecture

### 3-Panel Layout

```
┌─────────────┬──────────────────┬─────────────┐
│   Left      │      Middle      │    Right    │
│ Conversations│   Chat Window    │  Customer   │
│    List     │                  │   Details   │
└─────────────┴──────────────────┴─────────────┘
```

**Responsive Grid:**
- Left Panel: 3 columns (25%)
- Middle Panel: 6 columns (50%)
- Right Panel: 3 columns (25%)

## Left Panel - Conversations List

### Features

**Search Bar**
- Real-time filtering by user name
- Icon: Magnifying glass
- Placeholder: "Search conversations..."

**Sort Options**
- Newest First (default)
- Oldest First
- By Priority
- By Channel

**Filter Tabs**
1. **All** - Shows all conversations
2. **Bot** - AI-only conversations
3. **Waiting** - Needs human attention
4. **Human** - Agent-assigned conversations

### Conversation Card Design

Each conversation displays:
- **Avatar** with online indicator (green dot)
- **Channel icon** (WhatsApp 💬, Instagram 📷, Webchat 🌐, Facebook 👥, Email ✉️)
- **User name** (or "Anonymous Visitor")
- **Tags** (VIP, Refund, Complaint, New Lead, etc.)
- **Last message** preview (or "typing..." animation)
- **Timestamp** (2m ago, 15m ago, 1h ago, etc.)
- **Unread badge** (purple circle with count)
- **Status badge** (Bot icon or User icon)

**Selection State:**
- Selected: Purple border (#732CFF/20 background)
- Hover: Border lightens
- Smooth 300ms transitions

**Add Conversation Button:**
- Bottom of panel
- Opens modal to manually start conversation
- Use case: Testing, proactive outreach

## Middle Panel - Chat Window

### Header Section

**User Info:**
- Large avatar (48px)
- Online/Offline/Typing status
- Channel icon badge

**Action Buttons:**

1. **Take Over / Resume AI**
   - Purple button when AI is active
   - Gray button when human is active
   - Shows toast notification on toggle
   - Adds system message to chat

2. **Create Ticket**
   - Converts conversation to support ticket
   - Auto-generates ticket ID (TCK-XXXX)
   - Opens ticket panel in right sidebar
   - Success toast with ticket number

3. **Assign Agent** (Dropdown)
   - List of available agents
   - Shows success toast on assignment
   - Updates conversation status

4. **Call** 
   - Initiates voice/video call
   - Future: WebRTC integration

5. **Close**
   - Archives conversation
   - Red text color
   - Confirmation required

### Chat Messages

**Message Types:**

**1. User Messages (Left-aligned)**
```
┌─────────────────────────┐
│ User message content... │
│ 10:30 AM                │
└─────────────────────────┘
```
- Dark gray background (#2A2A2A)
- White text
- Rounded corners, sharp top-left

**2. Bot Messages (Right-aligned)**
```
┌─────────────────────────┐
│ 🤖 AI Bot               │
│ Bot response...         │
│ 10:31 AM                │
└─────────────────────────┘
```
- Purple gradient background
- White text
- Bot icon badge
- Rounded corners, sharp top-right

**3. Agent Messages (Right-aligned)**
```
┌─────────────────────────┐
│ 👤 Agent Sarah          │
│ Agent response...       │
│ 10:32 AM                │
└─────────────────────────┘
```
- Light blue background (#aeb9e1)
- Dark text
- Agent name badge
- Rounded corners, sharp top-right

**System Messages:**
- Centered notifications
- Purple background with border
- Examples:
  - "Human agent is now assisting - AI is on standby"
  - "Agent Sarah joined the chat"
  - "Conversation transferred from Bot to Human"

### Input Area

**Send Mode Toggle:**
- Switch between "Send as Bot" / "Send as Human Agent"
- Visual indicator with label

**AI Suggest Reply:**
- Sparkles icon button
- Generates AI-suggested response
- Populates input field
- User can edit before sending

**Input Field:**
- Textarea with auto-resize
- Supports multiline (Shift+Enter)
- Enter to send
- Max height: 120px

**Attachment Buttons:**
- Paperclip icon (file upload)
- Smile icon (emoji picker)

**Send Button:**
- Purple background
- Send icon
- Disabled when input empty

## Right Panel - Customer Details

### 1. Customer Profile Card

**Contact Information:**
- Email (with envelope icon)
- Phone (with phone icon)
- Location (with pin icon)
- IP address

**Quick Stats (2-column grid):**
- Total Chats: 24
- Total Spent: $12,450

**Sentiment Analysis:**
- Positive: Green trending up arrow
- Negative: Red trending down arrow
- Neutral: Gray text

**Tags:**
- Purple badges
- Examples: VIP, Refund, Frequent Buyer
- Clickable for filtering

### 2. Ticket Panel (Conditional)

Shows when "Create Ticket" is clicked.

**Fields:**
- **Ticket ID**: Auto-generated (TCK-XXXX)
- **Priority**: Low / Normal / High / Critical
- **Status**: Open / In Progress / Waiting / On Hold / Solved
- **Assigned To**: Agent dropdown
- **Due Date**: Date picker
- **Tags**: Multi-select

**Design:**
- Gradient purple background
- Close button (X) in header
- Save button at bottom

### 3. Appointments Card

**Features:**
- Mini calendar view
- "Schedule Meeting" button
- Shows upcoming appointments
- Empty state: Calendar icon with message

**Scheduler Form:**
- DateTime picker
- Meeting notes textarea
- Assigned agent dropdown
- Save button

**Integrations:**
- Google Calendar sync
- Outlook sync
- iCal export

### 4. Internal Notes

**Purpose:**
- Private agent notes
- Not visible to customer
- Searchable

**Design:**
- Textarea input
- Save button
- History of past notes

### 5. AI Assist

**Features:**

**Summarize Conversation:**
- Generates chat summary
- Key points extraction
- Sentiment analysis

**Suggest Reply:**
- AI-generated responses
- Context-aware
- Editable before sending

**Improve AI:**
- Mark conversation for training
- Learning experience creation
- Feedback loop

**Design:**
- Purple gradient card
- Sparkles icon
- Action buttons

## Functional Flows

### Flow 1: Human Handoff

```
User sends message
    ↓
Bot responds (purple gradient bubble)
    ↓
User requests human help
    ↓
Agent clicks "Take Over"
    ↓
System message: "Human agent is now assisting"
    ↓
Bot goes to standby (AI icon grayed out)
    ↓
Agent types response (blue bubble)
    ↓
Issue resolved
    ↓
Agent clicks "Resume AI"
    ↓
Bot takes over again
```

### Flow 2: Ticket Creation

```
Conversation escalates
    ↓
Agent clicks "Create Ticket"
    ↓
System generates TCK-XXXX
    ↓
Ticket panel opens in right sidebar
    ↓
Agent fills: Priority, Status, Due Date
    ↓
Clicks "Save Ticket"
    ↓
Success toast notification
    ↓
Ticket appears in customer history
```

### Flow 3: Appointment Scheduling

```
Customer needs consultation
    ↓
Agent clicks "+" in Appointments
    ↓
Scheduler form appears
    ↓
Agent selects date/time
    ↓
Adds meeting notes
    ↓
Assigns agent (self or other)
    ↓
Clicks "Schedule Meeting"
    ↓
Calendar event created
    ↓
Confirmation sent to customer
    ↓
Reminder notifications sent
```

### Flow 4: AI-Assisted Response

```
Customer sends complex question
    ↓
Agent clicks "Suggest Reply"
    ↓
AI analyzes conversation context
    ↓
Generates 3 response options
    ↓
Populates input field
    ↓
Agent reviews and edits
    ↓
Sends response
```

## Data Models

### Conversation Interface
```typescript
interface Conversation {
  id: string;
  user: string;
  avatar: string;
  channel: 'whatsapp' | 'instagram' | 'webchat' | 'facebook' | 'email';
  status: 'bot' | 'human' | 'waiting' | 'assigned';
  tags: string[];
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
  isTyping: boolean;
  priority?: 'low' | 'normal' | 'high' | 'critical';
}
```

### Message Interface
```typescript
interface Message {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  content: string;
  time: string;
  agentName?: string;
}
```

### Customer Profile Interface
```typescript
interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  ip: string;
  tags: string[];
  totalChats: number;
  totalSpent: string;
  joinedDate: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}
```

## Design System

### Colors

**Backgrounds:**
- Main: #191919
- Secondary: #2A2A2A
- Overlay: #111111

**Accents:**
- Primary Purple: #732CFF
- Secondary Blue-Gray: #606283
- Light Blue: #aeb9e1
- Error Red: #F46D6B

**Borders:**
- Subtle: white/10 (10% opacity)
- Hover: white/20
- Active: #732CFF/50

### Typography

**Font Family:**
- Inter / IBM Plex Sans
- System font fallbacks

**Sizes:**
- Headings: Default (from globals.css)
- Body: 14px (text-sm)
- Small: 12px (text-xs)

### Spacing

**Padding:**
- Cards: 16px (p-4)
- Sections: 24px (p-6)

**Gaps:**
- Small: 8px (gap-2)
- Medium: 12px (gap-3)
- Large: 16px (gap-4)

### Borders & Radius

**Border Radius:**
- Cards: 16px (rounded-2xl)
- Buttons: 12px (rounded-xl)
- Badges: Full (rounded-full)

**Border Width:**
- Default: 1px
- Active: 2px

### Animations

**Transitions:**
- Default: 200ms ease
- Hover: 300ms ease
- Slide: 350ms ease

**Effects:**
- Fade in: opacity 0 → 1
- Slide in: transform translateY
- Scale: transform scale 1.0 → 1.05

### Shadows

**Card Shadows:**
- Subtle elevation
- Blur radius: 12px
- Opacity: 10%

**Button Shadows:**
- Hover: Glow effect
- Color matches button

## Responsive Design

### Breakpoints

**Desktop (1280px+):**
- Full 3-panel layout
- All features visible

**Tablet (768px - 1279px):**
- 2-panel layout
- Right panel collapses to modal
- Left panel can toggle

**Mobile (< 768px):**
- Single panel view
- Stack navigation
- Full-screen chat when selected

### Mobile Optimizations

- Touch-friendly tap targets (44px min)
- Swipe gestures for navigation
- Bottom sheet for actions
- Floating action button

## Performance

### Optimization Strategies

**Virtual Scrolling:**
- Conversation list (100+ items)
- Message history (1000+ messages)

**Lazy Loading:**
- Load messages on scroll
- Pagination for history

**Debouncing:**
- Search input (300ms)
- Typing indicators (500ms)

**Caching:**
- Customer profiles
- Recent conversations
- Agent availability

## Accessibility

### ARIA Labels

- Screen reader announcements
- Role attributes
- Live regions for messages

### Keyboard Navigation

- Tab through conversations
- Arrow keys in lists
- Enter to select
- Escape to close modals

### Color Contrast

- WCAG AA compliance
- 4.5:1 text ratio
- 3:1 UI component ratio

## Integration Points

### Backend APIs

**WebSocket:**
- Real-time messages
- Typing indicators
- Online status
- Live updates

**REST Endpoints:**
- GET /conversations
- POST /messages
- PUT /tickets
- POST /appointments

### Third-Party Services

**Chat Platforms:**
- WhatsApp Business API
- Instagram Messaging API
- Facebook Messenger API
- Twilio (SMS)

**Calendar:**
- Google Calendar API
- Microsoft Outlook API
- iCal protocol

**AI Services:**
- OpenAI GPT-4 (suggestions)
- Sentiment analysis
- Auto-categorization

## Future Enhancements

### Planned Features

1. **Video/Voice Calls**
   - WebRTC integration
   - Screen sharing
   - Call recording

2. **File Sharing**
   - Drag & drop uploads
   - Image preview
   - PDF viewer

3. **Canned Responses**
   - Template library
   - Quick replies
   - Keyboard shortcuts

4. **Team Collaboration**
   - Internal notes
   - @mentions
   - Task assignment

5. **Analytics Dashboard**
   - Response time metrics
   - Customer satisfaction
   - Agent performance

6. **Automation Rules**
   - Auto-assignment
   - Priority routing
   - SLA triggers

7. **Multi-language**
   - Auto-translation
   - Language detection
   - RTL support

## Security

### Data Protection

- End-to-end encryption for messages
- PII masking in logs
- GDPR compliance
- Data retention policies

### Access Control

- Role-based permissions
- Agent hierarchies
- Audit logging
- Session management

## Testing Checklist

### Manual Tests

- [ ] Send message as bot
- [ ] Send message as human
- [ ] Take over from AI
- [ ] Resume AI assistance
- [ ] Create ticket
- [ ] Assign conversation
- [ ] Schedule appointment
- [ ] Add customer note
- [ ] Search conversations
- [ ] Filter by tab
- [ ] Sort conversations
- [ ] Close conversation
- [ ] Mark as priority
- [ ] Add/remove tags

### Edge Cases

- [ ] No conversations
- [ ] No selected conversation
- [ ] Very long messages
- [ ] Rapid message sending
- [ ] Network disconnection
- [ ] Concurrent agents
- [ ] Deleted customer
- [ ] Invalid ticket data

## Conclusion

This advanced Inbox page provides enterprise-grade conversation management with seamless AI/human collaboration, comprehensive ticketing, and customer insights - all in a modern, glassmorphic dark UI.
