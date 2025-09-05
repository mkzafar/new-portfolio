export class Experience {
  static async list(orderBy = '-start_date') {
    // Temporary local data; replace with your source later.
    const data = [
      {
        company: 'BMS Lab @ University of Twente',
        position: 'Software Engineer Intern',
        bullets: [
          'Built a research app (Vue.js, Java, MongoDB) used by 100+ researchers; focused on UI and reliability.',
          'Set up AWS EC2/S3 testing infrastructure and CI to reduce deployment friction.',
          'Automated QA with Python + Selenium, cutting manual testing by ~40%.',
          'Prototyped Unity-based emotion VR; supported 75+ sessions to improve data accuracy by ~80%.',
        ],
        start_date: '2023-09-01',
        end_date: '2024-05-01',
        company_url: 'https://www.utwente.nl/en/bmslab/',
        is_current: false,
        location: 'Enschede, The Netherlands',
        tags: ['SCCM', 'Windows 11', 'AD', 'Healthcare'],
      },
      {
        company: 'Freelance @ Riipen',
        position: 'Full-Stack Developer',
        bullets: [
          'Delivered REST APIs and dashboards for 3 client apps (Java/Spring), reducing manual work by ~35%.',
          'Built Python analytics (time-series, A/B) for engagement and conversions.',
          'Orchestrated Postgres → Snowflake pipelines with SQL, OOP Python, and Azure Data Factory.',
          'Engineered OracleSQL caching & custom data structures; cut load times by ~86%.',
        ],
        start_date: '2022-11-01',
        end_date: '2023-04-01',
        company_url: 'https://www.riipen.com/',
        location: 'Remote',
        tags: ['React', 'Node', 'Tailwind'],
      },
      {
        company: 'YorkU Application Development Services',
        position: 'Student Developer',
        bullets: [
          'Shipped student tools (prereq charts, room finder, class locator, study group matchmaker) used by 5,000+ students.',
          'Automated MySQL updates via scraping to keep course data current.',
          'Streamlined CI/CD with GitHub Actions for faster deploys.',
        ],
        start_date: '2021-10-01',
        end_date: null,
        company_url: 'https://yorku.dev/',
        location: 'Toronto, Ontario',
        tags: ['React', 'Node', 'Tailwind'],
      },
    ];

    const sorted = data.sort((a, b) => {
      const av = a.start_date ? new Date(a.start_date).getTime() : 0;
      const bv = b.start_date ? new Date(b.start_date).getTime() : 0;
      return orderBy.startsWith('-') ? bv - av : av - bv;
    });
    return sorted;
  }
}
