// Comprehensive Indian Legal Database for Enhanced Analysis
// This module contains extensive legal knowledge for accurate document analysis

export interface LegalAct {
  name: string;
  year: number;
  sections: { [key: string]: LegalSection };
  applicableDocuments: string[];
  keywords: string[];
}

export interface LegalSection {
  number: string;
  title: string;
  description: string;
  penalties?: string[];
  applicability: string[];
}

export interface CourtCase {
  title: string;
  citation: string;
  court: string;
  year: number;
  facts: string;
  principle: string;
  relevantSections: string[];
  applicableScenarios: string[];
}

export interface ComplianceRequirement {
  requirement: string;
  act: string;
  section: string;
  documentTypes: string[];
  consequences: string;
  remedialActions: string[];
}

// Comprehensive Indian Legal Acts Database
export const INDIAN_LEGAL_ACTS: LegalAct[] = [
  {
    name: "Indian Contract Act",
    year: 1872,
    sections: {
      "2(a)": {
        number: "2(a)",
        title: "Proposal",
        description: "When a person signifies to another his willingness to do or to abstain from doing anything, with a view to obtaining the assent of that other to such act or abstinence, he is said to make a proposal",
        applicability: ["all_contracts", "offer_acceptance"]
      },
      "2(b)": {
        number: "2(b)",
        title: "Acceptance",
        description: "When the person to whom the proposal is made signifies his assent thereto, the proposal is said to be accepted",
        applicability: ["all_contracts", "offer_acceptance"]
      },
      "2(d)": {
        number: "2(d)",
        title: "Consideration",
        description: "When, at the desire of the promisor, the promisee or any other person has done or abstained from doing, or does or abstains from doing, or promises to do or to abstain from doing, something, such act or abstinence or promise is called a consideration for the promise",
        applicability: ["all_contracts", "consideration"]
      },
      "2(e)": {
        number: "2(e)",
        title: "Agreement",
        description: "Every promise and every set of promises, forming the consideration for each other, is an agreement",
        applicability: ["all_contracts"]
      },
      "2(h)": {
        number: "2(h)",
        title: "Contract",
        description: "An agreement enforceable by law is a contract",
        applicability: ["all_contracts"]
      },
      "10": {
        number: "10",
        title: "What agreements are contracts",
        description: "All agreements are contracts if they are made by the free consent of parties competent to contract, for a lawful consideration and with a lawful object, and are not hereby expressly declared to be void",
        applicability: ["all_contracts", "validity"]
      },
      "11": {
        number: "11",
        title: "Who are competent to contract",
        description: "Every person is competent to contract who is of the age of majority according to the law to which he is subject, and who is of sound mind, and is not disqualified from contracting by any law to which he is subject",
        applicability: ["all_contracts", "capacity"]
      },
      "13": {
        number: "13",
        title: "Consent",
        description: "Consent is said to be free when it is not caused by coercion, undue influence, fraud, misrepresentation, or mistake",
        applicability: ["all_contracts", "consent"]
      },
      "56": {
        number: "56",
        title: "Agreement to do impossible act",
        description: "An agreement to do an act impossible in itself is void",
        applicability: ["impossibility", "frustration"]
      },
      "73": {
        number: "73",
        title: "Compensation for loss or damage caused by breach of contract",
        description: "When a contract has been broken, the party who suffers by such breach is entitled to receive, from the party who has broken the contract, compensation for any loss or damage caused to him thereby",
        penalties: ["Damages", "Compensation"],
        applicability: ["breach", "remedies"]
      }
    },
    applicableDocuments: ["service_agreement", "employment_contract", "partnership_deed", "loan_agreement", "nda"],
    keywords: ["contract", "agreement", "consideration", "breach", "consent", "offer", "acceptance"]
  },
  {
    name: "GST Act",
    year: 2017,
    sections: {
      "9": {
        number: "9",
        title: "Levy and collection of tax",
        description: "There shall be levied a tax called the central goods and services tax on all intra-State supplies of goods or services or both",
        applicability: ["service_agreement", "sale_deed"]
      },
      "12": {
        number: "12",
        title: "Rates of tax",
        description: "The rates of tax under this Act shall be as recommended by the Council",
        applicability: ["all_taxable_supplies"]
      },
      "16": {
        number: "16",
        title: "Eligibility and conditions for taking input tax credit",
        description: "Every registered person shall be entitled to take credit of input tax charged on any supply of goods or services or both to him",
        applicability: ["registered_persons"]
      },
      "22": {
        number: "22",
        title: "Compulsory registration",
        description: "Every supplier shall be liable to be registered under this Act if the aggregate turnover in a financial year exceeds twenty lakh rupees",
        penalties: ["Late fee", "Interest", "Penalty"],
        applicability: ["suppliers", "businesses"]
      },
      "73": {
        number: "73",
        title: "Determination of tax not paid or short paid or erroneously refunded or input tax credit wrongly availed or utilized",
        description: "Where it appears to the proper officer that any tax has not been paid or short paid or erroneously refunded, or where input tax credit has been wrongly availed or utilized",
        penalties: ["Penalty up to 200% of tax", "Interest"],
        applicability: ["tax_evasion", "non_compliance"]
      }
    },
    applicableDocuments: ["service_agreement", "sale_deed", "partnership_deed"],
    keywords: ["gst", "tax", "supply", "registration", "input credit", "invoice"]
  },
  {
    name: "Companies Act",
    year: 2013,
    sections: {
      "2(20)": {
        number: "2(20)",
        title: "Company",
        description: "Company means a company incorporated under this Act or under any previous company law",
        applicability: ["corporate_entities"]
      },
      "4": {
        number: "4",
        title: "Formation of company",
        description: "A company may be formed for any lawful purpose by seven or more persons or, where the company to be formed will be a private company, by two or more persons",
        applicability: ["incorporation"]
      },
      "149": {
        number: "149",
        title: "Company to have Board of Directors",
        description: "Every company shall have a Board of Directors consisting of individuals as directors",
        applicability: ["corporate_governance"]
      },
      "179": {
        number: "179",
        title: "Powers of Board",
        description: "Subject to the provisions of this Act, the Board of Directors of a company shall be entitled to exercise all such powers",
        applicability: ["board_powers"]
      }
    },
    applicableDocuments: ["service_agreement", "employment_contract", "partnership_deed"],
    keywords: ["company", "director", "board", "incorporation", "corporate", "shares"]
  },
  {
    name: "Employees Provident Fund Act",
    year: 1952,
    sections: {
      "1": {
        number: "1",
        title: "Short title, extent and commencement",
        description: "This Act may be called the Employees' Provident Funds and Miscellaneous Provisions Act, 1952",
        applicability: ["employment"]
      },
      "6": {
        number: "6",
        title: "Contribution",
        description: "The contribution which shall be paid by the employer to the Fund shall be ten per cent. of the basic wages, dearness allowance and retaining allowance",
        penalties: ["Damages", "Interest"],
        applicability: ["employers", "employees"]
      }
    },
    applicableDocuments: ["employment_contract"],
    keywords: ["provident fund", "pf", "contribution", "employee", "employer"]
  },
  {
    name: "Payment of Gratuity Act",
    year: 1972,
    sections: {
      "4": {
        number: "4",
        title: "Payment of gratuity",
        description: "Gratuity shall be payable to an employee on the termination of his employment after he has rendered continuous service for not less than five years",
        applicability: ["employment_termination"]
      }
    },
    applicableDocuments: ["employment_contract"],
    keywords: ["gratuity", "termination", "continuous service"]
  },
  {
    name: "Indian Stamp Act",
    year: 1899,
    sections: {
      "3": {
        number: "3",
        title: "Instruments chargeable with duty",
        description: "Subject to the provisions of this Act and the exemptions contained in Schedule I, the following instruments shall be chargeable with duty",
        penalties: ["Document inadmissible", "Fine"],
        applicability: ["all_documents"]
      },
      "17": {
        number: "17",
        title: "Instruments not duly stamped inadmissible in evidence",
        description: "No instrument chargeable with duty shall be admitted in evidence for any purpose by any person having by law or consent of parties authority to receive evidence",
        penalties: ["Inadmissible in court"],
        applicability: ["unstamped_documents"]
      }
    },
    applicableDocuments: ["lease_agreement", "sale_deed", "partnership_deed", "loan_agreement"],
    keywords: ["stamp duty", "stamped", "duty", "instrument"]
  },
  {
    name: "Registration Act",
    year: 1908,
    sections: {
      "17": {
        number: "17",
        title: "Documents of which registration is compulsory",
        description: "The following documents shall be registered, if the property to which they relate is situate in a district in which, and if they are executed on or after the date on which, this Act comes into force",
        penalties: ["Document void", "Unenforceable"],
        applicability: ["property_documents"]
      }
    },
    applicableDocuments: ["lease_agreement", "sale_deed", "power_of_attorney"],
    keywords: ["registration", "register", "property", "immovable"]
  },
  {
    name: "Arbitration and Conciliation Act",
    year: 2015,
    sections: {
      "7": {
        number: "7",
        title: "Arbitration agreement",
        description: "In this Part, arbitration agreement means an agreement by the parties to submit to arbitration all or certain disputes which have arisen or which may arise between them",
        applicability: ["dispute_resolution"]
      },
      "11": {
        number: "11",
        title: "Appointment of arbitrators",
        description: "Subject to this Part, the parties are free to agree on a procedure for appointing the arbitrator or arbitrators",
        applicability: ["arbitration_proceedings"]
      }
    },
    applicableDocuments: ["service_agreement", "employment_contract", "partnership_deed", "lease_agreement"],
    keywords: ["arbitration", "dispute", "arbitrator", "conciliation"]
  }
];

