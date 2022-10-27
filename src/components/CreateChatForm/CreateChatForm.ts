import Block from 'core/Block';
import './CreateChatForm.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { WithStore } from 'components/Hocs/WithStore';
import { WithRouter } from 'components/Hocs/WithRouter';
import Router from 'core/Router';
import { Store } from 'store/store';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';
import { createChat } from 'services/chats';

type CreateChatFormProps = {
  router: Router;
  store: Store<AppState>;
  onSubmit: (event: SubmitEvent) => void;
  onInput: (event: FocusEvent) => void;
  onFocus: (event: FocusEvent) => void;
  onCancel: () => void;
};

type CreateChatFormRefs = {
  [key: string]: ControlledInput;
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

class CreateChatForm extends Block<CreateChatFormProps, CreateChatFormRefs> {
  static componentName: string = 'CreateChatForm';

  constructor(props: CreateChatFormProps) {
    super(props);

    this.setProps({
      onSubmit: event => {
        event.preventDefault();

        const refs = getChildInputRefs(this.refs);
        const errors = getErrorsObject(refs);

        const { chatName } = refs;

        setChildErrorsProps(errors, this.refs);

        if (Object.keys(errors).length === 0) {
          this.props.store.dispatch(createChat, { title: chatName.value });
          this.props.store.dispatch({ isPopupShown: false });
        }
      },
    });
  }
  render() {
    // language=hbs
    return `
      <div class='form-container' id='createChat'>
          <div class='overlay'></div>
          <form class='createChatForm' action='#'>
          {{{Button class='createChatForm__close' onClick=onCancel title='X'}}}
          <h3>Enter the name for the new chat</h3>
          {{{ControlledInput
              onInput=onInput 
              onFocus=onFocus 
              onBlur=onBlur
              type="text"
              inputName="chatName"
              error=error
              value=''
              ref="chatName"
              childInputRef="chatName"
              placeholder="Enter any name"
          }}}
          
          <div class="createChatForm__footer">
              {{{ Button  title='Create chat' class='button button_confirm' onClick=onSubmit}}}
              {{{ Button  title='Cancel' class='button button_redirect' onClick=onCancel}}}
          </div>
      </form>
      </div>
     `;
  }
}

export default WithStore(WithRouter(CreateChatForm));