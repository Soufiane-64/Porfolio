import "./contact.css";
const Contact = () => {
  return (
    <section className="contact-us">
      <h1 className="title">
        <span className="fa-solid fa-envelope"></span>
        Contact Me
      </h1>
      <p className="sub-title">Feel free to reach out for more information and subscribe to get notified whenever I publish new content.</p>

      <div className="flex">
        <form className="border">

          <div className="flex">
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email"/>
          </div>

          <div className="flex" style={{ marginTop: "24px" }}>
            <label htmlFor="message">Your message:</label>
            <textarea required name="" id="message"></textarea>
          </div>


          <button className="submit">Submit</button>
        </form>
        <div className="border animation">Animation</div>
      </div>


    </section>
  );
};
export default Contact;

