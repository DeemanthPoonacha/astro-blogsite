import { Author, db, Post } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Author).values([
    {
      id: "1",
      username: "author-1",
      name: "Author 1",
      bio: `
I'm a passionate automobile enthusiast with a deep love for all things automotive. Ever since I was a kid, I've been fascinated by the roar of engines, the sleek lines of classic cars, and the thrill of hitting the open road.

I've spent countless hours tinkering under the hood, learning the ins and outs of how cars work, and I wouldn't have it any other way. From restoring vintage beauties to test-driving the latest models, I've done it all, and I'm always hungry for more.

Through my blog, I aim to share my love for automobiles with fellow enthusiasts like you. Whether it's sharing maintenance tips, reviewing the hottest new releases, or reminiscing about classic rides, I'm here to offer insights and stories that will fuel your passion for cars.

When I'm not behind the wheel or elbow-deep in grease, you can find me at car shows, swapping stories with fellow gearheads, or planning my next road trip adventure. Cars aren't just a hobby for me – they're a way of life, and I'm excited to share that journey with you.

Follow along on my automotive adventures on <a href="https://www.twitter.com/" target="_blank">twitter</a> and <a href="https://instagram.com/" target="_blank">Instagram</a>. Let's hit the road together!
`,
      title: "Automobile Enthusiast",
      image: {
        src: "/@fs/home/deemanth/repos/personal/astro-blog/src/content/posts/images/logo.png?origWidth=159&origHeight=224&origFormat=png",
        width: 159,
        height: 224,
        format: "png",
      },
      socialLinks: [
        { platform: "twitter", link: "https://twitter.com" },
        { platform: "instagram", link: "https://instagram.com" },
      ],
      email: "",
      createdAt: new Date("2025-01-01"),
    },
    {
      id: "2",
      username: "deemanth-poonacha",
      name: "Deemanth Poonacha",
      bio: `
I'm a passionate software engineer and tech enthusiast. I've always been fascinated by the ever-evolving world of technology and love to stay updated on the latest trends and innovations in the industry. With a solid background in computer science and years of hands-on experience in software development, I bring a unique perspective to the realm of technology blogging.

My journey in tech is fueled by a relentless curiosity to understand how things work and a strong desire to share my knowledge with others. I thoroughly enjoy crafting informative and engaging articles on a diverse range of tech-related topics. My goal is to provide valuable insights and practical advice that resonate with tech enthusiasts of all levels.

When I'm not immersed in coding or writing, you'll often find me exploring the great outdoors, or unwinding with the latest sci-fi movies and TV shows. My passion for learning knows no bounds, and I'm always eager to connect with like-minded individuals who share my enthusiasm for innovation and creativity.

Connect with me on <a href="https://www.linkedin.com/in/deemanth-poonacha" target="_blank">LinkedIn</a> and follow me on <a href="https://instagram.com/deemanth_poonacha" target="_blank">Instagram</a>. Let's embrace the endless possibilities and celebrate the magic of innovation and creativity.
`,
      title: "Software Engineer",
      //   image: {
      //     src: "/@fs/home/deemanth/repos/personal/astro-blog/src/content/posts/images/logo.png?origWidth=159&origHeight=224&origFormat=png",
      //     width: 159,
      //     height: 224,
      //     format: "png",
      //   },
      socialLinks: [
        {
          platform: "linkedin",
          link: "https://www.linkedin.com/in/deemanth-poonacha",
        },
        {
          platform: "twitter",
          link: "https://www.twitter.com/deemanthpoonach",
        },
        {
          platform: "instagram",
          link: "https://instagram.com/deemanth_poonacha",
        },
      ],
      email: "deemanthpoonacha@gmail.com",
      createdAt: new Date("2025-01-01"),
    },
  ]);

  await db.insert(Post).values([
    {
      id: "1",
      title: "Car Maintenance Tips and Guides",
      slug: "car-maintenance-tips-and-guides",
      authorId: "1",
      tags: ["automobile", "guide"],
      publishedAt: new Date("2025-01-03"),
      createdAt: new Date("2025-01-03"),
      updatedAt: new Date("2025-01-28"),
      content: `
Maintaining your car isn't just about preserving its appearance; it's about safeguarding its performance, reliability, and safety. Regular maintenance helps identify potential issues early on, preventing costly repairs down the line. By staying proactive with upkeep, you not only extend the lifespan of your vehicle but also ensure optimal fuel efficiency and minimize the risk of breakdowns. From routine checks on fluid levels to timely replacements of worn-out components, each maintenance task plays a vital role in keeping your car running smoothly. So, instead of waiting for problems to arise, invest in regular maintenance to enjoy worry-free driving and peace of mind on the road.

In this blog post, we'll walk you through a basic car maintenance checklist to ensure your vehicle stays in optimal condition. From checking fluid levels to replacing brake pads, we've got you covered with step-by-step DIY tutorials for common maintenance tasks. Plus, don't miss our seasonal maintenance tips to prepare your car for any weather condition. Let's dive in and keep your car running smoothly year-round!

## Basic Car Maintenance Checklist

Regular maintenance is crucial for keeping your car running smoothly and prolonging its lifespan. Here's a basic car maintenance checklist to help you stay on top of essential tasks:

1. **Check Fluid Levels**:

   - Engine oil: Ensure oil levels are adequate and top up if necessary.
   - Coolant: Check coolant levels and top up if needed to prevent overheating.
   - Brake fluid: Inspect brake fluid levels and top up if below the recommended level.
   - Transmission fluid: Check transmission fluid levels according to the manufacturer's instructions.

2. **Inspect Tires**:

   - Tire pressure: Check tire pressure regularly using a pressure gauge and adjust as needed. Proper tire pressure ensures optimal fuel efficiency and tire longevity.
   - Tire tread depth: Inspect tire tread depth and look for signs of uneven wear. Replace tires if tread depth is below the recommended level or if there are signs of damage.

3. **Test Lights and Signals**:

   - Headlights, taillights, brake lights, and turn signals: Test all lights to ensure they are working correctly. Replace any bulbs that are burnt out or dim.

4. **Inspect Brakes**:

   - Brake pads and discs: Check brake pads for wear and tear. If brake pads are worn down or if there are signs of brake disc damage, replace them promptly to maintain braking performance and safety.

5. **Check Battery**:

   - Battery terminals: Inspect battery terminals for corrosion and clean if necessary.
   - Battery voltage: Test battery voltage using a multimeter to ensure it's within the recommended range. Replace the battery if it's old or if voltage levels are low.

6. **Inspect Belts and Hoses**:

   - Serpentine belt: Check serpentine belt for signs of wear and replace if necessary.
   - Coolant hoses: Inspect coolant hoses for leaks, cracks, or bulges. Replace any damaged hoses to prevent coolant leaks.

7. **Replace Air Filters**:
   - Engine air filter: Replace the engine air filter according to the manufacturer's recommended interval to ensure optimal engine performance and fuel efficiency.
   - Cabin air filter: Replace the cabin air filter to maintain clean air quality inside the vehicle.

## Seasonal Maintenance Tips

Preparing your car for changing seasons is essential for ensuring safe driving and preventing weather-related issues. Here are some seasonal maintenance tips:

1. **Winter Preparation**:

   - Check antifreeze levels and ensure the coolant mixture is suitable for cold temperatures.
   - Inspect the battery and replace it if it's old or weak.
   - Check tire tread depth and consider switching to winter tires for improved traction.
   - Replace windshield wipers and fill washer fluid reservoir with winter-grade fluid.
   - Pack an emergency kit with essentials like a flashlight, blanket, and shovel.

2. **Summer Maintenance**:
   - Check coolant levels and ensure the cooling system is functioning correctly to prevent overheating.
   - Inspect the air conditioning system and recharge refrigerant if needed.
   - Check tire pressure regularly, as hot weather can cause tire pressure to fluctuate.
   - Clean and wax the exterior of the car to protect the paint from UV damage.

## DIY Maintenance Tutorials

Performing basic car maintenance tasks yourself can save you time and money. Here are step-by-step DIY tutorials for common maintenance tasks:

1. **Changing Oil**:

   - Gather necessary tools and materials: oil filter, new engine oil, oil drain pan, wrench, oil filter wrench.
   - Lift the car using a jack and secure it with jack stands.
   - Locate the oil drain plug and oil filter underneath the car.
   - Place the oil drain pan beneath the drain plug and loosen the plug using a wrench.
   - Drain the old oil into the pan and remove the old oil filter using an oil filter wrench.
   - Install a new oil filter and tighten it by hand.
   - Replace the oil drain plug and pour in the new engine oil.
   - Lower the car and check the oil level using the dipstick.
   - Dispose of the old oil responsibly at a recycling center.

2. **Replacing Brake Pads**:
   - Gather necessary tools and materials: new brake pads, brake caliper tool, brake cleaner, wrench, jack, jack stands.
   - Lift the car and secure it with jack stands.
   - Remove the wheels to access the brake calipers.
   - Use a brake caliper tool to retract the caliper piston.
   - Remove the caliper bolts and slide out the old brake pads.
   - Clean the caliper and rotor with brake cleaner.
   - Install the new brake pads and reassemble the caliper.
   - Replace the wheels and lower the car.
   - Pump the brake pedal to restore brake pressure.

By following this car maintenance checklist and DIY tutorials, you can keep your vehicle in top condition year-round and minimize the risk of unexpected breakdowns. Remember to consult your car's owner's manual and seek professional assistance if you're unsure about any maintenance tasks.

In conclusion, regular car maintenance is not just a chore; it's a responsibility that ensures the longevity and efficiency of your vehicle. By adhering to a maintenance schedule and addressing issues promptly, you not only save money in the long run but also guarantee a safer and more enjoyable driving experience. Whether it's checking fluid levels, replacing worn-out parts, or preparing for seasonal changes, each maintenance task contributes to the overall health and performance of your car. So, make maintenance a priority, and reap the rewards of a well-maintained vehicle for years to come.
`,
      description:
        "Discover a handy checklist, seasonal tips, and easy DIY tutorials to tackle basic maintenance tasks and ensure smooth driving year-round!",
      status: "published",
      featured: true,
      image: {
        src: "/@fs/home/deemanth/repos/personal/astro-blog/src/content/posts/images/car-maintenance.jpg",
        format: "jpg",
      },
    },
    {
      id: "2",
      title: "Things to Consider Before Buying a Car",
      slug: "things-to-consider-before-buying-a-car",
      authorId: "1",
      tags: ["automobile", "guide"],
      publishedAt: new Date("2025-01-05"),
      createdAt: new Date("2025-01-05"),
      updatedAt: new Date("2025-01-07"),
      content: `
# Things to Consider Before Buying a Car`,
      description:
        "Detailed buying guide tailored for both new and used cars to equip you with the knowledge needed to make savvy car purchasing decisions!",
      status: "published",
      featured: true,
      image: {
        src: "/@fs/home/deemanth/repos/personal/astro-blog/src/content/posts/images/new-car.jpg",
        format: "jpg",
      },
    },
    {
      id: "3",
      title: "Enhancing Safety: Modern Technology Features in Cars",
      slug: "enhancing-safety-modern-technology-features-in-cars",
      authorId: "2",
      tags: ["automobile", "technology"],
      publishedAt: new Date("2025-01-02"),
      createdAt: new Date("2025-01-02"),
      updatedAt: new Date("2025-01-02"),
      content: `
# Enhancing Safety: Modern Technology Features in Cars`,
      description:
        "Unlock the potential of modern technology to enhance safety in cars, from advanced sensors to advanced safety features.",
      status: "published",
      featured: true,
      image: {
        src: "/@fs/home/deemanth/repos/personal/astro-blog/src/content/posts/images/car-tech.jpg",
        format: "jpg",
      },
    },
    {
      id: "4",
      title: "Crafting a Winning Resume: Your Ticket to Career Success",
      slug: "crafting-a-winning-resume-your-ticket-to-career-success",
      authorId: "2",
      tags: ["carrer advice", "guide"],
      publishedAt: new Date("2025-01-01"),
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-01-01"),
      content: `
# Crafting a Winning Resume: Your Ticket to Career Success`,
      description:
        "Unlock the potential of modern technology to enhance safety in cars, from advanced sensors to advanced safety features.",
      status: "published",
      featured: true,
      image: {
        src: "/@fs/home/deemanth/repos/personal/astro-blog/src/content/posts/images/resume.jpg",
        format: "jpg",
      },
    },
  ]);
}
