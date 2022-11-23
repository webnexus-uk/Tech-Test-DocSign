export interface IDocument {
  name: string;
  recipientName: string;
  recipientEmail: string;
  dateSent?: number;
  sent?: boolean;
  signed?: boolean;
  signedDate?: number;
  content: string;
  signedBy?: string;
}
