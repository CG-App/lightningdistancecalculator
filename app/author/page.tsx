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

        <section>
          <h2>Meet Colton</h2>

          <p>
            My name is Colton, and I am the creator of <strong>LightningDistanceCalculator.com</strong>. My fascination with lightning began when I was young, and it has only grown stronger over the years. I can still recall occasional summer evenings spent on the porch, watching the sky erupt with light and feeling the ground shake as thunder &amp; lightning rolled across the sky. Even now, when storms move in, I find myself outside again, drawn to that same awe and curiosity that captured me as a child.
          </p>

          <p>
            As a boy, I discovered the simple method of counting the seconds between the flash of lightning and the boom of thunder to estimate distance. That trick became a tradition, something I practiced time and again. Today, I have taken that practice a step further by creating a tool that makes the process more accurate, intuitive, and engaging for anyone who shares the same fascination.
          </p>

          <p>
            My respect for storms deepened one unforgettable night. A powerful bolt of lightning struck my neighbor’s home, igniting a fire that raced through the upper level and forced the fire department into action. The thunder was overwhelming that night, shaking the neighborhood with  force. That night left a lasting impression on me and reinforced how unpredictable and dangerous lightning storms can be.
          </p>
        </section>

        <section>
          <h2>Why I Built Lightning Distance Calculator</h2>

          <p>
            Those experiences led me to create <strong>LightningDistanceCalculator.com</strong>. The old method of counting seconds in your head was useful, but I wanted something more. I envisioned a tool that was interactive, accurate, and enjoyable to use. This site is the result — designed for people who share a passion for storms and want a reliable way to measure their distance.
          </p>

          <p>
            From the beginning, this has been a passion project. It grew out of a lifelong curiosity about thunderstorms and a determination to build something simple yet effective. Many weather apps exist, but I wanted this one to stand apart — dedicated, streamlined, and created specifically for storm enthusiasts.
          </p>
        </section>

        <section>
          <h2>What You Can Expect Here</h2>

          <p>
            The purpose of this site is straightforward: to make storm watching more engaging. Whether you are relaxing on the porch, camping in the woods, fishing by the lake, or hiking in the mountains, this calculator gives you a clear way to track lightning in real time. While it has an educational side, its true aim is to provide an immediate, interactive connection with storms.
          </p>

          <p>
            The calculator is designed to balance accuracy with simplicity. No tool can account for every factor in nature, but this one provides a dependable estimate that enhances the experience of storm watching without losing its thrill.
          </p>

          <p>
            That said, this calculator should never replace safety decisions. When safety is on the line, always follow the guidance of your local weather authorities.
          </p>
        </section>

        <section>
          <h2>My Approach and Philosophy</h2>

          <p>
            Building this site was about more than writing code; it was about capturing the feeling I experience when storms roll in. Lightning commands both wonder and respect, and I wanted to design a tool that reflects that balance. The calculator allows you to stay immersed in the storm while it handles the details quietly in the background.
          </p>

          <p>
            I believe tools like this strengthen our connection to nature. Whether you are teaching your children about weather, sitting through a summer storm with friends, or making decisions while outdoors, this calculator has a role to play. It makes storm watching both enjoyable and practical.
          </p>
        </section>

        <section>
          <h2>My Connection to the Outdoors</h2>

          <p>
            My love for weather is closely tied to my love of the outdoors. Camping, hiking, and fishing have always been important parts of my life, and storms are constant reminders of nature’s raw power. That bond fuels both my respect for lightning and my desire to understand it more deeply. The tradition I began as a child continues today, only now I share that same experience with others through this site.
          </p>
        </section>

        <section>
          <h2>Closing Thoughts</h2>

          <p>
            <strong>LightningDistanceCalculator.com</strong> was created to make storm watching more meaningful and engaging. My journey with lightning began with childhood nights on the porch, carried through moments of witnessing its destructive force, and led to building a tool for others who share this fascination. I continue the tradition of storm watching today, and my hope is that this site gives you the same sense of clarity, respect, and wonder that has stayed with me all these years.
          </p>

          <p>
            Thank you for visiting, and I hope you find the <strong>Lightning Distance Calculator</strong> both practical and useful.
          </p>
        </section>
      </article>
    </main>
  );
}
