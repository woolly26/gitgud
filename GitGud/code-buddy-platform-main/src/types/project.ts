
export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  type: 'suggestion' | 'question' | 'praise' | 'issue';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  submittedAt: Date;
  status: 'pending' | 'under-review' | 'approved' | 'needs-changes';
  codeUrl?: string;
  demoUrl?: string;
  tags: string[];
  comments: Comment[];
}
