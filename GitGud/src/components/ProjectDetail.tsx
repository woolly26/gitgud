
import { useState } from 'react';
import { Project, Comment } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, ExternalLink, User, MessageSquare, ThumbsUp, AlertCircle, HelpCircle, Lightbulb } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

interface ProjectDetailProps {
  project: Project;
  onUpdate: (project: Project) => void;
}

export const ProjectDetail = ({ project, onUpdate }: ProjectDetailProps) => {
  const [newComment, setNewComment] = useState('');
  const [commentType, setCommentType] = useState<Comment['type']>('suggestion');
  const [newStatus, setNewStatus] = useState<Project['status']>(project.status);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Tech Guru', // In a real app, this would be the current user
      content: newComment.trim(),
      createdAt: new Date(),
      type: commentType
    };

    const updatedProject = {
      ...project,
      comments: [...project.comments, comment]
    };

    onUpdate(updatedProject);
    setNewComment('');
  };

  const handleStatusChange = () => {
    if (newStatus !== project.status) {
      const updatedProject = {
        ...project,
        status: newStatus
      };
      onUpdate(updatedProject);
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'under-review':
        return 'bg-blue-100 text-blue-800';
      case 'needs-changes':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCommentIcon = (type: Comment['type']) => {
    switch (type) {
      case 'suggestion':
        return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      case 'question':
        return <HelpCircle className="h-4 w-4 text-blue-600" />;
      case 'praise':
        return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case 'issue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Project Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {project.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Submitted {format(project.submittedAt, 'MMM d, yyyy')}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {project.comments.length} comments
                </div>
              </div>
            </div>
            <Badge className={getStatusColor(project.status)}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-foreground leading-relaxed">{project.description}</p>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            {project.codeUrl && (
              <Button variant="outline" asChild>
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button variant="outline" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Select value={newStatus} onValueChange={(value: Project['status']) => setNewStatus(value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="needs-changes">Needs Changes</SelectItem>
              </SelectContent>
            </Select>
            {newStatus !== project.status && (
              <Button onClick={handleStatusChange}>Update Status</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Feedback & Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Comment Form */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <Select value={commentType} onValueChange={(value: Comment['type']) => setCommentType(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="praise">Praise</SelectItem>
                  <SelectItem value="issue">Issue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your feedback, suggestions, or questions..."
              className="min-h-[100px]"
            />
            <Button onClick={handleAddComment} disabled={!newComment.trim()}>
              Add Comment
            </Button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {project.comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No comments yet. Be the first to provide feedback!
              </p>
            ) : (
              project.comments.map((comment) => (
                <div key={comment.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCommentIcon(comment.type)}
                      <span className="font-medium">{comment.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {comment.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
