import { Author, db, Post } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.delete(Post);
  await db.delete(Author);

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
        src: "/images/logo.png",
        width: 159,
        height: 224,
        format: "png",
      },
      socialLinks: [
        { platform: "twitter", link: "https://twitter.com" },
        { platform: "instagram", link: "https://instagram.com" },
      ],
      email: "author-1@example.com",
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
      //     src: "/images/logo.png",
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
        src: "/images/blog_cover/car-maintenance.jpg",
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
Embark on an exciting journey through detailed buying guides, crafted to equip you with the knowledge needed to make savvy car purchasing decisions! Delve into expert tips and must-have checklists tailored for both new and seasoned buyers alike. Whether you're eyeing the latest models or considering the allure of pre-owned vehicles, this blog post unravels the complexities of car buying with clarity and insight. Get ready to navigate the automotive landscape with confidence and make your dream car a reality!

## Tips for Buying a New Car

Buying a new car can be an exciting yet overwhelming experience. With numerous options available, it's essential to approach the process with careful consideration and research. Here are some tips to guide you through the process of buying a new car:

1. **Set a Budget**: Determine your budget range before starting your search. Consider factors like monthly payments, insurance costs, and ongoing expenses like fuel and maintenance.

2. **Research Models**: Research different car models that fit your budget and requirements. Consider factors like fuel efficiency, safety features, reliability, and resale value.

3. **Test Drive**: Schedule test drives for the cars you're interested in to evaluate their performance, comfort, and handling. Pay attention to features like acceleration, braking, and maneuverability.

4. **Compare Prices**: Compare prices from multiple dealerships to ensure you're getting the best deal. Don't forget to negotiate for discounts, incentives, and financing options.

5. **Check Reviews**: Read reviews from automotive experts and real customers to gain insights into the pros and cons of each car model. Look for common issues and complaints to make an informed decision.

6. **Inspect Warranty and Service Plans**: Review warranty coverage and service plans offered by the manufacturer. Understand what's included and consider purchasing extended warranties for added peace of mind.

## Used Car Buying Guide and Checklist

Buying a used car can offer significant cost savings, but it's essential to proceed with caution to avoid potential pitfalls. Here's a comprehensive checklist to help you navigate the process of buying a used car:

1. **Set Criteria**: Determine your criteria for a used car, including budget, make, model, mileage, and desired features.

2. **Vehicle History Check**: Obtain the vehicle identification number (VIN) and run a comprehensive vehicle history report to check for accidents, title issues, and odometer discrepancies.

3. **Mechanical Inspection**: Hire a qualified mechanic to conduct a thorough inspection of the used car. Inspect the engine, transmission, brakes, suspension, and other critical components for signs of wear and damage.

4. **Test Drive**: Take the used car for a test drive to assess its overall condition and performance. Pay attention to unusual noises, vibrations, and warning lights.

5. **Negotiate Price**: Research the fair market value of the used car and negotiate the price with the seller based on its condition, mileage, and market demand.

6. **Review Documentation**: Review all documentation related to the used car, including title, registration, service records, and warranty information. Ensure everything is in order before finalizing the purchase.

## Factors to Consider When Purchasing a Specific Type of Vehicle

Choosing the right type of vehicle requires careful consideration of your lifestyle, preferences, and specific needs. Here are some factors to consider when purchasing a specific type of vehicle:

## Compact or Subcompact Car:

- **Affordability**: Compact and subcompact cars are often priced competitively, making them an economical choice for budget-conscious buyers. Compare prices across different models to find the best deal within your budget.

- **Fuel Efficiency**: Look for compact or subcompact cars with excellent fuel economy ratings. These vehicles are typically designed for efficient city driving, helping you save money on fuel costs over time.

- **Reliability**: Research the reliability ratings and customer reviews for different compact and subcompact car models. Choose a vehicle with a reputation for durability and longevity to minimize the risk of unexpected repairs.

- **Practicality**: Consider the practicality of the compact or subcompact car for your daily needs. Evaluate factors like seating capacity, cargo space, and interior amenities to ensure it meets your lifestyle requirements.

- **Safety Features**: Look for compact or subcompact cars equipped with advanced safety features like airbags, stability control, and collision avoidance systems. Prioritize vehicles with high safety ratings to protect yourself and your passengers on the road.

