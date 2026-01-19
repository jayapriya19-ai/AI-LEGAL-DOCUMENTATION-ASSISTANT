// Enhanced Indian Legal Document Templates with Real Legal Language
// Based on Indian legal practice and Kanoon.org legal database patterns

interface DocumentTemplate {
  type: string;
  title: string;
  description: string;
  template: (insights: string) => string;
  requiredClauses: string[];
  indianLegalRefs: string[];
}

export const INDIAN_DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    type: 'service_agreement',
    title: 'Professional Service Agreement',
    description: 'Comprehensive service agreement compliant with Indian Contract Act 1872',
    requiredClauses: ['scope', 'payment', 'gst', 'ip', 'termination', 'jurisdiction'],
    indianLegalRefs: ['Indian Contract Act 1872', 'GST Act 2017', 'Copyright Act 1957'],
    template: (insights: string) => generateServiceAgreement(insights)
  },
  {
    type: 'employment_contract',
    title: 'Employment Agreement',
    description: 'Employment contract with Indian labor law compliance',
    requiredClauses: ['designation', 'salary', 'benefits', 'termination', 'confidentiality'],
    indianLegalRefs: ['Industrial Disputes Act 1947', 'EPF Act 1952', 'Payment of Gratuity Act 1972'],
    template: (insights: string) => generateEmploymentContract(insights)
  },
  {
    type: 'lease_agreement',
    title: 'Property Lease Agreement',
    description: 'Residential/commercial lease with stamp duty compliance',
    requiredClauses: ['property', 'rent', 'deposit', 'maintenance', 'termination'],
    indianLegalRefs: ['Transfer of Property Act 1882', 'Registration Act 1908', 'Indian Stamp Act 1899'],
    template: (insights: string) => generateLeaseAgreement(insights)
  },
  {
    type: 'partnership_deed',
    title: 'Partnership Deed',
    description: 'Partnership agreement under Indian Partnership Act 1932',
    requiredClauses: ['partners', 'capital', 'profit_sharing', 'management', 'dissolution'],
    indianLegalRefs: ['Indian Partnership Act 1932', 'Income Tax Act 1961'],
    template: (insights: string) => generatePartnershipDeed(insights)
  },
  {
    type: 'nda',
    title: 'Non-Disclosure Agreement',
    description: 'Confidentiality agreement with IP protection',
    requiredClauses: ['confidential_info', 'obligations', 'exceptions', 'term', 'remedies'],
    indianLegalRefs: ['Indian Contract Act 1872', 'Copyright Act 1957', 'Trade Marks Act 1999'],
    template: (insights: string) => generateNDA(insights)
  },
  {
    type: 'loan_agreement',
    title: 'Loan Agreement',
    description: 'Personal/business loan agreement with security provisions',
    requiredClauses: ['loan_amount', 'interest', 'repayment', 'security', 'default'],
    indianLegalRefs: ['Indian Contract Act 1872', 'Negotiable Instruments Act 1881', 'SARFAESI Act 2002'],
    template: (insights: string) => generateLoanAgreement(insights)
  },
  {
    type: 'sale_deed',
    title: 'Sale Deed',
    description: 'Property sale deed with registration requirements',
    requiredClauses: ['property_description', 'consideration', 'title', 'possession', 'registration'],
    indianLegalRefs: ['Transfer of Property Act 1882', 'Registration Act 1908', 'Indian Stamp Act 1899'],
    template: (insights: string) => generateSaleDeed(insights)
  }
];

