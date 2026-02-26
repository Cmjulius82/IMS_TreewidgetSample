import TreeWidget from './TreeWidget'
import './App.css'

/* ── JSON string datasource for the tree widget ──────────────────── */

const treeDataSource = JSON.stringify({
  name: "Acme Corporation",
  children: [
    {
      name: "Engineering",
      status: "In Progress",
      creator: "Sarah Chen",
      date: "Jan 10, 2026",
      children: [
        {
          name: "Frontend Team",
          status: "In Progress",
          creator: "Sarah Chen",
          date: "Jan 12, 2026",
          children: [
            { name: "React Migration", status: "In Progress", creator: "Alex Rivera", date: "Feb 1, 2026" },
            { name: "Design System v2", status: "Under Review", creator: "Mia Torres", date: "Jan 20, 2026" },
            { name: "Accessibility Audit", status: "Completed", creator: "Jordan Blake", date: "Dec 5, 2025" },
            { name: "Performance Optimization", status: "In Progress", creator: "Liam Patel", date: "Feb 10, 2026" },
            { name: "E2E Test Suite", status: "Under Review", creator: "Nina Okafor", date: "Jan 28, 2026" },
            { name: "Storybook Documentation", status: "Completed", creator: "Mia Torres", date: "Nov 18, 2025" },
            {
              name: "Mobile Responsive Overhaul",
              status: "In Progress",
              creator: "Alex Rivera",
              date: "Feb 15, 2026",
              children: [
                { name: "Breakpoint Refactor", status: "Completed", creator: "Alex Rivera", date: "Jan 30, 2026" },
                { name: "Touch Gesture Support", status: "In Progress", creator: "Jordan Blake", date: "Feb 12, 2026" },
                { name: "Viewport Testing", status: "Under Review", creator: "Nina Okafor", date: "Feb 14, 2026" }
              ]
            }
          ]
        },
        {
          name: "Backend Team",
          status: "In Progress",
          creator: "David Kim",
          date: "Jan 8, 2026",
          children: [
            { name: "API v3 Development", status: "In Progress", creator: "David Kim", date: "Jan 15, 2026" },
            { name: "Database Migration", status: "Completed", creator: "Priya Sharma", date: "Dec 20, 2025" },
            { name: "Auth Service Rewrite", status: "Under Review", creator: "Marcus Johnson", date: "Feb 5, 2026" },
            { name: "Rate Limiting Implementation", status: "Completed", creator: "Elena Volkov", date: "Jan 3, 2026" },
            { name: "Caching Layer (Redis)", status: "In Progress", creator: "David Kim", date: "Feb 8, 2026" },
            { name: "GraphQL Gateway", status: "Cancelled", creator: "Priya Sharma", date: "Nov 25, 2025" },
            {
              name: "Microservices Migration",
              status: "In Progress",
              creator: "Marcus Johnson",
              date: "Feb 1, 2026",
              children: [
                { name: "User Service", status: "Completed", creator: "Marcus Johnson", date: "Jan 10, 2026" },
                { name: "Order Service", status: "In Progress", creator: "Elena Volkov", date: "Feb 3, 2026" },
                { name: "Notification Service", status: "In Progress", creator: "Priya Sharma", date: "Feb 7, 2026" },
                { name: "Payment Service", status: "Under Review", creator: "David Kim", date: "Feb 12, 2026" },
                { name: "Inventory Service", status: "In Progress", creator: "Marcus Johnson", date: "Feb 15, 2026" }
              ]
            }
          ]
        },
        {
          name: "DevOps",
          status: "In Progress",
          creator: "Carlos Mendez",
          date: "Jan 5, 2026",
          children: [
            { name: "CI/CD Pipeline Upgrade", status: "Completed", creator: "Carlos Mendez", date: "Dec 15, 2025" },
            { name: "Kubernetes Cluster Scaling", status: "In Progress", creator: "Aisha Nkemelu", date: "Feb 1, 2026" },
            { name: "Monitoring & Alerting", status: "Under Review", creator: "Carlos Mendez", date: "Jan 22, 2026" },
            { name: "Infrastructure as Code", status: "In Progress", creator: "Aisha Nkemelu", date: "Feb 10, 2026" },
            { name: "Disaster Recovery Plan", status: "Cancelled", creator: "Carlos Mendez", date: "Jan 18, 2026" },
            {
              name: "Cloud Cost Optimization",
              status: "In Progress",
              creator: "Aisha Nkemelu",
              date: "Feb 5, 2026",
              children: [
                { name: "Reserved Instance Analysis", status: "Completed", creator: "Aisha Nkemelu", date: "Jan 28, 2026" },
                { name: "Spot Instance Strategy", status: "In Progress", creator: "Carlos Mendez", date: "Feb 8, 2026" },
                { name: "Storage Tier Review", status: "Under Review", creator: "Aisha Nkemelu", date: "Feb 12, 2026" }
              ]
            }
          ]
        },
        {
          name: "QA Team",
          status: "In Progress",
          creator: "Rachel Foster",
          date: "Jan 14, 2026",
          children: [
            { name: "Regression Test Suite", status: "Completed", creator: "Rachel Foster", date: "Dec 30, 2025" },
            { name: "Load Testing Framework", status: "In Progress", creator: "Tom Nguyen", date: "Feb 3, 2026" },
            { name: "Security Penetration Testing", status: "Under Review", creator: "Rachel Foster", date: "Feb 9, 2026" },
            { name: "API Contract Testing", status: "In Progress", creator: "Tom Nguyen", date: "Feb 14, 2026" },
            { name: "Visual Regression Testing", status: "Completed", creator: "Rachel Foster", date: "Jan 25, 2026" }
          ]
        }
      ]
    },
    {
      name: "Product",
      status: "In Progress",
      creator: "Olivia Grant",
      date: "Jan 6, 2026",
      children: [
        {
          name: "Product Strategy",
          status: "In Progress",
          creator: "Olivia Grant",
          date: "Jan 8, 2026",
          children: [
            { name: "Q1 2026 Roadmap", status: "Completed", creator: "Olivia Grant", date: "Dec 18, 2025" },
            { name: "Q2 2026 Planning", status: "In Progress", creator: "Olivia Grant", date: "Feb 10, 2026" },
            { name: "Competitor Analysis", status: "Completed", creator: "Henry Wu", date: "Jan 12, 2026" },
            { name: "User Research Synthesis", status: "Under Review", creator: "Sofia Andersson", date: "Feb 6, 2026" }
          ]
        },
        {
          name: "UX Design",
          status: "In Progress",
          creator: "Sofia Andersson",
          date: "Jan 10, 2026",
          children: [
            { name: "Design Token System", status: "Completed", creator: "Sofia Andersson", date: "Dec 22, 2025" },
            { name: "Dashboard Redesign", status: "In Progress", creator: "Leo Fernandez", date: "Feb 2, 2026" },
            { name: "Onboarding Flow v2", status: "Under Review", creator: "Sofia Andersson", date: "Jan 30, 2026" },
            { name: "Settings Page Refresh", status: "In Progress", creator: "Leo Fernandez", date: "Feb 12, 2026" },
            { name: "Dark Mode Theme", status: "Completed", creator: "Sofia Andersson", date: "Jan 20, 2026" },
            {
              name: "Component Library Audit",
              status: "In Progress",
              creator: "Leo Fernandez",
              date: "Feb 8, 2026",
              children: [
                { name: "Button Variants", status: "Completed", creator: "Leo Fernandez", date: "Jan 25, 2026" },
                { name: "Form Controls", status: "In Progress", creator: "Sofia Andersson", date: "Feb 5, 2026" },
                { name: "Navigation Patterns", status: "Under Review", creator: "Leo Fernandez", date: "Feb 11, 2026" },
                { name: "Data Visualization", status: "In Progress", creator: "Sofia Andersson", date: "Feb 14, 2026" }
              ]
            }
          ]
        },
        {
          name: "Product Analytics",
          status: "In Progress",
          creator: "Henry Wu",
          date: "Jan 9, 2026",
          children: [
            { name: "Funnel Analysis Dashboard", status: "Completed", creator: "Henry Wu", date: "Jan 15, 2026" },
            { name: "A/B Testing Framework", status: "In Progress", creator: "Henry Wu", date: "Feb 4, 2026" },
            { name: "User Cohort Analysis", status: "Under Review", creator: "Henry Wu", date: "Feb 10, 2026" },
            { name: "Feature Adoption Tracking", status: "In Progress", creator: "Henry Wu", date: "Feb 13, 2026" }
          ]
        }
      ]
    },
    {
      name: "Operations",
      status: "In Progress",
      creator: "Daniel Brooks",
      date: "Jan 7, 2026",
      children: [
        {
          name: "Customer Support",
          status: "In Progress",
          creator: "Amanda Sterling",
          date: "Jan 11, 2026",
          children: [
            { name: "Ticket Triage Automation", status: "In Progress", creator: "Amanda Sterling", date: "Feb 1, 2026" },
            { name: "Knowledge Base Overhaul", status: "Completed", creator: "Ryan Cooper", date: "Jan 18, 2026" },
            { name: "SLA Response Improvement", status: "Under Review", creator: "Amanda Sterling", date: "Feb 7, 2026" },
            { name: "Chatbot Integration", status: "In Progress", creator: "Ryan Cooper", date: "Feb 11, 2026" },
            {
              name: "Support Portal Redesign",
              status: "In Progress",
              creator: "Amanda Sterling",
              date: "Feb 3, 2026",
              children: [
                { name: "Self-Service Dashboard", status: "In Progress", creator: "Ryan Cooper", date: "Feb 5, 2026" },
                { name: "FAQ System", status: "Completed", creator: "Amanda Sterling", date: "Jan 22, 2026" },
                { name: "Live Chat Widget", status: "Under Review", creator: "Ryan Cooper", date: "Feb 9, 2026" }
              ]
            }
          ]
        },
        {
          name: "Human Resources",
          status: "In Progress",
          creator: "Daniel Brooks",
          date: "Jan 9, 2026",
          children: [
            { name: "Hiring Pipeline Q1", status: "In Progress", creator: "Daniel Brooks", date: "Jan 15, 2026" },
            { name: "Employee Onboarding Revamp", status: "Completed", creator: "Keiko Tanaka", date: "Dec 28, 2025" },
            { name: "Performance Review System", status: "Under Review", creator: "Daniel Brooks", date: "Feb 6, 2026" },
            { name: "Benefits Package Update", status: "In Progress", creator: "Keiko Tanaka", date: "Feb 10, 2026" },
            { name: "Remote Work Policy v2", status: "Completed", creator: "Daniel Brooks", date: "Jan 20, 2026" },
            { name: "Team Building Events", status: "In Progress", creator: "Keiko Tanaka", date: "Feb 14, 2026" }
          ]
        },
        {
          name: "Finance",
          status: "In Progress",
          creator: "Patricia Lawson",
          date: "Jan 8, 2026",
          children: [
            { name: "Q1 Budget Review", status: "Completed", creator: "Patricia Lawson", date: "Jan 5, 2026" },
            { name: "Vendor Contract Renegotiation", status: "In Progress", creator: "Samuel Osei", date: "Feb 3, 2026" },
            { name: "Expense Tracking System", status: "Under Review", creator: "Patricia Lawson", date: "Feb 8, 2026" },
            { name: "Revenue Forecasting Model", status: "In Progress", creator: "Samuel Osei", date: "Feb 12, 2026" },
            {
              name: "Annual Audit Preparation",
              status: "In Progress",
              creator: "Patricia Lawson",
              date: "Feb 1, 2026",
              children: [
                { name: "Financial Statements Review", status: "Completed", creator: "Patricia Lawson", date: "Jan 28, 2026" },
                { name: "Tax Compliance Check", status: "In Progress", creator: "Samuel Osei", date: "Feb 5, 2026" },
                { name: "Internal Controls Audit", status: "Under Review", creator: "Patricia Lawson", date: "Feb 10, 2026" },
                { name: "Documentation Consolidation", status: "In Progress", creator: "Samuel Osei", date: "Feb 14, 2026" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Marketing",
      status: "In Progress",
      creator: "Isabella Rossi",
      date: "Jan 6, 2026",
      children: [
        {
          name: "Content Strategy",
          status: "In Progress",
          creator: "Isabella Rossi",
          date: "Jan 10, 2026",
          children: [
            { name: "Blog Editorial Calendar", status: "Completed", creator: "Isabella Rossi", date: "Jan 2, 2026" },
            { name: "Video Content Series", status: "In Progress", creator: "Jake Morrison", date: "Feb 3, 2026" },
            { name: "Case Study Production", status: "Under Review", creator: "Isabella Rossi", date: "Feb 8, 2026" },
            { name: "Whitepaper: Industry Trends 2026", status: "In Progress", creator: "Jake Morrison", date: "Feb 12, 2026" },
            { name: "Podcast Launch", status: "Cancelled", creator: "Isabella Rossi", date: "Jan 15, 2026" }
          ]
        },
        {
          name: "Digital Marketing",
          status: "In Progress",
          creator: "Jake Morrison",
          date: "Jan 11, 2026",
          children: [
            { name: "SEO Strategy Overhaul", status: "In Progress", creator: "Grace Liu", date: "Feb 1, 2026" },
            { name: "PPC Campaign Optimization", status: "Completed", creator: "Jake Morrison", date: "Jan 20, 2026" },
            { name: "Social Media Calendar Q1", status: "Completed", creator: "Grace Liu", date: "Dec 28, 2025" },
            { name: "Email Nurture Sequences", status: "Under Review", creator: "Jake Morrison", date: "Feb 6, 2026" },
            { name: "Landing Page A/B Tests", status: "In Progress", creator: "Grace Liu", date: "Feb 10, 2026" },
            {
              name: "Marketing Automation",
              status: "In Progress",
              creator: "Jake Morrison",
              date: "Feb 4, 2026",
              children: [
                { name: "Lead Scoring Model", status: "Completed", creator: "Grace Liu", date: "Jan 25, 2026" },
                { name: "Drip Campaign Setup", status: "In Progress", creator: "Jake Morrison", date: "Feb 7, 2026" },
                { name: "CRM Integration", status: "Under Review", creator: "Grace Liu", date: "Feb 11, 2026" },
                { name: "Attribution Modeling", status: "In Progress", creator: "Jake Morrison", date: "Feb 14, 2026" }
              ]
            }
          ]
        },
        {
          name: "Brand & Events",
          status: "In Progress",
          creator: "Isabella Rossi",
          date: "Jan 13, 2026",
          children: [
            { name: "Brand Guidelines Update", status: "Completed", creator: "Isabella Rossi", date: "Jan 8, 2026" },
            { name: "Tech Conference 2026 Planning", status: "In Progress", creator: "Jake Morrison", date: "Feb 5, 2026" },
            { name: "Customer Summit Organization", status: "Under Review", creator: "Isabella Rossi", date: "Feb 9, 2026" },
            { name: "Swag & Merchandise Design", status: "In Progress", creator: "Grace Liu", date: "Feb 13, 2026" }
          ]
        }
      ]
    },
    {
      name: "Sales",
      status: "In Progress",
      creator: "Robert Chang",
      date: "Jan 7, 2026",
      children: [
        {
          name: "Enterprise Sales",
          status: "In Progress",
          creator: "Robert Chang",
          date: "Jan 10, 2026",
          children: [
            { name: "Fortune 500 Outreach", status: "In Progress", creator: "Robert Chang", date: "Feb 1, 2026" },
            { name: "Enterprise Demo Environment", status: "Completed", creator: "Natalie Durand", date: "Jan 18, 2026" },
            { name: "Custom Integration Proposals", status: "Under Review", creator: "Robert Chang", date: "Feb 7, 2026" },
            { name: "Strategic Partnership - TechCorp", status: "In Progress", creator: "Natalie Durand", date: "Feb 10, 2026" },
            { name: "Contract Negotiation - GlobalInc", status: "In Progress", creator: "Robert Chang", date: "Feb 13, 2026" }
          ]
        },
        {
          name: "Sales Operations",
          status: "In Progress",
          creator: "Natalie Durand",
          date: "Jan 12, 2026",
          children: [
            { name: "CRM Data Cleanup", status: "Completed", creator: "Natalie Durand", date: "Jan 10, 2026" },
            { name: "Sales Playbook Revision", status: "In Progress", creator: "Robert Chang", date: "Feb 4, 2026" },
            { name: "Commission Structure Update", status: "Under Review", creator: "Natalie Durand", date: "Feb 8, 2026" },
            { name: "Pipeline Forecasting Tool", status: "In Progress", creator: "Robert Chang", date: "Feb 12, 2026" },
            {
              name: "Sales Enablement Program",
              status: "In Progress",
              creator: "Natalie Durand",
              date: "Feb 2, 2026",
              children: [
                { name: "Training Material Update", status: "Completed", creator: "Natalie Durand", date: "Jan 22, 2026" },
                { name: "Competitive Battle Cards", status: "In Progress", creator: "Robert Chang", date: "Feb 6, 2026" },
                { name: "ROI Calculator Tool", status: "Under Review", creator: "Natalie Durand", date: "Feb 10, 2026" },
                { name: "Customer Success Stories", status: "In Progress", creator: "Robert Chang", date: "Feb 14, 2026" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Legal & Compliance",
      status: "In Progress",
      creator: "Victoria Palmer",
      date: "Jan 9, 2026",
      children: [
        { name: "GDPR Compliance Review", status: "Completed", creator: "Victoria Palmer", date: "Jan 15, 2026" },
        { name: "SOC 2 Type II Certification", status: "In Progress", creator: "James Whitfield", date: "Feb 3, 2026" },
        { name: "Terms of Service Update", status: "Under Review", creator: "Victoria Palmer", date: "Feb 7, 2026" },
        { name: "Data Processing Agreements", status: "Completed", creator: "James Whitfield", date: "Jan 20, 2026" },
        { name: "Patent Portfolio Review", status: "In Progress", creator: "Victoria Palmer", date: "Feb 11, 2026" },
        { name: "Privacy Policy Revision", status: "Under Review", creator: "James Whitfield", date: "Feb 14, 2026" },
        {
          name: "Regulatory Compliance",
          status: "In Progress",
          creator: "Victoria Palmer",
          date: "Feb 1, 2026",
          children: [
            { name: "CCPA Audit", status: "Completed", creator: "James Whitfield", date: "Jan 28, 2026" },
            { name: "HIPAA Assessment", status: "In Progress", creator: "Victoria Palmer", date: "Feb 5, 2026" },
            { name: "ISO 27001 Preparation", status: "Under Review", creator: "James Whitfield", date: "Feb 9, 2026" },
            { name: "Accessibility Compliance (WCAG)", status: "In Progress", creator: "Victoria Palmer", date: "Feb 13, 2026" }
          ]
        }
      ]
    }
  ]
});

function App() {
  return (
    <div className="App">
      <TreeWidget dataSource={treeDataSource} />
    </div>
  )
}

export default App
