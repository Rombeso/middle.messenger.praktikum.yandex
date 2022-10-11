import Block from 'core/Block';
import './errors.scss';

export default class Error404Page extends Block<Record<string, any>> {
  static componentName = 'Error404Page';

  render() {
    // language=hbs
    return `

<main class="main">
    <div class="error">
        <h1 class="error__title">404</h1>
        <p class="error__text">Page not found.</p>
        <a href="../first/first.ts" class="error__link">Go to home</a>

    </div>
    <a href="/" class="backLink">Вернуться назад</a>
</main>
        `;
  }
}
