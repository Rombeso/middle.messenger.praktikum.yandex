import Block from 'core/Block';
import './ReturnButton.scss';

interface IncomingReturnButtonProps {
  path: string;
  onClick?: () => void;
}

interface ReturnButtonProps {
  path: string;
  events: {
    click?: () => void;
  };
}

export default class ReturnButtonButton extends Block<ReturnButtonProps> {
  static componentName: string = 'ReturnButton';

  constructor({ path, onClick }: IncomingReturnButtonProps) {
    super({ path, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `

<div class='backBlock'>
<button  class='backBlock__link' onClick={{onClick}}>
  </button>
  </div>
      `;
  }
}
