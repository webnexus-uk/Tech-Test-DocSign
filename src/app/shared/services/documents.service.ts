import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDocument } from '../interfaces/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  data: IDocument[] = [
    {
      name: 'Web Nexus NDA',
      recipientName: 'Tony Hensler',
      recipientEmail: 'info@webnexus.co.uk',
      dateSent: 1669214531000,
      signedBy: 'Tony Hensler',
      signed: true,
      sent: true,
      content: `
      <h2><strong>Basic Nondisclosure Agreement</strong></h2>
      <p>This Nondisclosure Agreement (the "Agreement") is entered into by and between _______________ with its principal offices at _______________ ("Disclosing Party") and _______________, located at _______________ ("Receiving Party") for the purpose of preventing the unauthorized disclosure of Confidential Information as defined below. The parties agree to enter into a confidential relationship with respect to the disclosure of certain proprietary and confidential information ("Confidential Information").</p>
      <p>1. <strong>Definition of Confidential Information.</strong> For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged. If Confidential Information is in written form, the Disclosing Party shall label or stamp the materials with the word "Confidential" or some similar warning. If Confidential Information is transmitted orally, the Disclosing Party shall promptly provide a writing indicating that such oral communication constituted Confidential Information.</p>
      <p>2. <strong>Exclusions from Confidential Information.</strong> Receiving Party's obligations under this Agreement do not extend to information that is: (a) publicly known at the time of disclosure or subsequently becomes publicly known through no fault of the Receiving Party; (b) discovered or created by the Receiving Party before disclosure by Disclosing Party; (c) learned by the Receiving Party through legitimate means other than from the Disclosing Party or Disclosing Party's representatives; or (d) is disclosed by Receiving Party with Disclosing Party's prior written approval.</p>
      <p>3. <strong>Obligations of Receiving Party.</strong> Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party. Receiving Party shall carefully restrict access to Confidential Information to employees, contractors, and third parties as is reasonably required and shall require those persons to sign nondisclosure restrictions at least as protective as those in this Agreement. Receiving Party shall not, without prior written approval of Disclosing Party, use for Receiving Party's own benefit, publish, copy, or otherwise disclose to others, or permit the use by others for their benefit or to the detriment of Disclosing Party, any Confidential Information. Receiving Party shall return to Disclosing Party any and all records, notes, and other written, printed, or tangible materials in its possession pertaining to Confidential Information immediately if Disclosing Party requests it in writing.</p>
      <p>4. <strong>Time Periods.</strong> The nondisclosure provisions of this Agreement shall survive the termination of this Agreement and Receiving Party's duty to hold Confidential Information in confidence shall remain in effect until the Confidential Information no longer qualifies as a trade secret or until Disclosing Party sends Receiving Party written notice releasing Receiving Party from this Agreement, whichever occurs first.</p>
      <p>5. <strong>Relationships.</strong> Nothing contained in this Agreement shall be deemed to constitute either party a partner, joint venturer or employee of the other party for any purpose.</p>
      <p>6. <strong>Severability.</strong> If a court finds any provision of this Agreement invalid or unenforceable, the remainder of this Agreement shall be interpreted so as best to effect the intent of the parties.</p>
      <p>7. <strong>Integration.</strong> This Agreement expresses the complete understanding of the parties with respect to the subject matter and supersedes all prior proposals, agreements, representations, and understandings. This Agreement may not be amended except in a writing signed by both parties.</p>
      <p>8. <strong>Waiver.</strong> The failure to exercise any right provided in this Agreement shall not be a waiver of prior or subsequent rights.</p>
      <p>This Agreement and each party's obligations shall be binding on the representatives, assigns, and successors of such party. Each party has signed this Agreement through its authorized representative.</p>
      <p></p>
      <table border="0" cellpadding="0" cellspacing="0" style="width: 590px;">
      <tbody>
      <tr>
      <td valign="top" width="295">
      <p>Disclosing Party</p>
      <p>By: ____________________</p>
      <p>Printed Name: ___________</p>
      <p>Title: __________________</p>
      <p>Dated: _________________</p>
      </td>
      <td valign="top" width="295">
      <p>Receiving Party</p>
      <p>By: ___________________</p>
      <p>Printed Name: __________</p>
      <p>Title: __________________</p>
      <p>Dated: _________________</p>
      </td>
      </tr>
      </tbody>
      </table>`,
    },
  ];

  constructor() {}

  getDocuments(): IDocument[] {
    return this.data;
  }

  getDocument(id: number): IDocument {
    return this.data[id];
  }

  addDocument(document: IDocument): number {
    document = {
      ...document,
      dateSent: Date.now(),
      sent: false,
      signed: false,
    };
    this.data.push(document);
    return this.data.length;
  }

  updateDocument(id: number, document: IDocument): void {
    this.data[id] = document;
  }

  deleteDocument(index: number): IDocument[] {
    this.data.splice(index, 1);
    return this.data;
  }

  getSignedCount(): number {
    return this.data.filter((document) => document.signed).length;
  }

  getUnsignedCount(): number {
    return this.data.filter((document) => !document.signed).length;
  }

  getSentCount(): number {
    return this.data.filter((document) => document.sent).length;
  }

  getUnsentCount(): number {
    return this.data.filter((document) => !document.sent).length;
  }

  signDocument(id: number, signedBy: string): void {
    this.data[id].signed = true;
    this.data[id].signedDate = Date.now();
    this.data[id].signedBy = signedBy;
  }
}
