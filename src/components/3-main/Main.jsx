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
        {[...Array(5)].map((_, index) => (
          <article key={index} className="card">
            <div className="image-container" style={{ width: "266px", height: "200px", overflow: "hidden" }}>
              <img 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={`./${index + 1}.jpg`}
                alt={`Project ${index + 1}`}
              />
            </div>
            <div style={{ width: "266px" }} className="box">
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
                  more
                  <i style={{ alignSelf: "end" }} className="fa-solid fa-arrow-right icon"></i>
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