// Landmark Indian Court Cases Database
export const LANDMARK_CASES: CourtCase[] = [
  {
    title: "Mohori Bibee v. Dharmodas Ghose",
    citation: "(1903) ILR 30 Cal 539",
    court: "Privy Council",
    year: 1903,
    facts: "A minor mortgaged his property to a money lender. Upon attaining majority, he sued to set aside the mortgage.",
    principle: "An agreement with a minor is void ab initio and cannot be ratified even after attaining majority",
    relevantSections: ["Section 11 of Indian Contract Act"],
    applicableScenarios: ["minor_contracts", "capacity_issues", "void_agreements"]
  },
  {
    title: "Satyabrata Ghose v. Mugneeram Bangur & Co.",
    citation: "AIR 1954 SC 44",
    court: "Supreme Court of India",
    year: 1954,
    facts: "A contract for supply of jute became impossible due to partition of India and creation of East Pakistan.",
    principle: "Doctrine of frustration applies when performance becomes impossible due to supervening events",
    relevantSections: ["Section 56 of Indian Contract Act"],
    applicableScenarios: ["impossibility", "frustration", "supervening_events"]
  },
  {
    title: "Lalman Shukla v. Gauri Dutt",
    citation: "(1913) ILR 39 All 489",
    court: "Allahabad High Court",
    year: 1913,
    facts: "A servant found his master's missing nephew without knowledge of the reward announcement.",
    principle: "Communication of offer is essential for a valid contract. Acceptance without knowledge of offer is invalid",
    relevantSections: ["Section 4, Section 8 of Indian Contract Act"],
    applicableScenarios: ["offer_acceptance", "communication", "reward_cases"]
  },
  {
    title: "Balfour v. Balfour",
    citation: "(1919) 2 KB 571",
    court: "Court of Appeal",
    year: 1919,
    facts: "Husband promised to pay wife monthly allowance while he was abroad. Later he refused to pay.",
    principle: "Domestic agreements between spouses lack intention to create legal relations",
    relevantSections: ["Section 10 of Indian Contract Act"],
    applicableScenarios: ["domestic_agreements", "intention_to_create_legal_relations"]
  },
  {
    title: "Carlill v. Carbolic Smoke Ball Co.",
    citation: "(1893) 1 QB 256",
    court: "Court of Appeal",
    year: 1893,
    facts: "Company advertised that their smoke ball would prevent influenza and offered £100 reward if it failed.",
    principle: "Unilateral contracts can be formed through general offers to the public",
    relevantSections: ["Section 8 of Indian Contract Act"],
    applicableScenarios: ["unilateral_contracts", "general_offers", "acceptance_by_conduct"]
  },
  {
    title: "Hadley v. Baxendale",
    citation: "(1854) 9 Exch 341",
    court: "Court of Exchequer",
    year: 1854,
    facts: "Mill owner's shaft broke and was sent for repair. Delay in return caused loss of profits.",
    principle: "Damages for breach of contract are limited to those reasonably foreseeable at time of contract",
    relevantSections: ["Section 73 of Indian Contract Act"],
    applicableScenarios: ["damages", "remoteness", "foreseeability"]
  },
  {
    title: "Kesavananda Bharati v. State of Kerala",
    citation: "AIR 1973 SC 1461",
    court: "Supreme Court of India",
    year: 1973,
    facts: "Challenge to constitutional amendments affecting fundamental rights and property rights.",
    principle: "Basic structure doctrine - Parliament cannot alter the basic structure of Constitution",
    relevantSections: ["Article 368 of Constitution"],
    applicableScenarios: ["constitutional_law", "fundamental_rights", "property_rights"]
  },
  {
    title: "Maneka Gandhi v. Union of India",
    citation: "AIR 1978 SC 597",
    court: "Supreme Court of India",
    year: 1978,
    facts: "Passport was impounded without giving reasons or opportunity of hearing.",
    principle: "Right to life includes right to livelihood and personal liberty. Procedure must be fair and reasonable",
    relevantSections: ["Article 21 of Constitution"],
    applicableScenarios: ["fundamental_rights", "due_process", "natural_justice"]
  }
];

