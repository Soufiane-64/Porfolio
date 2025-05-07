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

              <div className="flex icons">
                <div style={{ gap: "11px" }} className="flex">
                  <div className="icon-link"></div>
                  <div className="icon-github"></div>
                </div>

                <a className="link flex" href="">
                  more
                  <span
                    style={{ alignSelf: "end" }}
                    className="icon-arrow_forward"
                  ></span>
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
