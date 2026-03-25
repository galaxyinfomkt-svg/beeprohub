export interface Niche {
  slug: string;
  name: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  painPoints: string[];
  benefits: string[];
  description: string;
  keywords: string[];
}

export const niches: Niche[] = [
  {
    slug: "contractors",
    name: "Contractors",
    title: "CRM & Marketing Automation for Contractors",
    heroTitle: "Stop Losing Jobs. Start Closing More Contracts.",
    heroSubtitle: "The all-in-one platform built for contractors who want to automate follow-ups, manage leads, and grow revenue without the chaos.",
    painPoints: [
      "Losing leads because you're too busy on job sites to follow up",
      "Spending hours creating estimates and invoices manually",
      "No system to track which jobs are in progress or completed",
      "Missing calls from potential clients while on the job"
    ],
    benefits: [
      "Automatic follow-ups so no lead falls through the cracks",
      "Professional estimates and invoices in 3 minutes",
      "Full pipeline view of every job from lead to completion",
      "Never miss a call with integrated phone system and voicemail"
    ],
    description: "Bee Pro Hub helps contractors manage their entire business from one platform. From the first phone call to the final invoice, every step is tracked, automated, and optimized for maximum efficiency.",
    keywords: ["CRM for contractors", "contractor marketing automation", "contractor lead generation", "contractor business software"]
  },
  {
    slug: "cleaning",
    name: "Cleaning Companies",
    title: "CRM & Marketing for Cleaning Companies",
    heroTitle: "Fill Your Schedule. Keep Clients Coming Back.",
    heroSubtitle: "Automate bookings, follow-ups, and reviews so you can focus on delivering spotless results.",
    painPoints: [
      "Inconsistent bookings and empty slots in your schedule",
      "Clients forgetting appointments or canceling last minute",
      "No system to collect and showcase customer reviews",
      "Spending too much time on phone calls and text messages"
    ],
    benefits: [
      "Online booking that fills your schedule automatically",
      "Automatic reminders that reduce no-shows by 80%",
      "Automated review requests after every completed job",
      "WhatsApp and SMS automation for instant client communication"
    ],
    description: "Bee Pro Hub gives cleaning companies the tools to automate scheduling, communicate with clients effortlessly, and build a stellar online reputation that attracts new customers.",
    keywords: ["cleaning company CRM", "cleaning business software", "cleaning company marketing", "maid service automation"]
  },
  {
    slug: "roofing",
    name: "Roofing Companies",
    title: "CRM & Lead Generation for Roofing Companies",
    heroTitle: "More Roofing Leads. More Closed Deals. Less Hassle.",
    heroSubtitle: "From storm damage leads to repeat customers, manage your entire roofing business in one powerful platform.",
    painPoints: [
      "Paying for leads that never convert because follow-up is too slow",
      "Losing track of estimates sent and jobs in progress",
      "No way to automatically reach out after storms or seasonal changes",
      "Competitors are getting the jobs because they respond faster"
    ],
    benefits: [
      "Instant follow-up on every lead within seconds, not hours",
      "Complete job pipeline from inspection to final payment",
      "Weather-triggered automated campaigns to generate leads",
      "Professional estimates with e-signature sent from your phone"
    ],
    description: "Bee Pro Hub is the ultimate roofing business management tool. Capture leads from every source, follow up instantly, track every job, and get paid faster.",
    keywords: ["roofing CRM", "roofing lead generation", "roofing company software", "roofing business automation"]
  },
  {
    slug: "painting",
    name: "Painting Companies",
    title: "CRM & Marketing for Painting Contractors",
    heroTitle: "Paint a Bigger Picture for Your Business Growth.",
    heroSubtitle: "Manage leads, automate estimates, and build a reputation that keeps your schedule full year-round.",
    painPoints: [
      "Seasonal slowdowns with empty schedules in winter months",
      "Creating estimates takes too long and often gets forgotten",
      "No system to stay in touch with past clients for repeat business",
      "Word-of-mouth isn't enough to keep growing"
    ],
    benefits: [
      "Seasonal email and SMS campaigns to fill slow months",
      "Quick estimates with photo attachments sent in minutes",
      "Automatic follow-ups with past clients for repeat bookings",
      "Google review automation to build trust and attract new clients"
    ],
    description: "Bee Pro Hub helps painting contractors grow year-round with automated marketing, smart CRM, and tools that make estimates, scheduling, and client communication effortless.",
    keywords: ["painting contractor CRM", "painting company marketing", "painting business software", "painter lead generation"]
  },
  {
    slug: "landscaping",
    name: "Landscaping Companies",
    title: "CRM & Automation for Landscaping Businesses",
    heroTitle: "Grow Your Landscaping Business Like Never Before.",
    heroSubtitle: "Automate your client communication, fill your schedule, and manage crews — all from one platform.",
    painPoints: [
      "Managing multiple crews and job locations without a system",
      "Clients requesting quotes that take days to prepare",
      "No way to upsell seasonal services to existing clients",
      "Losing potential clients because they found someone who responded faster"
    ],
    benefits: [
      "Instant automated responses to every inquiry",
      "Quick quotes with service templates for common jobs",
      "Seasonal upsell campaigns sent automatically to your client base",
      "Crew scheduling and job tracking all in one place"
    ],
    description: "Bee Pro Hub gives landscaping companies the edge they need. From lead capture to crew scheduling, from seasonal campaigns to automated invoicing, everything is connected.",
    keywords: ["landscaping CRM", "landscaping business software", "landscaping marketing automation", "lawn care lead generation"]
  }
];
