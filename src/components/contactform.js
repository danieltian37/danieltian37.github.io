import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from '../styles/Home.module.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("mnqevjna");





  if (state.succeeded) {
      return <>
            <p className={styles.contactreturn1}>Thank you for reaching out!</p>
      
            <p className={styles.contactreturn}>
                I'll do my best to get back to you as soon as I can (￣^￣ )ゞ
            </p>
            </>;
  }
  return (
    <div className={styles.contactbackground}>
        <p className={styles.formtitle}><i>Say Hello!</i></p>
        <form className={styles.form} onSubmit={handleSubmit}>
        <input
            id="email"
            type="email" 
            name="email"
            placeholder="Email Address"
            className={styles.input}
        />
        <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
        />
        <textarea
            id="message"
            name="message"
            placeholder="Message"
            className={styles.textarea}
        />
        <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
        />
            <button className={styles.button6} type="submit" disabled={state.submitting}>
                Submit
            </button>
        </form>
    </div>
  );
}

export default ContactForm;