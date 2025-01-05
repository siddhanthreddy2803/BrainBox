import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="ok d-flex justify-content-center align-items-center">
      <div className="container">
        <h1 className="hi">About Me</h1>
        <p className="about">
          👋 Hey there! Welcome to BrainBox, your ultimate buddy for staying on top of your tasks without breaking a sweat. 🎯
          <br />
          <br />
          Picture this: You’ve got a million things to do, and your brain’s like, “Nope, not today!” That’s where TodoList comes swooping in like a superhero. 🦸‍♂️
          <br />
          <br />
          ✨ <strong>What makes it awesome?</strong>
          <br />
          <ul>
            <li>Simple & Clean: No clutter, no confusion. Just a straightforward way to jot down tasks and check 'em off like a boss. ✅</li>
            <li>Super Organized: Break down your chaos into manageable chunks. You’ll feel like a productivity wizard in no time! 🪄</li>
            <li>Accessible Anytime: Whether you're on your laptop or mobile, TodoList's got your back. 🌍</li>
          </ul>
          <br />
          Think of it as your personal cheerleader, gently nudging you to stay on track while giving you that sweet satisfaction of ticking off completed tasks. Oh, and did I mention it’s fun to use? 🎉
          <br />
          <br />
          So, dive in, start planning, and let’s turn “Ugh, so much to do!” into “Wow, I got this!” 💪 Happy organizing!
        </p>
      </div>
    </div>
  );
};

export default About;
