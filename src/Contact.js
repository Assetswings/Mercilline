import ReactLenis, { useLenis } from "lenis/react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { useRef, useState , useEffect} from "react";
import Icon1 from "./assets/LinkedIn.svg";
import Icon2 from "./assets/X.svg";
import Icon3 from "./assets/Instagram.svg";
import Icon4 from "./assets/Facebook.svg";
import Icon5 from "./assets/Youtube.svg";
import { Helmet } from 'react-helmet-async';
import Cursor from "./cursor";



function Contact1() {
  const form = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_losdzu8",
        "template_wtr1zfe",
        form.current,
        "pMF4w6wGrrP1DucZJ"
      )
      .then(
        (result) => {
          console.log(result.text);
          sendThankYouEmail();
          setIsSubmitted(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const sendThankYouEmail = () => {
    const userEmail = form.current["user_email"].value; // Extract user's email
    const userName = form.current["user_name"].value;   // Extract user's name

    const thankYouTemplateParams = {
      to_name: userName,     // Pass user's name to the thank-you email template
      to_email: userEmail,   // Pass user's email address to the thank-you email template
    };

    emailjs
      .send(
        "service_losdzu8",           // Same EmailJS service ID
        "template_dvfr7il",          // Template ID for the thank-you email
        thankYouTemplateParams,      // Pass the user's name and email
        "pMF4w6wGrrP1DucZJ"          // Your EmailJS public key
      )
      .then(
        (result) => {
          console.log("Thank you email sent successfully:", result.text);
        },
        (error) => {
          console.error("Failed to send thank-you email:", error.text);
        }
      );
  };

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / windowHeight) * 100;
      setScroll(scrolled);
    };

    const updateScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact | Mercellenie</title>
        <meta name="description" content="Looking for more information about Mercelleinie’s electric super bike? Feel free to reach out to us. Our team is here to help with any questions you may have." />
      </Helmet>
      <div className="scrollbar-container">
        <div className="scrollbar-progress" style={{ width: `${scroll}%` }} />
      </div>
      <Cursor />
      <ReactLenis root>
        <div className="contact-1">
          <div className="container-4">
            <div className="contact">CONTACT</div>
            <div className="inquiry">
              Have an inquiry about Mercellenie? <br />
              Get in touch with us.
            </div>
            <div className="group-18">
              <div className="rectangle-1550"></div>
              <div className="rectangle-1549"></div>
              <div className="rectangle-1548"></div>
            </div>
            <div className="columns-container">
              <div className="column-left">
                <div className="container-13">
                  <div className="container-19">
                    <span className="general-query">GENERAL QUERY</span>
                    <span className="infomercellinie-com">
                      info@mercellenie.com
                    </span>
                    <div className="phone-number-1">PHONE NUMBER</div>
                    <div className="container-phone">+91-9444041145</div>
                    <div className="location">LOCATION</div>
                    <div className="column-left-address">
                      Madhavaram, <br />
                      Chennai - 600051
                    </div>
                  </div>
                </div>
              </div>

              {isSubmitted && (
                <div className="popup">
                  <div className="popup-content">
                    <p>Thank you! Your message has been sent successfully!</p>
                    <button
                      className="close-popup-button"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              {/* <form ref={form} onSubmit={sendEmail}> */}
              <form ref={form} onSubmit={sendEmail}>
                <div className="column-center">
                  <div className="frame-52">
                    <div className="group-52">
                      <div className="container-2">
                        <label htmlFor="writing-us-for"></label>
                        <select
                          className="dropdown-field"
                          id="writing-us-for"
                          name="writing-us-for"
                          required
                        >
                          <option value="" disabled selected>
                            Writing us for
                          </option>
                          <option value="vendors">Vendors</option>
                          <option value="manufacturers">Manufacturers</option>
                          <option value="partners">Partners</option>
                          <option value="media">Media</option>
                        </select>
                      </div>

                      <div className="container-1">
                        <label htmlFor="full-name"></label>
                        <input
                          type="text"
                          id="full-name"
                          name="user_name"
                          className="input-field"
                          placeholder="Full Name"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#BBBBBB",
                            width: "100%",
                          }}
                          required
                        />
                      </div>

                      <div className="container-18">
                        <label htmlFor="email-address"></label>
                        <input
                          type="email"
                          id="email-address"
                          name="user_email"
                          className="input-field"
                          placeholder="Email Address"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#BBBBBB",
                            width: "100%",
                          }}
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                          title="Please enter a valid email address ending with .com, .net, etc."
                          required
                        />
                      </div>


                      <div className="container-12">
                        <label htmlFor="phone-number"></label>
                        <input
                          type="tel"
                          id="phone-number"
                          name="user_phone"
                          className="input-field"
                          placeholder="Phone Number"
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit phone number"
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              "Please enter exactly 10 digits"
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#BBBBBB",
                            width: "100%",
                          }}
                          required
                        />
                      </div>

                      <div className="container-6">
                        <label htmlFor="message"></label>
                        <textarea
                          id="message"
                          name="message"
                          className="input-field"
                          placeholder="Message"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#BBBBBB",
                            width: "100%",
                            height: "100px",
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="frame-51">
                      <input
                        type="submit"
                        value="Submit"
                        className="submit-button"
                        style={{
                          backgroundColor: "#FFDD33",
                          color: "#060606",
                          border: "none",
                          padding: "15px 0",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        onMouseDown={(e) => {
                          e.target.style.backgroundColor = "#f0c808";
                          e.target.style.color = "#000";
                        }}
                        onMouseUp={(e) => {
                          e.target.style.backgroundColor = "#FFDD33";
                          e.target.style.color = "#060606";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>



          <div className="background-icons">
            <div className="download-icons">
              <div className="download-1">
                <a
                  href="https://www.linkedin.com/in/mercellenie-automotive-9a1910309/"
                  target="_blank"
                >
                  <img src={Icon1} className="icon1" alt="Icon 1" />
                </a>
              </div>
              <div className="download-3">
                <a href="https://www.instagram.com/mercellenie/" target="_blank">
                  <img src={Icon3} className="icon3" alt="Icon 3" />
                </a>
              </div>
              <div className="download-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61565197859780"
                  target="_blank"
                >
                  <img src={Icon4} className="icon4" alt="Icon 4" />
                </a>
              </div>
              <div className="download">
                <a href="https://www.youtube.com/@Mercellenie" target="_blank">
                  <img src={Icon5} className="icon5" alt="Icon 5" />
                </a>
              </div>
            </div>

            <div className="footer">
              <span className="mercellinie">©2024 MERCELLENIE</span>
              <span className="privacy-policy">PRIVACY POLICY</span>
              <a href="https://wings.design/" target="_blank" rel="noopener noreferrer" className="made-by-wings">
                Made by wings
              </a>

              <div className="bottom-background"></div>

            </div>
          </div>

        </div>
      </ReactLenis>
    </>
  );
}

export default Contact1;