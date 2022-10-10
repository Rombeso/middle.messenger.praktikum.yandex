import Block from 'core/Block';
import './ProfileItem.scss';

export interface ProfileItemProps {
  name: string;
  data: string;
  type: string;
}

export default class ProfileItem extends Block<ProfileItemProps> {
  static componentName: string = 'UserDataItem';

  constructor(props: ProfileItemProps) {
    super(props);
  }

  render() {
    // language=hbs
    return `
        <div class='dataItem'>
    <div class='dataItem__title'>{{name}}</div>
    <div class='dataItem__content'>{{value}}</div>
</div>
              `;
  }
}
