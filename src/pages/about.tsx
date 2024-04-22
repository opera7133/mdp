import Head from 'next/head'

export default function About() {
  return (
    <div>
      <Head>
        <title>About | MDP</title>
      </Head>
      <main className="container my-10 mx-auto max-w-4xl min-h-screen">
        <h2 className="text-3xl font-semibold mb-5">About MDP</h2>
        <div className="font-content">
          <p>
            MDP is a portal for developers.
            <br />
            As a developer, your knowledge is important to other developers. If
            you don&apos;t understand something, it may be that others do as
            well. However, sometimes the information you want is not immediately
            available. It is very foolish to waste several hours on Google for
            just one bug.
            <br />
            At MDP, we are operating with the aim of making the portal more
            user-friendly and informative with references to Stack Overflow,
            Qiita, XDA, and others.
            <br />
            If you are interested in managing MDP, please{' '}
            <a
              href="https://vcborn.com/join"
              rel="noopener noreferrer"
              target="_blank"
              className="text-primary-500"
            >
              apply here
            </a>
            !
          </p>
        </div>
      </main>
    </div>
  )
}
