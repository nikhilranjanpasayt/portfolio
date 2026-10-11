import type { ProjectItem, ProjectCategory } from '../types/portfolio';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All Projects',
  'AI / Machine Learning',
  'Web Development',
  'Data Science / Analytics',
  'IoT',
  'Other',
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'ai-exam-proctoring',
    title: 'AI Exam Proctoring and Cheating Detection System',
    category: 'AI / Machine Learning',
    status: 'In Progress',
    statusColor: 'blue',
    shortDescription:
      'An automated examination integrity surveillance system utilizing Computer Vision and Machine Learning algorithms to analyze student webcam streams and detect exam violations in real-time.',
    description:
      'An automated examination integrity surveillance system utilizing Computer Vision and Machine Learning algorithms to analyze student webcam streams and detect exam violations in real-time.',
    highlightPoints: [
      'Real-time webcam video stream analysis with OpenCV and neural face-landmarks detection.',
      'Gaze tracking, head pose estimation, and audio anomaly detection to flag suspicious movement.',
      'Designed for local edge inference to safeguard student privacy and reduce proctor oversight fatigue.',
    ],
    technologies: ['Python', 'OpenCV', 'FastAPI', 'Machine Learning', 'Computer Vision', 'Deep Learning'],
    metrics: 'Multi-angle real-time facial landmark tracking',
    // Note for Nikhil: Local codebase exists; add GitHub repository URL when pushed publicly
    githubUrl: undefined,
    demoUrl: undefined,
    thumbnail: 'ai-proctoring',
    isFeatured: true,
  },
  {
    id: 'smart-home-energy',
    title: 'Smart Home Energy Consumption Predictor',
    category: 'AI / Machine Learning',
    status: 'Completed',
    statusColor: 'gray',
    shortDescription:
      'A predictive machine learning regression model designed to forecast residential electrical load patterns based on historical usage metrics, temperature fluctuations, and utility tariff scheduling.',
    description:
      'A predictive machine learning regression model designed to forecast residential electrical load patterns based on historical usage metrics, temperature fluctuations, and utility tariff scheduling.',
    highlightPoints: [
      'Multi-variate feature engineering incorporating temperature metrics, appliance ratings, and time-of-day variables.',
      'Ensemble and regression learning algorithms tuned and evaluated on Root Mean Squared Error (RMSE).',
      'Generates actionable consumer conservation insights and flags irregular electrical load spikes.',
    ],
    technologies: ['Python', 'Machine Learning', 'Scikit-Learn', 'Pandas', 'Data Modeling', 'SQL'],
    metrics: 'Evaluated across multi-variate time-series parameters',
    // VERIFIED: Public repository on Nikhil's GitHub
    githubUrl: 'https://github.com/nikhilranjanpasayt/smart-home-energy-consumption-predictor',
    demoUrl: undefined,
    thumbnail: 'energy-predictor',
    isFeatured: true,
  },
  {
    id: 'micro-grid-streetlight',
    title: 'Micro-Grid Smart Streetlight & Air Quality Monitoring Node',
    category: 'IoT',
    status: 'Prototype',
    statusColor: 'deep-blue',
    shortDescription:
      'A sustainable smart-city IoT hardware prototype combining solar micro-grid energy balancing, adaptive vehicle/pedestrian motion illumination, and localized environmental telemetry.',
    description:
      'A sustainable smart-city IoT hardware prototype combining solar micro-grid energy balancing, adaptive vehicle/pedestrian motion illumination, and localized environmental telemetry.',
    highlightPoints: [
      'Dynamic power conservation switching between solar micro-grid reserves and battery storage.',
      'Embedded air pollution sensor telemetry streaming localized PM2.5, CO2, and humidity data.',
      'Adaptive luminous output adjusting dynamically based on detected motion velocity and ambient light.',
    ],
    technologies: ['IoT', 'C', 'Python', 'Sensors (PM2.5, CO2)', 'Embedded Systems', 'Smart Grid'],
    metrics: 'Energy-saving adaptive lighting simulation',
    // Note for Nikhil: Hardware prototype research; add repository or documentation URL when available
    githubUrl: undefined,
    demoUrl: undefined,
    thumbnail: 'smart-streetlight',
    isFeatured: true,
  },
  {
    id: 'business-analytics-powerbi',
    title: 'Business Analytics & Executive Performance Dashboard',
    category: 'Data Science / Analytics',
    status: 'Completed',
    statusColor: 'gray',
    shortDescription:
      'An end-to-end business intelligence and analytics solution leveraging Power BI and relational databases to uncover revenue drivers, regional sales variance, and operational efficiency metrics.',
    description:
      'An end-to-end business intelligence and analytics solution leveraging Power BI and relational databases to uncover revenue drivers, regional sales variance, and operational efficiency metrics.',
    highlightPoints: [
      'Star-schema relational data model linking sales records, geographical dimensions, and product cost centers.',
      'Custom DAX measures calculating Year-over-Year (YoY) revenue variances, profit margins, and cohort performance.',
      'Interactive executive drill-down dashboards featuring dynamic filtering, KPI scorecards, and trend lines.',
    ],
    technologies: ['Power BI', 'SQL', 'DBMS', 'DAX', 'Data Analytics', 'Business Intelligence'],
    metrics: 'Interactive multidimensional KPI dashboards',
    // Note for Nikhil: Add link to Power BI dashboard / GitHub documentation when published
    githubUrl: undefined,
    demoUrl: undefined,
    thumbnail: 'business-analytics',
    isFeatured: true,
  },
  {
    id: 'student-notes-tool',
    title: 'Student Notes Analysis & Learning Assistant',
    category: 'Web Development',
    status: 'In Progress',
    statusColor: 'light-blue',
    shortDescription:
      'A full-stack academic study companion that processes lecture notes, extracts key conceptual definitions, and generates structured revision flashcards and self-assessment prompts.',
    description:
      'A full-stack academic study companion that processes lecture notes, extracts key conceptual definitions, and generates structured revision flashcards and self-assessment prompts.',
    highlightPoints: [
      'Document parsing pipeline extracting key technical terminology, definitions, and chapter summaries.',
      'Responsive student portal with subject categorization, note bookmarking, and search functionality.',
      'Interactive quiz generation module facilitating active recall and exam preparation.',
    ],
    technologies: ['Web Development', 'JavaScript', 'HTML/CSS', 'PHP', 'SQL', 'NLP'],
    metrics: 'Streamlined academic review pipeline',
    // Note for Nikhil: In progress web application; link repository when open-sourced
    githubUrl: undefined,
    demoUrl: undefined,
    thumbnail: 'student-notes',
    isFeatured: true,
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker & Financial Analytics Engine',
    category: 'Other',
    status: 'Completed',
    statusColor: 'gray',
    shortDescription:
      'A personal finance management and tracking application that categorizes user expenditures, tracks monthly budgets, and calculates savings rates with structured persistence.',
    description:
      'A personal finance management and tracking application that categorizes user expenditures, tracks monthly budgets, and calculates savings rates with structured persistence.',
    highlightPoints: [
      'Structured spending categorizer with configurable budget caps and automated threshold alerts.',
      'Analytical calculation engine calculating category expense distributions and monthly burn rates.',
      'Clean data persistence pipeline with robust transaction record validation and CSV exporting.',
    ],
    technologies: ['Python', 'SQL', 'Data Analytics', 'File I/O', 'Expense Management'],
    metrics: 'Accurate budget tracking and expense classification',
    // VERIFIED: Public repository on Nikhil's GitHub
    githubUrl: 'https://github.com/nikhilranjanpasayt/EXPENSE-TRACKER',
    demoUrl: undefined,
    thumbnail: 'expense-tracker',
    isFeatured: false,
  },
];
