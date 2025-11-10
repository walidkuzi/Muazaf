import { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, FileText, Code, Database, Globe, Trash2, ExternalLink, RefreshCw, Loader2, Plus, ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';
import IntegrationModal from '../IntegrationModal';
import { toast } from 'sonner';

interface UrlItem {
  id: string;
  url: string;
  pages: number;
  status: 'synced' | 'processing' | 'error';
  lastSync: string;
}

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploaded: string;
  status: 'uploaded' | 'processing';
}

interface TextItem {
  id: string;
  content: string;
  created: string;
  expanded: boolean;
}

interface SitemapItem {
  id: string;
  url: string;
  pages: number;
  status: 'synced' | 'failed';
  lastSync: string;
}

export default function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState('urls');
  const [urlInput, setUrlInput] = useState('');
  const [sitemapInput, setSitemapInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isAddingUrl, setIsAddingUrl] = useState(false);
  const [isAddingSitemap, setIsAddingSitemap] = useState(false);
  const [isAddingText, setIsAddingText] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [isNewIntegration, setIsNewIntegration] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [linkedUrls, setLinkedUrls] = useState<UrlItem[]>([
    { id: '1', url: 'https://docs.example.com/api', pages: 45, status: 'synced', lastSync: '2024-11-01' },
    { id: '2', url: 'https://blog.example.com', pages: 120, status: 'synced', lastSync: '2024-11-01' },
  ]);

  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([
    { id: '1', name: 'product-documentation.pdf', size: '2.4 MB', type: 'PDF', uploaded: '2024-10-28', status: 'uploaded' },
  ]);

  const [textEntries, setTextEntries] = useState<TextItem[]>([
    { id: '1', content: 'This is example knowledge base content that can be expanded to view more details about what was added to the system.', created: '2024-10-28', expanded: false },
  ]);

  const [sitemaps, setSitemaps] = useState<SitemapItem[]>([]);

  const integrations = [
    { name: 'Notion', icon: '📝', connected: true },
    { name: 'Google Drive', icon: '📁', connected: true },
    { name: 'Confluence', icon: '📚', connected: false },
    { name: 'Slack', icon: '💬', connected: false },
    { name: 'GitHub', icon: '🐙', connected: true },
    { name: 'Zendesk', icon: '🎫', connected: false },
    { name: 'Airtable', icon: '📊', connected: false },
    { name: 'OpenAI', icon: '🤖', connected: true },
  ];

  const handleAddUrl = async () => {
    if (!urlInput.trim()) return;
    
    setIsAddingUrl(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newUrl: UrlItem = {
      id: Date.now().toString(),
      url: urlInput,
      pages: Math.floor(Math.random() * 100) + 10,
      status: 'processing',
      lastSync: new Date().toISOString().split('T')[0],
    };
    
    setLinkedUrls([newUrl, ...linkedUrls]);
    setUrlInput('');
    setIsAddingUrl(false);
    
    toast.success('URL added successfully', {
      description: 'Scanning and indexing content...',
      icon: <CheckCircle2 className="w-5 h-5 text-[#aeb9e1]" />,
    });

    // Simulate processing completion
    setTimeout(() => {
      setLinkedUrls(prev => prev.map(url => 
        url.id === newUrl.id ? { ...url, status: 'synced' } : url
      ));
    }, 3000);
  };

  const handleAddSitemap = async () => {
    if (!sitemapInput.trim()) return;
    
    setIsAddingSitemap(true);
    
    // Simulate API call with deliberate failure
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsAddingSitemap(false);
    setSitemapInput('');
    
    toast.error('Failed to add sitemap', {
      description: 'Please check the link or try again.',
      icon: <XCircle className="w-5 h-5 text-[#F46D6B]" />,
    });
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    await new Promise(resolve => setTimeout(resolve, 2100));

    const newFile: FileItem = {
      id: Date.now().toString(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      uploaded: new Date().toISOString().split('T')[0],
      status: 'processing',
    };

    setUploadedFiles([newFile, ...uploadedFiles]);
    setUploadProgress(0);

    toast.success('File uploaded successfully', {
      description: 'Processing and indexing content...',
      icon: <CheckCircle2 className="w-5 h-5 text-[#aeb9e1]" />,
    });

    setTimeout(() => {
      setUploadedFiles(prev => prev.map(f => 
        f.id === newFile.id ? { ...f, status: 'uploaded' } : f
      ));
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleAddText = async () => {
    if (!textInput.trim()) return;
    
    setIsAddingText(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newText: TextItem = {
      id: Date.now().toString(),
      content: textInput,
      created: new Date().toISOString().split('T')[0],
      expanded: false,
    };
    
    setTextEntries([newText, ...textEntries]);
    setTextInput('');
    setIsAddingText(false);
    
    toast.success('Added to Knowledge Base', {
      description: 'Text content has been indexed',
      icon: <CheckCircle2 className="w-5 h-5 text-[#aeb9e1]" />,
    });
  };

  const handleDeleteUrl = (id: string) => {
    setLinkedUrls(prev => prev.filter(url => url.id !== id));
    toast.success('URL removed', {
      description: 'The URL has been removed from your knowledge base',
    });
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    toast.success('File removed', {
      description: 'The file has been removed from your knowledge base',
    });
  };

  const handleDeleteText = (id: string) => {
    setTextEntries(prev => prev.filter(text => text.id !== id));
    toast.success('Text removed', {
      description: 'The text entry has been removed',
    });
  };

  const handleResync = async (id: string) => {
    setLinkedUrls(prev => prev.map(url => 
      url.id === id ? { ...url, status: 'processing' } : url
    ));
    
    toast.success('Re-syncing URL', {
      description: 'Fetching latest content...',
    });

    setTimeout(() => {
      setLinkedUrls(prev => prev.map(url => 
        url.id === id ? { ...url, status: 'synced', lastSync: new Date().toISOString().split('T')[0] } : url
      ));
    }, 2000);
  };

  const handleConnectIntegration = (integration: any) => {
    setSelectedIntegration(integration);
    setIsNewIntegration(false);
    setShowIntegrationModal(true);
  };

  const handleAddCustomIntegration = () => {
    setSelectedIntegration(null);
    setIsNewIntegration(true);
    setShowIntegrationModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white">Knowledge Base</h2>
        <p className="text-[#aeb9e1] mt-2">Manage your AI agent's knowledge sources</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#191919] border-white/10 border p-1 rounded-xl">
          <TabsTrigger value="urls" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
            <Globe className="w-4 h-4 mr-2" />
            URLs
          </TabsTrigger>
          <TabsTrigger value="sitemaps" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
            <LinkIcon className="w-4 h-4 mr-2" />
            Sitemaps
          </TabsTrigger>
          <TabsTrigger value="files" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
            <FileText className="w-4 h-4 mr-2" />
            Upload Files
          </TabsTrigger>
          <TabsTrigger value="text" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
            <Code className="w-4 h-4 mr-2" />
            Plain Text
          </TabsTrigger>
          <TabsTrigger value="integrations" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
            <Database className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="urls" className="space-y-6 mt-6">
          <Card className="bg-[#191919] border-white/10 rounded-xl">
            <CardContent className="p-6">
              <h3 className="mb-4 text-white">Add URL</h3>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input 
                    placeholder="https://example.com/docs" 
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddUrl()}
                    disabled={isAddingUrl}
                    className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                  />
                  {isAddingUrl && (
                    <div className="absolute inset-0 bg-[#732CFF]/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Loader2 className="w-5 h-5 text-[#732CFF] animate-spin" />
                    </div>
                  )}
                </div>
                <Button 
                  onClick={handleAddUrl}
                  disabled={isAddingUrl || !urlInput.trim()}
                  className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white disabled:opacity-50 min-w-[120px]"
                >
                  {isAddingUrl ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Add URL
                    </>
                  )}
                </Button>
              </div>
              <p className="text-[#aeb9e1] mt-2">The content from this URL will be crawled and indexed.</p>
            </CardContent>
          </Card>

          <Card className="bg-[#191919] border-white/10 rounded-xl">
            <CardContent className="p-6">
              <h3 className="mb-4 text-white">Linked URLs</h3>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-[#aeb9e1]">URL</TableHead>
                    <TableHead className="text-[#aeb9e1]">Pages</TableHead>
                    <TableHead className="text-[#aeb9e1]">Status</TableHead>
                    <TableHead className="text-[#aeb9e1]">Last Sync</TableHead>
                    <TableHead className="text-right text-[#aeb9e1]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linkedUrls.map((url) => (
                    <TableRow 
                      key={url.id} 
                      className="border-white/10 animate-in fade-in slide-in-from-top-5 duration-500"
                    >
                      <TableCell className="flex items-center gap-2 text-white">
                        <div className="w-7 h-7 rounded bg-[#732CFF]/20 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-[#732CFF]" />
                        </div>
                        {url.url}
                      </TableCell>
                      <TableCell className="text-white">{url.pages}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                          url.status === 'synced' 
                            ? 'bg-[#aeb9e1]/20 text-[#aeb9e1]' 
                            : url.status === 'processing'
                            ? 'bg-[#606283]/20 text-[#606283]'
                            : 'bg-[#F46D6B]/20 text-[#F46D6B]'
                        }`}>
                          {url.status === 'processing' && <Loader2 className="w-3 h-3 animate-spin" />}
                          {url.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-white">{url.lastSync}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleResync(url.id)}
                            disabled={url.status === 'processing'}
                            className="rounded-lg hover:bg-white/10 text-[#aeb9e1]"
                          >
                            <RefreshCw className={`w-4 h-4 ${url.status === 'processing' ? 'animate-spin' : ''}`} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="rounded-lg hover:bg-white/10 text-[#aeb9e1]"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteUrl(url.id)}
                            className="rounded-lg text-[#F46D6B] hover:text-[#F46D6B]/80 hover:bg-white/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sitemaps" className="space-y-6 mt-6">
          <Card className="bg-[#191919] border-white/10 rounded-xl">
            <CardContent className="p-6">
              <h3 className="mb-4 text-white">Add Sitemap</h3>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input 
                    placeholder="https://example.com/sitemap.xml" 
                    value={sitemapInput}
                    onChange={(e) => setSitemapInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSitemap()}
                    disabled={isAddingSitemap}
                    className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                  />
                  {isAddingSitemap && (
                    <div className="absolute inset-0 bg-[#732CFF]/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Loader2 className="w-5 h-5 text-[#732CFF] animate-spin" />
                    </div>
                  )}
                </div>
                <Button 
                  onClick={handleAddSitemap}
                  disabled={isAddingSitemap || !sitemapInput.trim()}
                  className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white disabled:opacity-50 min-w-[160px]"
                >
                  {isAddingSitemap ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Import Sitemap
                    </>
                  )}
                </Button>
              </div>
              {isAddingSitemap && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#aeb9e1] text-sm">Scanning sitemap...</span>
                    <span className="text-white text-sm">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {sitemaps.length > 0 && (
            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <h3 className="mb-4 text-white">Sitemaps</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-[#aeb9e1]">Sitemap URL</TableHead>
                      <TableHead className="text-[#aeb9e1]">Pages</TableHead>
                      <TableHead className="text-[#aeb9e1]">Status</TableHead>
                      <TableHead className="text-right text-[#aeb9e1]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sitemaps.map((sitemap) => (
                      <TableRow key={sitemap.id} className="border-white/10">
                        <TableCell className="text-white">{sitemap.url}</TableCell>
                        <TableCell className="text-white">{sitemap.pages}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            sitemap.status === 'synced' 
                              ? 'bg-[#aeb9e1]/20 text-[#aeb9e1]' 
                              : 'bg-[#F46D6B]/20 text-[#F46D6B]'
                          }`}>
                            {sitemap.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="rounded-lg text-[#F46D6B] hover:text-[#F46D6B]/80 hover:bg-white/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="files" className="space-y-6 mt-6">
          <Card className="bg-[#191919] border-white/10 rounded-xl">
            <CardContent className="p-6">
              <div 
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                  isDragging 
                    ? 'border-[#732CFF] bg-[#732CFF]/10' 
                    : 'border-white/10 hover:border-[#732CFF]/50 hover:bg-white/5'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-[#732CFF]" />
                <h3 className="mb-2 text-white">Upload Files</h3>
                <p className="text-[#aeb9e1] mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-[#aeb9e1]">
                  Supports: PDF, DOC, DOCX, TXT, CSV, JSON (Max 10MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  accept=".pdf,.doc,.docx,.txt,.csv,.json"
                />
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-bottom-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Uploading file...</span>
                    <span className="text-[#aeb9e1]">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#191919] border-white/10 rounded-xl">
            <CardContent className="p-6">
              <h3 className="mb-4 text-white">Uploaded Files</h3>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-[#aeb9e1]">File Name</TableHead>
                    <TableHead className="text-[#aeb9e1]">Type</TableHead>
                    <TableHead className="text-[#aeb9e1]">Size</TableHead>
                    <TableHead className="text-[#aeb9e1]">Uploaded</TableHead>
                    <TableHead className="text-[#aeb9e1]">Status</TableHead>
                    <TableHead className="text-right text-[#aeb9e1]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedFiles.map((file) => (
                    <TableRow 
                      key={file.id} 
                      className="border-white/10 animate-in fade-in slide-in-from-top-5 duration-500"
                    >
                      <TableCell className="flex items-center gap-2 text-white">
                        <div className="w-7 h-7 rounded bg-[#732CFF]/20 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-[#732CFF]" />
                        </div>
                        {file.name}
                      </TableCell>
                      <TableCell className="text-white">{file.type}</TableCell>
                      <TableCell className="text-white">{file.size}</TableCell>
                      <TableCell className="text-white">{file.uploaded}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                          file.status === 'uploaded' 
                            ? 'bg-[#aeb9e1]/20 text-[#aeb9e1]' 
                            : 'bg-[#606283]/20 text-[#606283]'
                        }`}>
                          {file.status === 'processing' && <Loader2 className="w-3 h-3 animate-spin" />}
                          {file.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteFile(file.id)}
                          className="rounded-lg text-[#F46D6B] hover:text-[#F46D6B]/80 hover:bg-white/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="space-y-6 mt-6">
          <Card className="bg-[#191919] border-white/10 rounded-xl">
            <CardContent className="p-6">
              <h3 className="mb-4 text-white">Add Plain Text</h3>
              <Textarea 
                placeholder="Paste your text content here..." 
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={12}
                disabled={isAddingText}
                className="bg-white/5 border-white/10 rounded-xl mb-4 text-white placeholder:text-[#aeb9e1]/50"
              />
              <Button 
                onClick={handleAddText}
                disabled={isAddingText || !textInput.trim()}
                className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white disabled:opacity-50 min-w-[200px]"
              >
                {isAddingText ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add to Knowledge Base'
                )}
              </Button>
            </CardContent>
          </Card>

          {textEntries.length > 0 && (
            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <h3 className="mb-4 text-white">Text Entries</h3>
                <div className="space-y-3">
                  {textEntries.map((entry) => (
                    <div 
                      key={entry.id} 
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all animate-in fade-in slide-in-from-top-5 duration-500"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-[#aeb9e1] text-sm">Added on {entry.created}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteText(entry.id)}
                          className="rounded-lg text-[#F46D6B] hover:text-[#F46D6B]/80 hover:bg-white/10 -mt-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className={`text-white ${entry.expanded ? '' : 'line-clamp-2'}`}>
                        {entry.content}
                      </p>
                      <button
                        onClick={() => setTextEntries(prev => prev.map(t => 
                          t.id === entry.id ? { ...t, expanded: !t.expanded } : t
                        ))}
                        className="mt-2 text-[#732CFF] hover:text-[#732CFF]/80 text-sm flex items-center gap-1"
                      >
                        {entry.expanded ? (
                          <>Show less <ChevronUp className="w-3 h-3" /></>
                        ) : (
                          <>Show more <ChevronDown className="w-3 h-3" /></>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <Card 
                key={integration.name} 
                className="bg-[#191919] border-white/10 rounded-xl hover:border-[#732CFF]/50 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#732CFF]/20 flex items-center justify-center text-2xl">
                      {integration.icon}
                    </div>
                    {integration.connected && (
                      <span className="px-2 py-1 rounded-full text-xs bg-[#aeb9e1]/20 text-[#aeb9e1] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Connected
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-white">{integration.name}</h3>
                  <p className="text-[#aeb9e1] mb-4">
                    {integration.connected ? 'Syncing content' : 'Not connected'}
                  </p>
                  <Button 
                    onClick={() => handleConnectIntegration(integration)}
                    variant={integration.connected ? 'outline' : 'default'}
                    className={`w-full rounded-xl ${
                      integration.connected 
                        ? 'border-white/10 text-white hover:bg-white/10' 
                        : 'bg-[#732CFF] hover:bg-[#732CFF]/90 text-white'
                    }`}
                  >
                    {integration.connected ? 'Configure' : 'Connect'}
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Add Custom Integration Card */}
            <Card className="bg-gradient-to-br from-[#732CFF]/10 to-[#606283]/10 border-[#732CFF]/30 rounded-xl hover:border-[#732CFF]/50 transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent 
                className="p-6 flex flex-col items-center justify-center h-full"
                onClick={handleAddCustomIntegration}
              >
                <div className="w-12 h-12 rounded-lg bg-[#732CFF]/20 flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-[#732CFF]" />
                </div>
                <h3 className="mb-2 text-white">Add Custom Integration</h3>
                <p className="text-[#aeb9e1] text-center text-sm">
                  Connect your own API or service
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Integration Modal */}
      <IntegrationModal
        isOpen={showIntegrationModal}
        onClose={() => setShowIntegrationModal(false)}
        integration={selectedIntegration}
        isNewIntegration={isNewIntegration}
      />
    </div>
  );
}
