export class UserModel {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
  id?: string;

  constructor(props: UserModel) {
    return {
      first_name: props.first_name ? props.first_name : '',
      last_name: props.last_name ? props.last_name : '',
      avatar: props.avatar ? props.avatar : '',
      email: props.email ? props.email : '',
      id: props.id ? props.id : '',
    };
  }
}
