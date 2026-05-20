import { useState } from 'react';
import catImage from '../images/cat.jpg';

function About() {
  return (
    <div>
      <h1>Despre mine</h1>
      <p>amazed amazed amazed</p>
      <img 
        src={catImage} 
        alt="my cute son" 
        className="about-cat-image" 
      />
      
      <p className="image-caption">meow?</p>
    </div>
  );
}

export default About;