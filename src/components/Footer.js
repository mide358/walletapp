import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faLinkedin,
  faGithub,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const date = new Date();

  return (
    <div className="footer">
      <div className="foot">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/mide358"
          className="github foot"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/iyimide-adegunloye/"
          className="linkedin foot"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>

        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/cuteiyimi"
          className="instagram foot"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="mailto:iyimide.adegunloye@gmail.com"
          className="email foot"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/cuteiyimi"
          className="twitter foot"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>

      <div className="foot copyright">
        <p>
          Iyimide Adegunloye <FontAwesomeIcon icon={faCopyright} />
          {date.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
