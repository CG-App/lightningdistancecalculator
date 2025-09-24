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

          <p>Hello, my name is Colton, I am the creator of <strong>LightningDistanceCalculator.com</strong>.</p>

          <p>My fascination with lightning began when I was a kid, and it has never faded.</p>

          <p>I can still picture myself on warm summer nights sitting out on the porch, watching the sky split open with flashes of light and listening to thunder roll across the horizon.</p>

          <p>Even today, when a storm moves in, I find myself stepping outside, pulled back into that same sense of awe and curiosity I felt as a child.</p>

          <p>Back then I learned a simple trick: counting the seconds between the flash of lightning and the rumble of thunder to figure out how far away the strike was.</p>

          <p>That little method became a tradition for me, something I still do, only now I have built a tool that takes it further and makes it easier for others to enjoy too.</p>

          <p>As I grew older, storms became more than just fascinating to watch. One unforgettable night, a thunderstorm turned dangerous when lightning struck my neighbor’s house.</p>

          <p>The bolt hit the peak above their garage and set off a fire that spread quickly, bringing the fire department racing in to put it out.</p>

          <p>The thunder that night was deafening, and the memory of those booms has stayed with me ever since.</p>

          <p>That experience gave me a lasting respect for how unpredictable and powerful lightning can be.</p>
        </section>

        <section>
          <h2>Why I Built Lightning Distance Calculator</h2>

          <p>Those experiences eventually led me to create <strong>LightningDistanceCalculator.com</strong>.</p>

          <p>I wanted something more than the old count-in-your-head method.</p>

          <p>I wanted a tool that was interactive, accurate, and fun to use.</p>

          <p>This site is the result, a place for anyone who shares my love of storms and wants a clearer way to know how far off the lightning really is.</p>

          <p>From the beginning this has been a passion project. It grew out of my lifelong curiosity about storms and my drive to build something simple and reliable.</p>

          <p>There are plenty of weather apps out there, but I wanted this one to be different, dedicated, straightforward, and made specifically for storm enthusiasts.</p>
        </section>

        <section>
          <h2>What You Can Expect Here</h2>

          <p>The heart of this site is simple: making storm watching more engaging.</p>

          <p>Whether you are sitting on the porch, camping in the woods, fishing by a lake, or hiking in the backcountry, this calculator gives you an easy way to track lightning in real time.</p>

          <p>It has an educational angle too, but the focus is on creating a direct, interactive experience.</p>

          <p>I built the tool to be accurate without being complicated. While no method can account for every factor, the calculator provides a dependable estimate.</p>

          <p>It adds clarity to storm watching without taking away the thrill.</p>

          <blockquote>
            <p><strong>Important:</strong> It should never replace real safety decisions. If safety is at stake, always follow the guidance of your local weather authorities.</p>
          </blockquote>
        </section>

        <section>
          <h2>My Approach and Philosophy</h2>

          <p>For me, building this site was not just about writing code, it was about sharing the feeling I get when storms roll in.</p>

          <p>Lightning inspires wonder and respect, and I wanted to design something that captures that moment.</p>

          <p>The calculator lets you stay focused on the storm while it quietly handles the numbers.</p>

          <p>I believe tools like this help people connect more deeply with nature.</p>

          <p>Whether you are teaching your kids about weather, sitting outside during a summer storm, or deciding if it is time to head inside while camping, the calculator has a place.</p>

          <p>It is meant to make storm watching both fun and useful.</p>
        </section>

        <section>
          <h2>My Connection to the Outdoors</h2>

          <p>My interest in weather also comes from my love of the outdoors.</p>

          <p>Camping, hiking, and fishing have always been part of my life, and storms remind me of just how powerful nature really is.</p>

          <p>That connection fuels both my respect for lightning and my curiosity to understand it better.</p>

          <p>Carrying forward the tradition I began as a kid, I still step outside to watch storms today, and now I get to share that same experience with others through this site.</p>
        </section>

        <section>
          <h2>Closing Thoughts</h2>

          <p><strong>LightningDistanceCalculator.com</strong> was created to make storm watching more interactive and enjoyable.</p>

          <p>My journey with lightning stretches from childhood evenings on the porch, to witnessing the destructive force of a strike firsthand, to building this tool for others who share the same fascination.</p>

          <p>I continue the tradition of storm watching today, and my hope is that this site gives you the same sense of wonder and clarity that has stayed with me all these years.</p>

          <p>Thank you for being here, and I hope you find the <strong>Lightning Distance Calculator</strong> both useful and enjoyable.</p>
        </section>
      </article>
    </main>
  );
}