- **Maintenance Costs**: Estimate the long-term maintenance costs associated with owning a compact or subcompact car. Consider factors like routine maintenance, repairs, and insurance premiums to budget accordingly.

- **Resale Value**: Research the resale value of different compact and subcompact car models to assess their depreciation rates over time. Choose a vehicle with strong resale value to maximize your return on investment when it's time to sell or trade-in.

## SUV:

- **Size and Space**: Consider the size of the SUV based on your passenger and cargo needs. Evaluate seating capacity, legroom, and cargo space to ensure it meets your requirements.

- **Fuel Efficiency**: Compare fuel efficiency ratings of different SUV models to find one that offers a balance between performance and fuel economy.

- **Safety Features**: Look for advanced safety features like adaptive cruise control, lane departure warning, and automatic emergency braking to enhance safety on the road.

### Sports Car:

- **Performance**: Assess the performance metrics of the sports car, including horsepower, acceleration, and handling. Consider your driving habits and preferences for spirited driving experiences.

- **Design and Style**: Evaluate the design and style of the sports car, including exterior aesthetics and interior features. Choose a sports car that resonates with your personal taste and reflects your lifestyle.

- **Cost and Maintenance**: Consider the cost of ownership for a sports car, including insurance premiums, maintenance expenses, and potential repairs. Research the reliability and longevity of the sports car model to make an informed decision.

### Hybrid Car:

- **Fuel Efficiency**: Evaluate the fuel efficiency of the hybrid car, considering factors like city and highway mpg ratings. Compare different hybrid models to find one that offers optimal fuel savings for your driving needs.
- **Battery Technology**: Research the battery technology used in the hybrid car, including battery capacity, lifespan, and warranty coverage. Understand the implications of battery replacement costs and maintenance requirements.
- **Driving Experience**: Test drive the hybrid car to assess its driving dynamics, including acceleration, braking, and handling. Consider how the hybrid system integrates with the vehicle's powertrain to deliver a smooth and responsive driving experience.

- **Charging Options**: Determine the charging options available for the hybrid car, including plug-in charging capabilities and regenerative braking systems. Evaluate the convenience and accessibility of charging stations in your area.

- **Cost of Ownership**: Calculate the total cost of ownership for the hybrid car, including purchase price, fuel costs, maintenance expenses, and potential tax incentives or rebates. Consider the long-term savings potential of owning a hybrid car compared to a traditional gasoline-powered vehicle.

- **Environmental Impact**: Assess the environmental benefits of owning a hybrid car, including reduced greenhouse gas emissions and lower reliance on fossil fuels. Consider the environmental footprint of the hybrid car throughout its lifecycle, from manufacturing to disposal.

### Electric Car:

- **Range and Charging Infrastructure**: Evaluate the range of the electric car and assess whether it meets your daily commuting needs. Consider the availability of charging stations in your area and the convenience of charging at home or work.

- **Battery Life and Warranty**: Review the battery life and warranty coverage offered by the manufacturer. Understand the terms and conditions of the battery warranty to ensure peace of mind.

- **Cost of Ownership**: Calculate the total cost of ownership, including purchase price, charging costs, and potential savings on fuel and maintenance. Consider available incentives and tax credits for electric vehicles to offset upfront costs.

## Conclusion

Navigating the process of buying a new or used car can be daunting, but with the right knowledge and preparation, you can make a confident and informed decision. Whether you're in the market for a brand-new vehicle or considering a specific type of vehicle like an SUV or an electric car, our comprehensive buying guides and checklists provide the tools you need to find the perfect car for your needs and budget. Happy car shopping!
`,
      description:
        "Detailed buying guide tailored for both new and used cars to equip you with the knowledge needed to make savvy car purchasing decisions!",
      status: "published",
      featured: true,
      image: {
        src: "/images/blog_cover/new-car.jpg",
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
        src: "/images/blog_cover/car-tech.jpg",
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
        "Explore the essential elements of crafting a winning resume, offering valuable tips and strategies to help you create a resume that gets noticed and gets results.",
      status: "published",
      featured: true,
      image: {
        src: "/images/blog_cover/resume.jpg",
        format: "jpg",
      },
    },
  ]);
}
