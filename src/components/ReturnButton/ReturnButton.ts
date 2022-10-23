import Block from 'core/Block';
import './ReturnButton.scss';

interface IncomingReturnButtonProps {
  path: string;
  class?: string;
  onClick?: () => void;
}

interface ReturnButtonProps {
  path: string;
  class?: string;
  events: {
    click?: () => void;
  };
}

export default class ReturnButtonButton extends Block<ReturnButtonProps> {
  static componentName: string = 'ReturnButton';

  constructor({ path, class: string = 'backBlock__link', onClick }: IncomingReturnButtonProps) {
    super({ path, class: string, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `

<div class='backBlock'>
<button  class='{{class}}' onClick={{onClick}}>
  </button>
  </div>
      `;
  }
}
