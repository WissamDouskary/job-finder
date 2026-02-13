export interface job {
  id: number;
  name: string;
  contents: string;
  publication_date: string;
  locations: [
    {
      name: string;
    },
  ];
  categories: [
    {
      name: string;
    },
  ];
  levels: [
    {
      name: string;
    },
  ];
  company: {
    name: string;
  };
  refs: {
    landing_page: string;
  };
}