function generateServiceAgreement(insights: string): string {
  const currentDate = new Date().toLocaleDateString('en-IN');
  const currentYear = new Date().getFullYear();
  
  return `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on ${currentDate} between:

1. [SERVICE PROVIDER NAME], a company incorporated under the Companies Act, 2013, having its registered office at [ADDRESS] (hereinafter referred to as "Service Provider", which expression shall, unless repugnant to the context, include its successors and permitted assigns); and

2. [CLIENT NAME], a company incorporated under the Companies Act, 2013, having its registered office at [ADDRESS] (hereinafter referred to as "Client", which expression shall, unless repugnant to the context, include its successors and permitted assigns).

WHEREAS, the Service Provider is engaged in the business of providing professional services and has the necessary expertise, resources, and infrastructure to provide the services as defined herein;

WHEREAS, the Client desires to engage the Service Provider for the provision of certain services as more particularly described herein;

NOW THEREFORE, in consideration of the mutual covenants, terms, and conditions contained herein and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:

1. SCOPE OF SERVICES

1.1 The Service Provider agrees to provide the following services ("Services"):
${insights}

1.2 The Services shall be performed in accordance with the specifications, timelines, and quality standards as mutually agreed between the parties.

1.3 Any modification to the scope of Services shall require written consent of both parties through a duly executed amendment to this Agreement.

2. TERM AND COMMENCEMENT

2.1 This Agreement shall commence on [START DATE] and shall continue for a period of [DURATION] unless terminated earlier in accordance with the provisions hereof.

2.2 The Agreement may be renewed for further periods upon mutual written consent of the parties.

3. PAYMENT TERMS AND CONDITIONS

3.1 Total Contract Value: ₹[AMOUNT] (Rupees [AMOUNT IN WORDS] only) inclusive of all taxes.

3.2 Payment Schedule:
- [PERCENTAGE]% advance payment upon execution of this Agreement
- [PERCENTAGE]% upon completion of milestones as defined in Schedule A
- [PERCENTAGE]% upon final delivery and acceptance

3.3 All payments shall be made in Indian Rupees through RTGS/NEFT to the bank account details provided by the Service Provider.

3.4 Late Payment: Any delay in payment beyond 30 days from the due date shall attract interest @ 18% per annum.

4. GST AND TAX COMPLIANCE

4.1 Service Provider GST Registration No.: [GST NUMBER]
4.2 Client GST Registration No.: [GST NUMBER]
4.3 GST @ 18% shall be charged extra on all invoices as applicable under the GST Act, 2017.
4.4 Place of Supply: [STATE], India
4.5 The Client shall deduct TDS as applicable under the Income Tax Act, 1961, and provide TDS certificates.

5. INTELLECTUAL PROPERTY RIGHTS

5.1 All intellectual property rights, including but not limited to copyrights, patents, trademarks, and trade secrets in the deliverables created specifically for the Client under this Agreement shall vest with the Client upon receipt of full payment.

5.2 The Service Provider warrants that the Services and deliverables do not infringe any third-party intellectual property rights.

5.3 Pre-existing intellectual property of the Service Provider shall remain with the Service Provider.

6. CONFIDENTIALITY

6.1 Both parties acknowledge that they may have access to confidential information of the other party.

6.2 Each party agrees to maintain strict confidentiality of such information and not to disclose it to any third party without prior written consent.

6.3 This obligation shall survive the termination of this Agreement for a period of 5 years.

7. WARRANTIES AND REPRESENTATIONS

7.1 The Service Provider warrants that:
a) It has the necessary skills, expertise, and resources to perform the Services;
b) The Services shall be performed in a professional and workmanlike manner;
c) The Services shall comply with all applicable laws and regulations.

7.2 The Client warrants that it has the authority to enter into this Agreement and provide necessary cooperation for the performance of Services.

8. LIMITATION OF LIABILITY

8.1 The Service Provider's total liability under this Agreement shall not exceed the total contract value.

8.2 Neither party shall be liable for any indirect, consequential, or special damages.

9. INDEMNIFICATION

9.1 Each party shall indemnify and hold harmless the other party from any claims, damages, or losses arising out of its breach of this Agreement or negligent acts.

10. FORCE MAJEURE

10.1 Neither party shall be liable for any delay or failure in performance due to circumstances beyond its reasonable control, including but not limited to acts of God, natural calamities, government actions, pandemic, epidemic, war, terrorism, or industrial disputes.

10.2 The affected party shall promptly notify the other party and use reasonable efforts to mitigate the impact.

11. TERMINATION

11.1 Either party may terminate this Agreement by giving 30 days written notice to the other party.

11.2 This Agreement may be terminated immediately in case of material breach by either party, subject to 15 days cure period.

11.3 Upon termination, all unpaid amounts for services rendered shall become immediately due and payable.

12. DISPUTE RESOLUTION

12.1 Any disputes arising out of or in connection with this Agreement shall first be resolved through good faith negotiations.

12.2 If not resolved within 30 days, disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 2015.

12.3 The seat of arbitration shall be [CITY], and the arbitration shall be conducted by a sole arbitrator appointed by mutual consent.

13. GOVERNING LAW AND JURISDICTION

13.1 This Agreement shall be governed by and construed in accordance with the laws of India.

13.2 Subject to the arbitration clause, the courts at [CITY] shall have exclusive jurisdiction over any matters arising under this Agreement.

14. MISCELLANEOUS

14.1 This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements.

14.2 Any amendments must be in writing and signed by both parties.

14.3 If any provision is held invalid, the remainder of the Agreement shall remain in full force and effect.

14.4 This Agreement shall be binding upon the successors and permitted assigns of the parties.

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.

FOR [SERVICE PROVIDER NAME]          FOR [CLIENT NAME]

_________________________           _________________________
Authorized Signatory                 Authorized Signatory
Name:                               Name:
Designation:                        Designation:
Date:                              Date:

WITNESSES:

1. _________________________       2. _________________________
   Name:                              Name:
   Address:                           Address:

---
Generated on: ${new Date().toLocaleString('en-IN')}
Document prepared in accordance with Indian Contract Act, 1872 and applicable Indian laws.

IMPORTANT LEGAL NOTICE: This document template is for informational purposes only. Please consult with a qualified legal practitioner before execution to ensure compliance with applicable laws and specific requirements.`;
}

