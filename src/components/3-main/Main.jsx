import React from "react";
import "./main.css";
const Main = () => {
  return (
    <main className="flex">
      <section className="flex left-section">
        <button className="active">all projects</button>
        <button>HTML & CSS</button>
        <button>JavaScript</button>
        <button>React</button>
        <button>PHP</button>
        <button>Python</button>
      </section>
      <section className="flex right-section">
        {[...Array(5)].map((index) => (
          <article key={index} className="card">
            <img width={266} src="./1.jpg" alt="" />
            <div style={{ width: "266px" }} className=" box">
              <h1 className="title">Landing Page</h1>
              <p className="sub-title">
                La description de projet, dans une paragraph
              </p>

              <div className="card-footer flex space-between">
                <div className="icon-group flex">
                  <i className="fa-solid fa-link icon" title="Live site"></i>
                  <i className="fa-brands fa-github icon" title="GitHub"></i>
                </div>

                <a className="more-link flex" href="">
                  <span>More</span>
                  <i className="fa-solid fa-arrow-right icon"></i>
                </a>
              </div>

            </div>
          </article>
        ))}
      </section>
    </main>
  );
};
export default Main;
