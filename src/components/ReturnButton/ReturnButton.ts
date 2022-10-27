import Block from 'core/Block';
import './ReturnButton.scss';
import Router from 'core/Router';
import { WithRouter } from 'components/Hocs/WithRouter';

interface IncomingReturnButtonProps {
  router: Router;
  navigateBack: () => void;
}

type ReturnButtonProps = IncomingReturnButtonProps & {
  events: {
    click?: () => void;
  };
};

class ReturnButtonButton extends Block<ReturnButtonProps> {
  static componentName: string = 'ReturnButton';

  constructor(props: IncomingReturnButtonProps) {
    super({
      ...props,
      events: {
        click: () => {
          this.props.router.back();
        },
      },
    });
  }

  render() {
    // language=hbs
    return `
<div class='backBlock'>
<button  class='backBlock'>
  </button>
  </div>
      `;
  }
}

export default WithRouter(ReturnButtonButton);
