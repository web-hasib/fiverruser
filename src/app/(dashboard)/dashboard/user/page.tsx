import Container from "@/src/components/Container";
import Heading from "@/src/components/Heading";

const UserDashboardPage = () => {
  const content = [
    "No one leaves home unless home is the mouth of a shark. You only run for the border when you see the whole city running as well. The boy you went to school with, who kissed you dizzy behind the old tin factory, is holding a gun bigger than his body. You only leave home when home won’t let you stay.",
    "No one would leave home unless home chased you. It’s not something you ever thought about doing, so when you did, you carried the anthem under your breath, waiting until the airport toilet to tear up the passport and swallow, each mournful mouthful making it clear you would not be going back.",
    "No one puts their children in a boat, unless the water is safer than the land. No one would choose days and nights in the stomach of a truck, unless the miles travelled meant something more than journey.",
    "No one would choose to crawl under fences, beaten until your shadow leaves, raped, forced off the boat because you are darker, drowned, sold, starved, shot at the border like a sick animal, pitied. No one would choose to make a refugee camp home for a year or two or ten, stripped and searched, finding prison everywhere.",
    "And if you were to survive, greeted on the other side— Go home Blacks, dirty refugees, sucking our country dry of milk, dark with their hands out, smell strange, savage, look what they’ve done to their own countries, what will they do to ours? The insults are easier to swallow than finding your child’s body in the rubble.",
    "I want to go home, but home is the mouth of a shark. Home is the barrel of a gun. No one would leave home unless home chased you to the shore. No one would leave home until home is a voice in your ear saying— leave, run, now. I don’t know what I’ve become.",
    "II",
    "I don’t know where I’m going. Where I came from is disappearing. I am unwelcome. My beauty is not beauty here. My body is burning with the shame of not belonging, my body is longing. I am the sin of memory and the absence of memory.",
    "I watch the news and my mouth becomes a sink full of blood. The lines, forms, people at the desks, calling cards, immigration officers, the looks on the street, the cold settling deep into my bones, the English classes at night, the distance I am from home.",
    "Alhamdulillah, all of this is better than the scent of a woman completely on fire, a truckload of men who look like my father— pulling out my teeth and nails. All these men between my legs, a gun, a promise, a lie, his name, his flag, his language, his manhood in my mouth.",
  ];

  return (
    <Container>
      <Heading
        title="Welcome back, Dr. Saifur"
        subtitle="Manage your profile and track your progress here."
      />
      <div className="space-y-4 text-muted-foreground leading-relaxed mt-6">
        {content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Container>
  );
};

export default UserDashboardPage;
