import Block from 'core/Block';
import './ProfileItem.scss';

export interface ProfileDataItemProps {
  name: string;
  data: string;
  type: string;
}

export default class ProfileItem extends Block<ProfileDataItemProps> {
  static componentName: string = 'ProfileItem';

  constructor(props: ProfileDataItemProps) {
    super(props);
  }

  render() {
    // language=hbs
    return `
        <div class='dataItem'>
    <div class='dataItem__title'>{{name}}</div>
    <div class='dataItem__content'>{{data}}</div>
</div>
              `;
  }
}
