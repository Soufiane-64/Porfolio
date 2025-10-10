import "./hero.css";

const Hero = () => {
  return (
    <section className="hero flex">
      <div className="left-section">
        <div className="parent-avatar flex">
          <img src="./avatar_white.png" className="avatar" alt="" />
          {/* Verified icon (Font Awesome check-circle) */}
          <i className="fa-solid fa-circle-check icon-verified"></i>
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
          <i className="fa-brands fa-linkedin icon"></i>
          <i className="fa-brands fa-github icon"></i>
        </div>
      </div>

      <div className="right-section animation border">Animation</div>
    </section>
  );
};

export default Hero;