function generateEmploymentContract(insights: string): string {
  const currentDate = new Date().toLocaleDateString('en-IN');
  
  return `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on ${currentDate} between:

1. [COMPANY NAME], a company incorporated under the Companies Act, 2013, having its registered office at [ADDRESS] (hereinafter referred to as "Company"); and

2. [EMPLOYEE NAME], an individual residing at [ADDRESS] (hereinafter referred to as "Employee").

WHEREAS, the Company desires to employ the Employee and the Employee desires to be employed by the Company on the terms and conditions set forth herein;

NOW THEREFORE, the parties agree as follows:

1. EMPLOYMENT AND POSITION

1.1 Position and Responsibilities:
${insights}

1.2 The Employee shall devote full time and attention to the business of the Company and shall not engage in any other employment or business without prior written consent.

2. TERM OF EMPLOYMENT

2.1 This employment shall commence on [START DATE] and shall continue until terminated in accordance with the provisions hereof.

2.2 Probationary Period: The first [DURATION] months shall be the probationary period during which either party may terminate employment with [NOTICE PERIOD] notice.

3. COMPENSATION AND BENEFITS

3.1 Basic Salary: ₹[AMOUNT] per month
3.2 House Rent Allowance: ₹[AMOUNT] per month
3.3 Other Allowances: ₹[AMOUNT] per month
3.4 Total Monthly Gross Salary: ₹[AMOUNT]

3.5 Annual Benefits:
- Performance Bonus: As per company policy
- Annual Leave: [DAYS] days per year
- Sick Leave: [DAYS] days per year
- Casual Leave: [DAYS] days per year

4. STATUTORY COMPLIANCE

4.1 Provident Fund: The Company shall deduct Employee's contribution to PF @ 12% of basic salary and contribute equal amount as per Employees' Provident Fund Act, 1952.

4.2 Employee State Insurance: ESI contribution shall be deducted as per ESI Act, 1948, if applicable.

4.3 Professional Tax: Professional tax shall be deducted as per state regulations.

4.4 Income Tax: TDS shall be deducted as per Income Tax Act, 1961.

5. GRATUITY

5.1 The Employee shall be entitled to gratuity as per Payment of Gratuity Act, 1972, calculated at 15 days salary for each completed year of service.

6. WORKING HOURS

6.1 Normal working hours: [HOURS] hours per day, [DAYS] days per week.
6.2 Overtime compensation shall be paid as per applicable labor laws.

7. CONFIDENTIALITY AND NON-DISCLOSURE

7.1 The Employee shall maintain strict confidentiality of all proprietary information, trade secrets, and confidential data of the Company.

7.2 This obligation shall survive termination of employment for a period of 2 years.

8. NON-COMPETE AND NON-SOLICITATION

8.1 During employment and for [DURATION] months after termination, the Employee shall not:
a) Engage in competing business
b) Solicit Company's clients or employees
c) Use Company's confidential information for personal benefit

9. TERMINATION

9.1 Notice Period: Either party may terminate employment by giving [NOTICE PERIOD] written notice or salary in lieu thereof.

9.2 Termination for Cause: The Company may terminate employment immediately for misconduct, breach of terms, or criminal activity.

9.3 Upon termination, the Employee shall return all Company property and documents.

10. DISPUTE RESOLUTION

10.1 Any disputes shall be resolved through conciliation under Industrial Disputes Act, 1947.

10.2 If not resolved, disputes shall be referred to labor court having jurisdiction.

11. GOVERNING LAW

11.1 This Agreement shall be governed by Indian labor laws and regulations.

IN WITNESS WHEREOF, the parties have executed this Agreement.

FOR [COMPANY NAME]                   EMPLOYEE

_________________________           _________________________
Authorized Signatory                 [EMPLOYEE NAME]
Name:                               
Designation:                        
Date:                              Date:

---
Generated on: ${new Date().toLocaleString('en-IN')}
Compliant with Indian labor laws including Industrial Disputes Act 1947, EPF Act 1952, and Payment of Gratuity Act 1972.`;
}

