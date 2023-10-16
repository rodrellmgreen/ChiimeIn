export interface Chiime{
  id: string;
  userId: string;
  userName: string;
  title: string;
  preview: string;
  content: string;
  createdDate: Date;
  editedDate: Date;
  commentList: Comment[]
}
