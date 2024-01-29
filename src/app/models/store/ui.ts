export class UIModel {
  loader: {
    users: {
      isLoading: boolean;
    };
  };

  constructor() {
    return {
      loader: {
        users: {
          isLoading: false,
        },
      },
    };
  }
}
