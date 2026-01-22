// Indian Kanoon Document Analyzer with AI-Powered User-Friendly Analysis
// This module provides easy-to-understand analysis for non-legal professionals

interface DocumentContext {
  parties: string[];
  mainPurpose: string;
  keyAmounts: string[];
  importantDates: string[];
  mainObligations: string[];
  risks: string[];
  benefits: string[];
}

interface UserFriendlyAnalysis {
  whatIsThis: string;
  whoIsInvolved: string;
  whatHappens: string;
  moneyMatters: string;
  timeframes: string;
  yourRights: string;
  yourObligations: string;
  potentialIssues: string;
  nextSteps: string;
}

// Sample Indian Kanoon documents for training and reference
const INDIAN_KANOON_SAMPLES = {
  service_agreement: {
    sample: `This agreement is made between TechCorp India Pvt Ltd (Service Provider) and Global Solutions Ltd (Client) for software development services. The service provider will develop a mobile application for ₹5,00,000 to be completed in 6 months. Payment will be made in three installments: ₹2,00,000 advance, ₹2,00,000 at 50% completion, and ₹1,00,000 on final delivery.`,
    analysis: {
      whatIsThis: "A business contract where one company agrees to provide software development services to another company",
      whoIsInvolved: "TechCorp India (the company doing the work) and Global Solutions (the company paying for the work)",
      whatHappens: "TechCorp will create a mobile app according to specific requirements",
      moneyMatters: "Total cost is ₹5,00,000 paid in three parts - ₹2,00,000 upfront, ₹2,00,000 halfway through, and ₹1,00,000 when finished",
      timeframes: "The entire project must be completed within 6 months",
      yourRights: "You have the right to receive the completed mobile app as specified and can demand refund if work is not delivered",
      yourObligations: "You must pay the agreed amounts on time and provide necessary cooperation",
      potentialIssues: "Delays in payment could stop the work, unclear requirements might cause disputes",
      nextSteps: "Both parties should sign the agreement and the client should make the first payment"
    }
  },
  employment_contract: {
    sample: `Employment Agreement between Infosys Limited (Company) and Rahul Sharma (Employee) for the position of Software Engineer. Monthly salary: ₹75,000 including basic pay ₹45,000, HRA ₹18,000, and other allowances ₹12,000. Probation period: 6 months. Notice period: 2 months.`,
    analysis: {
      whatIsThis: "A job contract that defines the terms of employment between a company and an employee",
      whoIsInvolved: "Infosys Limited (the employer) and Rahul Sharma (the employee)",
      whatHappens: "Rahul will work as a Software Engineer and receive monthly salary and benefits",
      moneyMatters: "Monthly salary of ₹75,000 broken down into basic pay (₹45,000), house rent allowance (₹18,000), and other benefits (₹12,000)",
      timeframes: "6 months probation period, then permanent employment. 2 months notice required to quit",
      yourRights: "Regular salary, leave entitlements, PF benefits, job security after probation",
      yourObligations: "Perform job duties diligently, maintain confidentiality, give proper notice before leaving",
      potentialIssues: "Can be terminated during probation, salary deductions for poor performance",
      nextSteps: "Complete joining formalities, submit required documents, start probation period"
    }
  }
};

export class IndianKanoonSampleAnalyzer {
  private content: string;
  private documentType: string;
  private context: DocumentContext;

  constructor(content: string, documentType: string) {
    this.content = content;
    this.documentType = documentType;
    this.context = this.extractDocumentContext();
  }

  private extractDocumentContext(): DocumentContext {
    return {
      parties: this.extractPartiesSimple(),
      mainPurpose: this.extractMainPurpose(),
      keyAmounts: this.extractKeyAmounts(),
      importantDates: this.extractImportantDates(),
      mainObligations: this.extractMainObligations(),
      risks: this.extractPotentialRisks(),
      benefits: this.extractBenefits()
    };
  }

  private extractPartiesSimple(): string[] {
    const parties: string[] = [];
    const content = this.content.toLowerCase();

    // Enhanced party extraction with simple language
    const partyPatterns = [
      /between\s+([^,\n]+?)\s+(?:and|&)\s+([^,\n]+)/i,
      /(?:company|employer|service provider)[:\s]*([^,\n]+)/i,
      /(?:client|customer|employee)[:\s]*([^,\n]+)/i,
      /(?:landlord|lessor)[:\s]*([^,\n]+)/i,
      /(?:tenant|lessee)[:\s]*([^,\n]+)/i
    ];

    for (const pattern of partyPatterns) {
      const match = this.content.match(pattern);
      if (match) {
        if (match[1]) parties.push(this.cleanPartyName(match[1]));
        if (match[2]) parties.push(this.cleanPartyName(match[2]));
        if (parties.length >= 2) break;
      }
    }

    return parties.length > 0 ? parties : ['Party 1', 'Party 2'];
  }