function generateLeaseAgreement(insights: string): string {
  const currentDate = new Date().toLocaleDateString('en-IN');
  
  return `LEASE AGREEMENT

This Lease Agreement is executed on ${currentDate} between:

1. [LANDLORD NAME], son/daughter of [FATHER'S NAME], residing at [ADDRESS] (hereinafter called "Landlord/Lessor"); and

2. [TENANT NAME], son/daughter of [FATHER'S NAME], residing at [ADDRESS] (hereinafter called "Tenant/Lessee").

WHEREAS, the Landlord is the absolute owner of the property described herein and desires to lease the same;

WHEREAS, the Tenant desires to take the said property on lease for residential/commercial purposes;

NOW THEREFORE, the parties agree as follows:

1. PROPERTY DESCRIPTION

1.1 Property Details:
${insights}

1.2 The property is more particularly described in Schedule A attached hereto.

2. LEASE TERM

2.1 Lease Period: [DURATION] commencing from [START DATE] to [END DATE].

2.2 The lease may be renewed for further periods upon mutual written consent.

3. RENT AND PAYMENT TERMS

3.1 Monthly Rent: ₹[AMOUNT] (Rupees [AMOUNT IN WORDS] only)

3.2 Security Deposit: ₹[AMOUNT] (Rupees [AMOUNT IN WORDS] only) paid in advance, refundable upon termination subject to deductions for damages.

3.3 Rent shall be paid by [DATE] of each month through bank transfer/cheque.

3.4 Late Payment: Delay beyond 10 days shall attract penalty @ ₹[AMOUNT] per day.

4. PERMITTED USE

4.1 The property shall be used only for [RESIDENTIAL/COMMERCIAL] purposes.

4.2 No illegal activities or nuisance shall be permitted on the premises.

5. MAINTENANCE AND REPAIRS

5.1 Landlord's Responsibility:
- Structural repairs and maintenance
- Major electrical and plumbing issues
- Property tax payments

5.2 Tenant's Responsibility:
- Daily maintenance and cleanliness
- Minor repairs and upkeep
- Utility bills (electricity, water, gas)

6. ALTERATIONS AND MODIFICATIONS

6.1 No structural alterations without Landlord's written consent.

6.2 Any improvements made shall become part of the property.

7. TERMINATION

7.1 Either party may terminate with [NOTICE PERIOD] written notice.

7.2 Immediate termination for breach of terms or non-payment of rent for 2 consecutive months.

7.3 Upon termination, Tenant shall vacate and hand over peaceful possession.

8. SECURITY DEPOSIT

8.1 Security deposit shall be refunded within 30 days of termination.

8.2 Deductions may be made for damages, unpaid rent, or utility bills.

9. REGISTRATION AND STAMP DUTY

9.1 This agreement shall be registered under Registration Act, 1908, if required by law.

9.2 Stamp duty and registration charges shall be borne by [PARTY NAME].

10. FORCE MAJEURE

10.1 Neither party shall be liable for delays due to natural calamities, government actions, or circumstances beyond control.

11. DISPUTE RESOLUTION

11.1 Disputes shall be resolved through mutual discussion.

11.2 If not resolved, disputes shall be referred to courts having jurisdiction at [CITY].

12. GOVERNING LAW

12.1 This agreement shall be governed by Transfer of Property Act, 1882, and applicable rent control laws.

IN WITNESS WHEREOF, the parties have executed this agreement.

LANDLORD                            TENANT

_________________________           _________________________
[LANDLORD NAME]                     [TENANT NAME]

WITNESSES:

1. _________________________       2. _________________________
   Name:                              Name:
   Address:                           Address:

---
Generated on: ${new Date().toLocaleString('en-IN')}
Compliant with Transfer of Property Act 1882, Registration Act 1908, and applicable state rent control laws.

SCHEDULE A - PROPERTY DESCRIPTION
[Detailed property description to be inserted]`;
}

