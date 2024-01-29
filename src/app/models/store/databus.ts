import { UserModel } from '../user';

export class DataBusModel {
  data: {
    users: {
      data: UserModel[];
      page: number;
      total: number;
      per_page: number;
      total_pages: number;
    };
  };
  selectedTableRow: {
    node: string;
    data: {};
  };

  constructor() {
    return {
      data: {
        users: {
          data: [],
          page: 0,
          total: 0,
          per_page: 0,
          total_pages: 0,
        },
      },
      selectedTableRow: {
        node: '',
        data: {},
      },
    };
  }
}
