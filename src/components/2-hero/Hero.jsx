import './hero.css';
const Hero = () => {
  return (
    <section className="hero flex">
      <div className="left-section">
        <div className="parent-avatar flex">
          <img src="./myAvatar.png" className="avatar" alt="" />
          <div className="icon-verified"></div>
        </div>
        <h1 className="title">
          Web Developer, Tech Enthusiast, and Problem Solver.
        </h1>
        <p className="sub-title">
          I'm Soufiane Hammagi, a web developer based in Germany with a passion
          for creating intuitive, modern, and efficient web applications. I
          specialize in building full-stack solutions using technologies like
          JavaScript, Python, and React—always aiming to turn ideas into clean,
          functional user experiences.
        </p>
        <div className="all-icons flex">
          <div className="icon icon-x"></div>
          <div className="icon icon-instagram"></div>
          <div className="icon icon-linkedin" ></div>
          <div className="icon icon-github"></div>
          <div className="icon icon-facebook2"></div>
        </div>
      </div>
      <div className="right-section animation border">Animation</div>
    </section>
  );
};
export default Hero;