function generatePartnershipDeed(insights: string): string {
  const currentDate = new Date().toLocaleDateString('en-IN');
  
  return `PARTNERSHIP DEED

This Partnership Deed is executed on ${currentDate} between:

${insights}

WHEREAS, the parties desire to carry on business in partnership under the Indian Partnership Act, 1932;

NOW THEREFORE, the parties agree as follows:

1. FIRM NAME AND BUSINESS

1.1 Firm Name: [FIRM NAME]
1.2 Principal Place of Business: [ADDRESS]
1.3 Nature of Business: [BUSINESS DESCRIPTION]

2. CAPITAL CONTRIBUTION

2.1 Total Capital: ₹[AMOUNT]
2.2 Individual Contributions:
- Partner A: ₹[AMOUNT] ([PERCENTAGE]%)
- Partner B: ₹[AMOUNT] ([PERCENTAGE]%)

3. PROFIT AND LOSS SHARING

3.1 Profits and losses shall be shared in the ratio of capital contribution unless otherwise agreed.

4. MANAGEMENT AND AUTHORITY

4.1 All partners shall have equal rights in management unless otherwise specified.
4.2 Major decisions require consent of all partners.

5. ACCOUNTS AND AUDIT

5.1 Proper books of accounts shall be maintained.
5.2 Annual audit by qualified chartered accountant.

6. DISSOLUTION

6.1 Partnership may be dissolved by mutual consent or as per Partnership Act, 1932.

IN WITNESS WHEREOF, the parties have executed this deed.

---
Generated on: ${new Date().toLocaleString('en-IN')}
Compliant with Indian Partnership Act, 1932.`;
}

function generateNDA(insights: string): string {
  const currentDate = new Date().toLocaleDateString('en-IN');
  
  return `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${currentDate} between:

1. [DISCLOSING PARTY NAME] (hereinafter referred to as "Disclosing Party"); and
2. [RECEIVING PARTY NAME] (hereinafter referred to as "Receiving Party").

1. CONFIDENTIAL INFORMATION

1.1 Definition:
${insights}

2. OBLIGATIONS

2.1 The Receiving Party agrees to:
- Maintain strict confidentiality
- Not disclose to third parties
- Use information only for specified purpose

3. TERM

3.1 This agreement shall remain in effect for [DURATION] years.

4. REMEDIES

4.1 Breach may result in irreparable harm warranting injunctive relief.

5. GOVERNING LAW

5.1 This agreement shall be governed by Indian Contract Act, 1872.

IN WITNESS WHEREOF, the parties have executed this agreement.

---
Generated on: ${new Date().toLocaleString('en-IN')}
Compliant with Indian Contract Act 1872 and IP laws.`;
}

function generateLoanAgreement(insights: string): string {
  const currentDate = new Date().toLocaleDateString('en-IN');
  
  return `LOAN AGREEMENT

This Loan Agreement is executed on ${currentDate} between:

1. [LENDER NAME] (hereinafter referred to as "Lender"); and
2. [BORROWER NAME] (hereinafter referred to as "Borrower").

1. LOAN DETAILS

1.1 Loan Amount: ₹[AMOUNT]
1.2 Purpose: ${insights}
1.3 Interest Rate: [RATE]% per annum
1.4 Repayment Period: [DURATION]

2. REPAYMENT TERMS

2.1 Monthly EMI: ₹[AMOUNT]
2.2 Due Date: [DATE] of each month

3. SECURITY

3.1 Security provided: [SECURITY DETAILS]

4. DEFAULT

4.1 Default consequences as per agreement terms.

5. GOVERNING LAW

5.1 Governed by Indian Contract Act, 1872, and Negotiable Instruments Act, 1881.

---
Generated on: ${new Date().toLocaleString('en-IN')}`;
}

function generateSaleDeed(insights: string): string {
  const currentDate = new Date().toLocaleDateString('en-IN');
  
  return `SALE DEED

This Sale Deed is executed on ${currentDate} between:

1. [SELLER NAME] (hereinafter referred to as "Seller/Vendor"); and
2. [BUYER NAME] (hereinafter referred to as "Buyer/Purchaser").

1. PROPERTY DESCRIPTION

1.1 Property Details:
${insights}

2. CONSIDERATION

2.1 Sale Consideration: ₹[AMOUNT]

3. TITLE AND POSSESSION

3.1 The Seller warrants clear and marketable title.
3.2 Possession shall be delivered on execution.

4. REGISTRATION

4.1 This deed shall be registered under Registration Act, 1908.

5. GOVERNING LAW

5.1 Governed by Transfer of Property Act, 1882.

---
Generated on: ${new Date().toLocaleString('en-IN')}
Compliant with Transfer of Property Act 1882 and Registration Act 1908.`;
}

export function getDocumentTemplate(type: string): DocumentTemplate | undefined {
  return INDIAN_DOCUMENT_TEMPLATES.find(template => template.type === type);
}

export function generateIndianDocument(type: string, insights: string): string {
  const template = getDocumentTemplate(type);
  if (!template) {
    throw new Error(`Template not found for document type: ${type}`);
  }
  
  return template.template(insights);
}