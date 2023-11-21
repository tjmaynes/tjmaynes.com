import Image from 'next/image'
import ProfilePic from '../_components/ProfilePic'

const About = () => {
  return (
    <div className="prose mt-8 mx-auto max-w-2xl">
      {/* <Image
        alt="maine, emmy and me"
        src="/assets/images/me.jpg"
        width={700}
        height={300}
      /> */}
      <h1>About</h1>
      <p>
        My name is TJ Maynes and I&apos;m a passionate,{' '}
        <em>agile Software Developer</em> focusing on <em>Fullstack</em>{' '}
        development using Javascript/Typescript, React, Nodejs, PostgreSQL and
        Kubernetes.
      </p>
      <h2>👨‍💻 What I&apos;m doing now</h2>
      <ul>
        <li>Looking for work on fullstack teams and projects.</li>
        <li>
          Studying for renewing my Certified Kubernetes Application Developer
          (CKAD) certificate exam and starting an online education business.
        </li>
      </ul>
      <h2>🌍 Where am I now</h2>
      <ul>
        <li>
          At the moment, I&apos;m living in Central Timezone (
          <a href="https://www.google.com/maps/place/Rochester,+MN">
            Rochester, Minnesota
          </a>
          ).
        </li>
      </ul>
      <h2>💻 My Setup</h2>
      <h3>
        <a href="https://github.com/tjmaynes/config-asdf">Dev Workstation</a>
      </h3>
      <ul>
        <li>Operating System: MacOS (latest)</li>
        <li>Languages: Typescript/Javascript, Bash</li>
        <li>Tools: React, Nodejs, Kubernetes</li>
        <li>Editor: Visual Studio Code, Vim</li>
      </ul>
      <h3>
        <a href="https://github.com/tjmaynes/geck">Home Server</a>
      </h3>
      <ul>
        <li>Operating System: Ubuntu Server</li>
        <li>Services: Systemd + Docker</li>
      </ul>
      <h1 id="history">History</h1>
      <h2 id="indebted-usa">
        <a href="https://www.indebted.co/en-US">InDebted USA</a>
      </h2>
      <p>
        On July 19th, 2022, I started my first day working at InDebted USA on
        the Internal Client Tooling team. Our team is responsible for building
        and managing internal tools that help our Customer Success and Support
        teams manage client accounts and other useful things.
      </p>
      <h2 id="vmware-tanzu-labs">
        <a href="https://tanzu.vmware.com/labs">VMware Tanzu Labs</a>
      </h2>
      <p>
        September 15th, 2019 was my first day as a Consultant at Pivotal Labs.
        Since then, we&apos;ve since been rebranded as VMware Tanzu Labs and
        I&apos;ve worked on 12+ software enablement and delivery engagements.
        I&apos;ve pushed Swift/SwiftUI, Spring, .NET Core, Typescript/React,
        Kubernetes YAMLs and Bash to production environments.
      </p>
      <p>
        VMware Tanzu Labs is a fantastic place to work and if your interested in
        working there, I highly recommend checking out the{' '}
        <a href="https://careers.vmware.com/main/jobs?keywords=labs&amp;location=New%20York">
          careers site
        </a>
        .
      </p>
      <h2 id="nbcuniversal">
        <a href="https://www.nbcuniversal.com/">NBCUniversal</a>
      </h2>
      <p>
        On December 1st, 2016, I started my first day on a newly formed product
        team within the Content Distribution department at NBCUniversal. At
        NBCUniversal, our team was responsible for managing and adding new
        features to the MSNBC, Eonline, Syfy, Oxygen, Telemundo, USA, and
        Universo. Much of my time at NBCUniversal was spent working on backend
        services, (sole developer for) one website for the World Cup and
        automating our AWS infrastructure.
      </p>
      <p>
        I had an amazing time with some really talent people and great friends
        whom have influenced my career and my life.
      </p>
      <h2 id="rejuvenan">
        <a href="https://www.rejuvenan.com/">Rejuvenan</a>
      </h2>
      <p>May of 2015 was a busy month for me. In the span of a month:</p>
      <ol>
        <li>
          I graduated from the{' '}
          <a href="https://www.usf.edu/engineering/cse/">
            University of South Florida
          </a>
        </li>
        <li>I accepted an offer to work at Rejuvenan Global Health.</li>
        <li>
          I moved from Florida to New Jersey with my future fiancée,{' '}
          <a href="https://embryoh.com/">Emily Baron</a>.
        </li>
      </ol>
      <p>
        Rejuvenan is a stealth health-tech startup in Mid-town Manhattan that
        specialized in creating a health plan for customers based on their blood
        tests and telomere science. At Rejuvenan I was the sole iOS developer of
        the Rejuvenan iOS app. I worked closely with fullstack Ruby on Rails
        team whom influenced my first foray into test-driven development and
        pair programming.
      </p>
      <p>
        Having my first full-time job at Rejuvenan was a gift and I&apos;ll
        never forget the team that took a chance on me.
      </p>
      <h2 id="spatial-networks">
        <a href="https://www.fulcrumapp.com/">Spatial Networks</a>
      </h2>
      <p>
        While studying for my Computer Science degree, I accepted a Web
        Developer Internship at Spatial Networks, a company developing an iOS
        and Android app for geospatial data collection called{' '}
        <a href="https://www.fulcrumapp.com/company">Fulcrum</a>. At Spatial
        Networks, I learned how to contribute to a Ruby on Rails codebase with a
        small, yet mighty, team of developers.
      </p>
      <p>
        <em>
          You can learn more from my <a href="/career/cv.pdf">CV</a>.
        </em>
      </p>
    </div>
  )
}

export default About
