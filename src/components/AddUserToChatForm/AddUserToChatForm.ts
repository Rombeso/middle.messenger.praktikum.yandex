import Block from 'core/Block';
import './AddUserToChatForm.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { WithStore } from 'components/Hocs/WithStore';
import { WithRouter } from 'components/Hocs/WithRouter';
import Router from 'core/Router';
import { Store } from 'store/store';
import { getChildInputRefs } from 'helpers/getChildInputRefs';
import { getErrorsObject } from 'helpers/getErrorsObject';
import { setChildErrorsProps } from 'helpers/setChildErrorsProps';
import { getUserByLogin } from 'services/userData';
import { addUserToChat, getChatUsers } from 'services/chats';

type AddUserToChatFormProps = {
  router: Router;
  store: Store<AppState>;
  onSubmit: (event: SubmitEvent) => void;
  onInput: (event: FocusEvent) => void;
  onFocus: (event: FocusEvent) => void;
  onCancel: () => void;
};

type AddUserToChatFormPropsRefs = {
  [key: string]: ControlledInput;
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

class AddUserToChatForm extends Block<AddUserToChatFormProps, AddUserToChatFormPropsRefs> {
  static componentName: string = 'AddUserToChatForm';

  constructor(props: AddUserToChatFormProps) {
    super(props);
    this.setProps({
      onSubmit: async event => {
        event.preventDefault();

        const refs = getChildInputRefs(this.refs);
        const errors = getErrorsObject(refs);

        const { login } = refs;

        setChildErrorsProps(errors, this.refs);

        if (Object.keys(errors).length === 0) {
          const users = await getUserByLogin(login.value);
          const chatId = this.props.store.getState().selectedChat?.id;
          console.log(users);

          this.props.store.dispatch(addUserToChat, { users: [users[0].id], chatId: chatId });

          console.log(this.props.store.getState().selectedChat);
          this.props.store.dispatch(getChatUsers, this.props.store.getState().selectedChat);
        }
      },
    });
  }

  render() {
    // language=hbs
    return `
      <div class='form-container' id='addUser'>
        <div class='overlay'></div>
        
        <form class='addUserToChatForm' action='#'>
                {{{Button class='addUserToChatForm__close' onClick=onCancel title='X'}}}
                <h3>Enter user login to add</h3>
                {{{ControlledInput
                    onInput=onInput 
                    onFocus=onFocus 
                    onBlur=onBlur
                    type="text"
                    inputName="login"
                    error=error
                    value=''
                    ref="login"
                    childInputRef="login"
                    placeholder="Enter login"
                }}}
                
                <div class="createChatForm__footer">
                    {{{ Button  title='Add user' class='button button_confirm' onClick=onSubmit}}}
                    {{{ Button  title='Cancel' class='button button_redirect' onClick=onCancel}}}
                    
                </div>
            </form>
      </div>
        `;
  }
}

export default WithStore(WithRouter(AddUserToChatForm));
