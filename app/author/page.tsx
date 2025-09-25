// app/author/page.tsx
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = {
  title: "About the Author",
  description: "Learn more about the creator of Lightning Distance Calculator.",
};

export default function AuthorPage() {
  const authorLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Colton",
    url: "https://lightningdistancecalculator.com/author",
    sameAs: [],
  };

  return (
    <main className="content">
      <JsonLd data={authorLd} />

      <article className="about-author content">
        <header>
          <h1>About the Author</h1>
        </header>

        <section id="meet-colton">
          <h2>Meet Colton</h2>
          <p>
            My name is Colton, and I am the creator of{" "}
            <strong>LightningDistanceCalculator.com</strong>. My fascination with
            lightning started when I was young and has stayed with me ever since. I
            can still remember summer evenings spent on the porch, watching the sky
            flash with light and hearing thunder roll in the distance. Even now, when
            storms pass through, I find myself stepping outside, drawn back to that
            same sense of awe and curiosity.
          </p>
          <p>
            As a kid, I learned the simple method of counting the seconds between a
            lightning strike and the sound of thunder to figure out how far away it
            was. It quickly became a habit, something I did almost every time a storm
            rolled through. That small tradition eventually inspired me to create a
            tool that makes the process easier, more accurate, and more fun for
            anyone who shares the same interest.
          </p>
          <p>
            One night, my respect for storms deepened in a way I’ll never forget. A
            bolt of lightning struck my neighbor’s home, sparking a fire that spread
            quickly and brought the fire department rushing to the scene. The thunder
            that followed shook the neighborhood and left a lasting impression on me.
            That experience reminded me that lightning is not just fascinating to
            watch, but also powerful and unpredictable.
          </p>
        </section>

        <section id="why-i-built">
          <h2>Why I Built Lightning Distance Calculator</h2>
          <p>
            Those experiences motivated me to build{" "}
            <strong>LightningDistanceCalculator.com</strong>. While counting in your
            head works, I wanted to create something more engaging and reliable. This
            site is the result — designed for people who love storms and want a clear
            way to track how far off the lightning really is.
          </p>
          <p>
            From the start, this has been a passion project. It grew out of a
            lifelong curiosity about thunderstorms and the desire to create something
            simple, straightforward, and useful. There are plenty of weather apps out
            there, but I wanted this tool to stand apart: dedicated, practical, and
            made specifically for storm watchers.
          </p>
        </section>

        <section id="what-to-expect">
          <h2>What You Can Expect Here</h2>
          <p>
            The goal of this site is simple: to make storm watching more engaging and
            interactive. Whether you’re sitting on the porch, camping in the woods,
            fishing by the lake, or hiking in the mountains, the calculator gives you
            an easy way to follow storms in real time. While there’s an educational
            side to it, the focus is on creating a tool that’s clear, direct, and fun
            to use.
          </p>
          <p>
            The calculator balances simplicity with accuracy. While no tool can
            account for every detail in nature, it provides a dependable estimate
            that makes storm watching more exciting without overcomplicating things.
          </p>
          <p>
            <strong>Important:</strong> This tool should never replace safety
            precautions. If there’s any risk, always follow the advice of local
            weather authorities.
          </p>
        </section>

        <section id="approach">
          <h2>My Approach and Philosophy</h2>
          <p>
            Building this site has been about more than writing code. It’s been about
            sharing the experience of watching a storm unfold. Lightning inspires
            both respect and wonder, and I wanted to design a tool that reflects
            both. The calculator handles the numbers quietly in the background,
            leaving you free to focus on the storm itself.
          </p>
          <p>
            I believe tools like this help people connect more deeply with the world
            around them. Whether you’re teaching your kids about weather, sharing a
            summer storm with friends, or making decisions while outdoors, the
            calculator is built to be both practical and enjoyable.
          </p>
        </section>

        <section id="outdoors">
          <h2>My Connection to the Outdoors</h2>
          <p>
            My interest in weather is closely tied to my love of the outdoors.
            Camping, hiking, and fishing have been a big part of my life, and storms
            are constant reminders of nature’s power. That connection fuels both my
            respect for lightning and my curiosity to understand it better. What
            started as a childhood habit has carried into adulthood, and now I get to
            share it with others through this site.
          </p>
        </section>

        <section id="closing">
          <h2>Closing Thoughts</h2>
          <p>
            <strong>LightningDistanceCalculator.com</strong> was created to make
            storm watching easier, more interactive, and more enjoyable. My journey
            with lightning began on quiet summer nights, grew through unforgettable
            experiences, and led me to build a tool for others who share the same
            fascination. I still continue the tradition of storm watching today, and
            I hope this site gives you the same sense of clarity, respect, and wonder
            that it gives me.
          </p>
          <p>
            Thank you for visiting, and I hope you find the{" "}
            <strong>Lightning Distance Calculator</strong> both helpful and
            engaging.
          </p>
        </section>
      </article>
    </main>
  );
}