// Comprehensive Compliance Requirements Database
export const COMPLIANCE_REQUIREMENTS: ComplianceRequirement[] = [
  {
    requirement: "GST Registration for Service Providers",
    act: "GST Act 2017",
    section: "Section 22",
    documentTypes: ["service_agreement"],
    consequences: "Penalty, interest, and prosecution for tax evasion",
    remedialActions: [
      "Obtain GST registration if turnover exceeds ₹20 lakhs",
      "Include GST registration numbers in agreements",
      "Charge and collect GST as applicable",
      "File monthly/quarterly returns"
    ]
  },
  {
    requirement: "Stamp Duty Payment on Agreements",
    act: "Indian Stamp Act 1899",
    section: "Section 3",
    documentTypes: ["service_agreement", "lease_agreement", "sale_deed", "partnership_deed"],
    consequences: "Document inadmissible in evidence, fine up to 10 times stamp duty",
    remedialActions: [
      "Pay stamp duty as per state schedule",
      "Use stamped paper or e-stamping",
      "Get document properly stamped before execution",
      "Maintain stamping receipts"
    ]
  },
  {
    requirement: "PF Registration for Employers",
    act: "EPF Act 1952",
    section: "Section 1",
    documentTypes: ["employment_contract"],
    consequences: "Penalty, damages, and criminal prosecution",
    remedialActions: [
      "Register with EPFO if 20+ employees",
      "Deduct employee contribution (12% of basic)",
      "Pay employer contribution (12% of basic)",
      "File monthly returns and annual statements"
    ]
  },
  {
    requirement: "ESI Registration for Employers",
    act: "ESI Act 1948",
    section: "Section 2A",
    documentTypes: ["employment_contract"],
    consequences: "Penalty and prosecution",
    remedialActions: [
      "Register with ESIC if 10+ employees",
      "Deduct employee contribution (0.75%)",
      "Pay employer contribution (3.25%)",
      "Provide medical benefits to employees"
    ]
  },
  {
    requirement: "Property Registration",
    act: "Registration Act 1908",
    section: "Section 17",
    documentTypes: ["sale_deed", "lease_agreement"],
    consequences: "Document void and unenforceable",
    remedialActions: [
      "Register document if value exceeds ₹100",
      "Pay registration fees",
      "Submit required documents",
      "Complete registration within 4 months"
    ]
  },
  {
    requirement: "TDS Deduction on Payments",
    act: "Income Tax Act 1961",
    section: "Section 194C",
    documentTypes: ["service_agreement"],
    consequences: "Interest, penalty, and disallowance of expenses",
    remedialActions: [
      "Deduct TDS as per applicable rates",
      "Deposit TDS within prescribed time",
      "Issue TDS certificates",
      "File quarterly TDS returns"
    ]
  },
  {
    requirement: "Contract Labor Registration",
    act: "Contract Labour Act 1970",
    section: "Section 12",
    documentTypes: ["service_agreement"],
    consequences: "Penalty and prohibition of employment",
    remedialActions: [
      "Register as principal employer if 20+ contract workers",
      "Obtain license for contractor",
      "Ensure welfare facilities",
      "Maintain registers and records"
    ]
  },
  {
    requirement: "Minimum Wages Compliance",
    act: "Minimum Wages Act 1948",
    section: "Section 3",
    documentTypes: ["employment_contract"],
    consequences: "Fine and compensation to employees",
    remedialActions: [
      "Pay minimum wages as notified",
      "Revise wages as per notifications",
      "Maintain wage registers",
      "Display wage rates at workplace"
    ]
  },
  {
    requirement: "Shops and Establishments Registration",
    act: "Shops and Establishments Act",
    section: "Various state acts",
    documentTypes: ["employment_contract"],
    consequences: "Fine and closure of establishment",
    remedialActions: [
      "Register establishment with labor department",
      "Renew registration annually",
      "Comply with working hours",
      "Maintain attendance records"
    ]
  },
  {
    requirement: "Professional Tax Registration",
    act: "State Professional Tax Acts",
    section: "Various state provisions",
    documentTypes: ["employment_contract"],
    consequences: "Penalty and interest",
    remedialActions: [
      "Register for professional tax",
      "Deduct tax from employee salaries",
      "File monthly returns",
      "Pay tax within due dates"
    ]
  }
];

