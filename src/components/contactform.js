import React, {useState, useRef, useEffect} from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from '../styles/Home.module.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("mnqevjna");

  const words = [
    "If you were a fruit, what fruit would you be and why?",
    "What's the most ridiculous fact you know?",
    "If you could have any superpower, but only for a day, what would it be?",
    "If you were a vegetable, which one would you be and why?",
    "What's the weirdest food combination you've ever tried?",
    "If animals could talk, which would be the rudest?",
    "What’s the most useless talent you have?",
    "If you could be any fictional character, who would you be?",
    "What's the worst haircut you've ever had?",
    "If you could have dinner with any fictional character, who would it be?",
    "What's your go-to karaoke song?",
    "If you were a superhero, what would your name be?",
    "What’s the funniest thing you’ve seen a kid do?",
    "If you could be any animal for a day, which one would you choose?",
    "What’s your most embarrassing moment from school?",
    "If you were a candy, which one would you be?",
    "What’s the strangest thing you’ve ever eaten?",
    "If you could swap lives with any historical figure, who would it be?",
    "What’s the funniest joke you know by heart?",
    "If you could only eat one food for the rest of your life, what would it be?",
    "What’s the weirdest nickname you’ve ever had?",
    "If you could live in any TV show, which one would it be?",
    "What’s your favorite dad joke?",
    "If you could instantly become an expert in something, what would it be?",
    "What’s the funniest movie you’ve ever seen?",
    "If you could have any job in the world for one week, what would it be?",
    "What’s your hidden talent?",
    "If you had to sing karaoke right now, what song would you choose?",
    "What’s the most ridiculous outfit you’ve ever worn?",
    "If you could turn any activity into an Olympic sport, what would you have a good chance at winning a medal for?",
    "What’s the weirdest dream you’ve ever had?",
    "If you could have any animal as a pet, what would it be?",
    "What’s the most useless thing you know how to do?",
    "If you had to eat a crayon, what color would you choose?",
    "What’s the strangest gift you’ve ever received?",
    "If you could be any cartoon character, who would you be?",
    "What’s your spirit animal?",
    "If you had to be handcuffed to one person for a month, who would it be?",
    "What’s the funniest thing that has happened to you recently?",
    "If you could create a holiday, what would it be called and how would it be celebrated?"
  ];

  const [currWord, setCurrWord] = useState(words[0]);
  const [isActive, setIsActive] = useState(true);

  const index = useRef(0);
  useEffect(() => {
    let interval = null;
    if (isActive) {
        interval = setInterval(() => {
            index.current++;
            setCurrWord(words[index.current]);
            if (index.current === words.length) {
                index.current = 0;
                setCurrWord(words[0]);
            }
        }, 2000);
    }
    return () => clearInterval(interval);
  });

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
          id="name"
          type="text" 
          name="name"
          placeholder="Name"
          className={styles.input}
        />
        <ValidationError 
            prefix="Name" 
            field="name"
            errors={state.errors}
        />
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
            placeholder={currWord}
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