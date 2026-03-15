import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <p className={css.message}>
      Something went wrong. Please reload the page and try again.
    </p>
  );
}