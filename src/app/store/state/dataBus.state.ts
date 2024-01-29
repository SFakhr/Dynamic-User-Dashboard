import { UserModel } from '@app/models/user';

export interface dataBusState {
  data: {
    users: {
      data: UserModel[];
      total: number;
      per_page: number;
      total_pages: number;
    };
  };

  selectedTableRow: {
    node: string;
    data: any;
  };
}