// Legal Term Definitions Database
export const LEGAL_TERM_DEFINITIONS = {
  "consideration": {
    definition: "Something of value given in exchange for a promise or performance",
    section: "Section 2(d) of Indian Contract Act 1872",
    importance: "critical",
    examples: ["Money", "Goods", "Services", "Promise to do something", "Promise to abstain from doing something"]
  },
  "free_consent": {
    definition: "Consent not caused by coercion, undue influence, fraud, misrepresentation or mistake",
    section: "Section 13 of Indian Contract Act 1872",
    importance: "critical",
    examples: ["Voluntary agreement", "No pressure or force", "Full disclosure of facts"]
  },
  "breach_of_contract": {
    definition: "Failure to perform any duty or obligation specified in a contract",
    section: "Section 73 of Indian Contract Act 1872",
    importance: "high",
    examples: ["Non-payment", "Non-delivery", "Defective performance", "Anticipatory breach"]
  },
  "force_majeure": {
    definition: "Unforeseeable circumstances that prevent a party from fulfilling a contract",
    section: "Section 56 of Indian Contract Act 1872",
    importance: "high",
    examples: ["Natural disasters", "War", "Government actions", "Pandemic", "Acts of God"]
  },
  "arbitration": {
    definition: "Alternative dispute resolution method where disputes are resolved by arbitrators",
    section: "Arbitration and Conciliation Act 2015",
    importance: "high",
    examples: ["Commercial disputes", "Contract disputes", "International arbitration"]
  },
  "stamp_duty": {
    definition: "Tax levied on legal documents to make them legally valid",
    section: "Indian Stamp Act 1899",
    importance: "critical",
    examples: ["Agreement stamp duty", "Conveyance stamp duty", "Lease stamp duty"]
  },
  "registration": {
    definition: "Official recording of documents with government authorities",
    section: "Registration Act 1908",
    importance: "critical",
    examples: ["Property registration", "Document registration", "Deed registration"]
  },
  "gst": {
    definition: "Goods and Services Tax - unified indirect tax system in India",
    section: "GST Act 2017",
    importance: "critical",
    examples: ["CGST", "SGST", "IGST", "Input tax credit"]
  },
  "provident_fund": {
    definition: "Retirement savings scheme for employees",
    section: "EPF Act 1952",
    importance: "high",
    examples: ["Employee contribution", "Employer contribution", "PF withdrawal"]
  },
  "gratuity": {
    definition: "Lump sum payment to employee on retirement or resignation",
    section: "Payment of Gratuity Act 1972",
    importance: "high",
    examples: ["15 days salary per year", "Minimum 5 years service", "Death gratuity"]
  }
};

// Export utility functions
export function findRelevantAct(documentType: string, keywords: string[]): LegalAct[] {
  return INDIAN_LEGAL_ACTS.filter(act => 
    act.applicableDocuments.includes(documentType) ||
    keywords.some(keyword => act.keywords.includes(keyword.toLowerCase()))
  );
}

export function findRelevantCases(keywords: string[]): CourtCase[] {
  return LANDMARK_CASES.filter(case_ =>
    keywords.some(keyword => 
      case_.applicableScenarios.includes(keyword.toLowerCase()) ||
      case_.principle.toLowerCase().includes(keyword.toLowerCase())
    )
  );
}

export function getComplianceRequirements(documentType: string): ComplianceRequirement[] {
  return COMPLIANCE_REQUIREMENTS.filter(req => 
    req.documentTypes.includes(documentType)
  );
}

export function getLegalTermDefinition(term: string): any {
  const normalizedTerm = term.toLowerCase().replace(/\s+/g, '_');
  return LEGAL_TERM_DEFINITIONS[normalizedTerm as keyof typeof LEGAL_TERM_DEFINITIONS];
}