  private cleanPartyName(name: string): string {
    return name.trim()
      .replace(/\([^)]*\)/g, '') // Remove parentheses
      .replace(/,.*$/, '') // Remove everything after comma
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();
  }

  private extractMainPurpose(): string {
    const content = this.content.toLowerCase();
    
    // Document-specific purpose extraction
    const purposePatterns = {
      service_agreement: [
        /(?:for|to provide|providing)\s+([^.\n]{20,100})/i,
        /services?\s*:?\s*([^.\n]{20,100})/i,
        /scope\s+of\s+work\s*:?\s*([^.\n]{20,100})/i
      ],
      employment_contract: [
        /position\s*:?\s*([^.\n]{10,50})/i,
        /designation\s*:?\s*([^.\n]{10,50})/i,
        /role\s*:?\s*([^.\n]{10,50})/i
      ],
      lease_agreement: [
        /(?:lease|rent)\s+(?:of|for)\s+([^.\n]{20,100})/i,
        /property\s*:?\s*([^.\n]{20,100})/i
      ]
    };

    const patterns = purposePatterns[this.documentType as keyof typeof purposePatterns] || purposePatterns.service_agreement;
    
    for (const pattern of patterns) {
      const match = this.content.match(pattern);
      if (match && match[1]) {
        return this.cleanPurpose(match[1]);
      }
    }

    // Fallback purposes
    const fallbacks = {
      service_agreement: 'providing professional services',
      employment_contract: 'employment relationship',
      lease_agreement: 'renting property',
      partnership_deed: 'business partnership',
      loan_agreement: 'lending money',
      nda: 'protecting confidential information'
    };

    return fallbacks[this.documentType as keyof typeof fallbacks] || 'legal agreement';
  }

  private cleanPurpose(purpose: string): string {
    return purpose.trim()
      .replace(/^(the\s+)?/i, '')
      .replace(/\s+/g, ' ')
      .toLowerCase();
  }

  private extractKeyAmounts(): string[] {
    const amounts: string[] = [];
    
    // Extract Indian currency amounts
    const currencyPatterns = [
      /₹\s*[\d,]+(?:\.\d{2})?/g,
      /rs\.?\s*[\d,]+(?:\.\d{2})?/gi,
      /rupees\s+[\d,]+/gi
    ];

    currencyPatterns.forEach(pattern => {
      const matches = this.content.match(pattern);
      if (matches) {
        amounts.push(...matches.slice(0, 3)); // Limit to first 3 amounts
      }
    });

    return [...new Set(amounts)]; // Remove duplicates
  }

  private extractImportantDates(): string[] {
    const dates: string[] = [];
    
    // Extract various date formats
    const datePatterns = [
      /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/g,
      /\d{1,2}\s+(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{4}/gi,
      /(?:duration|period|term)\s*:?\s*([^.\n]{5,30})/gi,
      /(?:from|starting|commencing)\s+([^.\n]{5,30})/gi
    ];

    datePatterns.forEach(pattern => {
      const matches = this.content.match(pattern);
      if (matches) {
        dates.push(...matches.slice(0, 2));
      }
    });

    return dates;
  }

  private extractMainObligations(): string[] {
    const obligations: string[] = [];
    const content = this.content.toLowerCase();

    // Common obligation patterns
    const obligationPatterns = [
      /(?:shall|will|must|agree to)\s+([^.\n]{10,80})/gi,
      /(?:responsible for|obligation to)\s+([^.\n]{10,80})/gi,
      /(?:duty to|required to)\s+([^.\n]{10,80})/gi
    ];

    obligationPatterns.forEach(pattern => {
      const matches = this.content.match(pattern);
      if (matches) {
        matches.slice(0, 3).forEach(match => {
          const cleaned = match.replace(/^(shall|will|must|agree to|responsible for|obligation to|duty to|required to)\s+/i, '');
          if (cleaned.length > 10) {
            obligations.push(cleaned.trim());
          }
        });
      }
    });

    return obligations;
  }

  private extractPotentialRisks(): string[] {
    const risks: string[] = [];
    const content = this.content.toLowerCase();

    // Document-specific risk patterns
    if (!content.includes('termination')) {
      risks.push('No clear exit strategy mentioned');
    }
    if (!content.includes('dispute') && !content.includes('arbitration')) {
      risks.push('No dispute resolution process defined');
    }
    if (this.documentType === 'service_agreement' && !content.includes('intellectual property')) {
      risks.push('Ownership of work/IP not clearly defined');
    }
    if (this.documentType === 'employment_contract' && !content.includes('notice period')) {
      risks.push('Job termination process unclear');
    }
    if (content.includes('penalty') || content.includes('fine')) {
      risks.push('Financial penalties may apply for violations');
    }

    return risks;
  }

  private extractBenefits(): string[] {
    const benefits: string[] = [];
    const content = this.content.toLowerCase();

    // Document-specific benefits
    if (this.documentType === 'employment_contract') {
      if (content.includes('provident fund') || content.includes('pf')) {
        benefits.push('Retirement savings through Provident Fund');
      }
      if (content.includes('medical') || content.includes('health insurance')) {
        benefits.push('Health insurance coverage');
      }
      if (content.includes('leave') || content.includes('vacation')) {
        benefits.push('Paid leave entitlements');
      }
    }

    if (content.includes('warranty') || content.includes('guarantee')) {
      benefits.push('Quality assurance provided');
    }

    return benefits;
  }

  public generateUserFriendlySummary(): string {
    // Generate AI-powered user-friendly summary
    const analysis = this.generateUserFriendlyAnalysis();
    
    let summary = `📋 **What is this document?**\n${analysis.whatIsThis}\n\n`;
    
    summary += `👥 **Who is involved?**\n${analysis.whoIsInvolved}\n\n`;
    
    summary += `🎯 **What's the main purpose?**\n${analysis.whatHappens}\n\n`;
    
    if (analysis.moneyMatters) {
      summary += `💰 **Money matters:**\n${analysis.moneyMatters}\n\n`;
    }
    
    if (analysis.timeframes) {
      summary += `⏰ **Important timeframes:**\n${analysis.timeframes}\n\n`;
    }
    
    summary += `✅ **Your rights:**\n${analysis.yourRights}\n\n`;
    
    summary += `📝 **Your responsibilities:**\n${analysis.yourObligations}\n\n`;
    
    if (analysis.potentialIssues) {
      summary += `⚠️ **Things to watch out for:**\n${analysis.potentialIssues}\n\n`;
    }
    
    summary += `🚀 **What happens next:**\n${analysis.nextSteps}`;
    
    return summary;
  }

  private generateUserFriendlyAnalysis(): UserFriendlyAnalysis {
    // Use sample-based analysis for better accuracy
    const sampleAnalysis = INDIAN_KANOON_SAMPLES[this.documentType as keyof typeof INDIAN_KANOON_SAMPLES];
    
    if (sampleAnalysis) {
      // Adapt sample analysis to current document
      return this.adaptSampleAnalysis(sampleAnalysis.analysis);
    }

    // Generate fresh analysis
    return {
      whatIsThis: this.explainDocumentType(),
      whoIsInvolved: this.explainParties(),
      whatHappens: this.explainMainActivity(),
      moneyMatters: this.explainFinancials(),
      timeframes: this.explainTimelines(),
      yourRights: this.explainRights(),
      yourObligations: this.explainObligations(),
      potentialIssues: this.explainRisks(),
      nextSteps: this.explainNextSteps()
    };
  }

  private adaptSampleAnalysis(sample: any): UserFriendlyAnalysis {
    // Adapt sample analysis with actual document data
    return {
      whatIsThis: this.explainDocumentType(),
      whoIsInvolved: this.context.parties.length > 0 ? 
        `${this.context.parties[0]} and ${this.context.parties[1] || 'the other party'}` : 
        sample.whoIsInvolved,
      whatHappens: this.context.mainPurpose ? 
        `The main purpose is ${this.context.mainPurpose}` : 
        sample.whatHappens,
      moneyMatters: this.context.keyAmounts.length > 0 ? 
        `Financial amounts mentioned: ${this.context.keyAmounts.join(', ')}` : 
        sample.moneyMatters,
      timeframes: this.context.importantDates.length > 0 ? 
        `Important dates/periods: ${this.context.importantDates.join(', ')}` : 
        sample.timeframes,
      yourRights: sample.yourRights,
      yourObligations: this.context.mainObligations.length > 0 ? 
        this.context.mainObligations.join('; ') : 
        sample.yourObligations,
      potentialIssues: this.context.risks.length > 0 ? 
        this.context.risks.join('; ') : 
        sample.potentialIssues,
      nextSteps: sample.nextSteps
    };
  }

  private explainDocumentType(): string {
    const explanations = {
      service_agreement: "A business contract where one party agrees to provide services to another party for payment",
      employment_contract: "A job agreement that defines the relationship between an employer and employee",
      lease_agreement: "A rental contract for property between a landlord and tenant",
      partnership_deed: "An agreement between business partners to work together and share profits/losses",
      loan_agreement: "A contract where one party lends money to another with repayment terms",
      nda: "A confidentiality agreement to protect sensitive information from being shared",
      sale_deed: "A legal document that transfers ownership of property from seller to buyer",
      court_judgment: "A court's official decision on a legal case",
      legal_notice: "A formal warning or demand sent before taking legal action"
    };

    return explanations[this.documentType as keyof typeof explanations] || "A legal document that creates rights and obligations between parties";
  }

  private explainParties(): string {
    if (this.context.parties.length >= 2) {
      return `${this.context.parties[0]} and ${this.context.parties[1]}`;
    } else if (this.context.parties.length === 1) {
      return `${this.context.parties[0]} and another party`;
    }
    return "The parties involved in this legal agreement";
  }

  private explainMainActivity(): string {
    if (this.context.mainPurpose) {
      return `The main activity involves ${this.context.mainPurpose}`;
    }
    
    const activities = {
      service_agreement: "providing professional services",
      employment_contract: "working in a specific job role",
      lease_agreement: "renting property",
      partnership_deed: "running a business together",
      loan_agreement: "lending and borrowing money",
      nda: "sharing confidential information safely"
    };

    return activities[this.documentType as keyof typeof activities] || "fulfilling the terms of the agreement";
  }

  private explainFinancials(): string {
    if (this.context.keyAmounts.length > 0) {
      return `The document mentions these amounts: ${this.context.keyAmounts.join(', ')}. Make sure you understand when and how payments should be made.`;
    }
    return "No specific financial amounts mentioned in the document";
  }

  private explainTimelines(): string {
    if (this.context.importantDates.length > 0) {
      return `Important dates or periods mentioned: ${this.context.importantDates.join(', ')}`;
    }
    return "No specific timelines mentioned - clarify important dates before proceeding";
  }

  private explainRights(): string {
    const rights = {
      service_agreement: "You have the right to receive the agreed services on time and as specified, and to get refunds if services are not delivered properly",
      employment_contract: "You have the right to receive your salary on time, get proper working conditions, take entitled leaves, and receive benefits like PF and medical insurance",
      lease_agreement: "You have the right to peaceful use of the property, get repairs done by landlord, and get your security deposit back when you leave",
      partnership_deed: "You have the right to participate in business decisions, receive your share of profits, and access business records",
      loan_agreement: "As a borrower, you have the right to receive the loan amount as agreed, and as a lender, you have the right to get repayment with interest"
    };

    return rights[this.documentType as keyof typeof rights] || "You have rights as defined in the agreement - make sure you understand them clearly";
  }

  private explainObligations(): string {
    if (this.context.mainObligations.length > 0) {
      return `Your main responsibilities include: ${this.context.mainObligations.slice(0, 3).join('; ')}`;
    }

    const obligations = {
      service_agreement: "Pay the agreed amount on time, provide necessary cooperation, and follow the terms of service",
      employment_contract: "Perform your job duties diligently, maintain confidentiality, follow company policies, and give proper notice before leaving",
      lease_agreement: "Pay rent on time, maintain the property properly, follow building rules, and give proper notice before vacating",
      partnership_deed: "Contribute your agreed capital, participate actively in business, share losses as agreed, and act in good faith",
      loan_agreement: "Repay the loan amount with interest on time, maintain any security provided, and inform lender of any financial difficulties"
    };

    return obligations[this.documentType as keyof typeof obligations] || "Follow all terms mentioned in the agreement and act in good faith";
  }

  private explainRisks(): string {
    if (this.context.risks.length > 0) {
      return this.context.risks.join('; ');
    }

    const risks = {
      service_agreement: "Delays in payment could stop work, unclear requirements might cause disputes, and poor quality work could lead to legal issues",
      employment_contract: "You could be terminated during probation, salary might be deducted for poor performance, and breaking confidentiality could lead to legal action",
      lease_agreement: "Rent increases are possible, you might lose security deposit for damages, and breaking lease early could result in penalties",
      partnership_deed: "You're personally liable for business debts, disputes between partners could affect business, and you might have to share unexpected losses",
      loan_agreement: "Failure to repay could result in legal action, loss of security/collateral, and damage to credit rating"
    };

    return risks[this.documentType as keyof typeof risks] || "Make sure you understand all terms before signing to avoid future problems";
  }

  private explainNextSteps(): string {
    const nextSteps = {
      service_agreement: "Review all terms carefully, clarify any doubts, ensure both parties sign, and make the first payment as agreed",
      employment_contract: "Complete joining formalities, submit required documents, understand company policies, and start your probation period",
      lease_agreement: "Inspect the property thoroughly, pay security deposit and first month rent, get all keys and documents, and start your tenancy",
      partnership_deed: "Register the partnership legally, open business bank account, contribute your capital, and start business operations",
      loan_agreement: "Complete all documentation, provide required securities, understand repayment schedule, and ensure loan amount is received"
    };

    return nextSteps[this.documentType as keyof typeof nextSteps] || "Review the document carefully with a legal advisor before proceeding";
  }
}