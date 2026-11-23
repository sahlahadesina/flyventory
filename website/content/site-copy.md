# Flyventory site copy (draft v1)

Draft written from our pitch deck. Edit freely: this file is the single source of truth for the site.
Lines marked [CONFIRM] are guesses or need a team decision before launch.

---

## Meta

- Title: Flyventory | Drone inventory checks for warehouses
- Description: Flyventory drones scan barcodes and QR codes across your racks and staging area, check what's there against what should be, and log the results. No ladders, no forklifts.

---

## Header

- Nav: How it works · Use cases · Roadmap · Team · FAQ
- Button: Join the pilot list

---

## Hero

- Eyebrow: DRONE INVENTORY CHECKS
- Headline: Check every pallet without climbing a single rack.
- Subheadline: Flyventory is a drone and software system for warehouses. It reads barcodes and QR codes on cartons, checks each code against your expected stock list, and marks every item Found or Missing with its shelf location on one dashboard.
- Primary button: Join the pilot list
- Secondary button: Watch it work (scrolls to the demo)
- Media: demo video or detection screenshot from `public/media/` (TODO: real footage)

---

## The problem

Section title: Inventory checks are still done by hand.

1. **Slow and expensive.** Manual counts take people off other work, cause downtime, and push labor costs up.
2. **Risky at height.** Checking high racks means ladders, lifts and forklifts, which raises the risk of accidents.
3. **Easy to get wrong.** Tired people miss labels, miscount boxes and log the wrong location. Those errors show up later as stock that "should" be there but isn't.

---

## How it works

Section title: From flight to dashboard in five steps.

1. **Pilot.** Our team flies the drone along the aisle or over the staging area.
2. **Scan.** The onboard camera reads barcodes and QR codes on boxes and pallets.
3. **Verify.** The software checks each code against your expected stock list and marks the item Found or Missing.
4. **Log.** Results are saved automatically, with location and time.
5. **Display.** Your team sees what's found and what's missing on a dashboard.

Note under the steps: Today our team flies the drone. Autonomous flight is in development (see Roadmap).

Block under the steps: Your side / Our side

Our side:
- We bring the drone and fly it.
- We measure the read rate on your own inventory and share it with you.

Your side:
- Access to the area during an agreed time window.
- Your expected stock list.

---

## Use cases

Section title: Where Flyventory fits.

**Put-away and storage** (our first focus)
- Empty location checks
- Item and location verification
- Finding a specific SKU or package

**Staging area** (next)
Goods arrive, get unloaded and wait in staging before put-away. That's where receiving errors slip through. Flyventory will check:
- SKU: wrong products received
- Labels: missing or incorrect labels
- Records: physical stock vs. what your system says

---

## What we've built

Section title: Working today.

- Built on a Holybro X500 V2 frame: Pixhawk flight controller running PX4, NVIDIA Jetson Orin Nano onboard computer, ELP 16MP camera
- Real-time barcode and QR code detection
- Each code checked against your expected stock list
- Package condition detection (prototype): a model that flags damaged cartons in test images, not yet validated for real use
- Inventory dashboard with found and missing items

Performance line: We're running a lab test that measures read rate, false reads, time per pass and flight time per battery. We're publishing results from our lab tests soon. During a pilot, we measure the read rate on your own inventory and share it with you.

Block beside "Working today": What it needs

Tested:
- Indoors, in a university lab
- Stacked cartons
- Normal indoor lighting

Not tested yet:
- Dim areas
- Glare from shrink-wrap
- Labels facing away from the aisle

Line: Testing these conditions in a real warehouse is the purpose of the pilot.

Media slots: detection screenshot, drone photo, dashboard screenshot (TODO: real images)

---

## Roadmap

Section title: What's next.

Label every item "In development".

- **Autonomous navigation.** The drone flies set routes and finds specific locations on its own.
- **WMS integration.** Results go straight into the warehouse management system you already use.
- **Off-the-shelf drone support.** Run Flyventory software on commercial drones, not only our own build.
- **Propeller guards.** Protective guards for safer flight around people and racks.
- **Package condition detection.** Taking our prototype to a production-ready check.

---

## Team

Section title: The team.

Line: We're a Khalifa University team building Flyventory through the KUEC Incubator.

Cards (TODO: photos, LinkedIn):
- Dr. Reyad El-Khazali, Faculty advisor
- Omar Yousef, Engineering & Software
- Nour Abed Alhaq, Business & Industry Relations
- Sahlah Adesina, Business & Industry Relations
- Maha Alhammadi, Business & Industry Relations
- Rahika Roza, Engineering & Software

---

## FAQ

**Who flies the drone?**
During testing and pilots, our team flies the drone. Autonomous flight, which removes the need for an operator, is on our roadmap.

**How do you make sure every label is read?**
We're testing how to confirm every label was read: comparing results with your latest inventory count and with saved camera footage. We'll share the accuracy we measure.

**Do we need to change our systems?**
No. During a pilot, results show on our dashboard. Direct WMS integration is on our roadmap.

**Is it safe to fly indoors around people?**
We fly in controlled areas during agreed time windows and are developing propeller guards for extra protection. [CONFIRM: team to agree on safety wording]

**What does a pilot involve?**
Pilots open in a later phase. When they do, our team brings and flies the drone. You give us access to the area during an agreed time window, and your expected stock list. We measure the read rate on your own inventory and share it with you. [CONFIRM: length, cost]

**What conditions does it work in?**
So far we've tested indoors, in a university lab, on stacked cartons under normal indoor lighting. We haven't yet tested dim areas, glare from shrink-wrap, or labels facing away from the aisle. Testing these conditions in a real warehouse is the purpose of the pilot.

---

## Pilot call to action

- Title: Join the pilot list.
- Text: Pilots open in a later phase. Add your warehouse to the list and we'll contact you when they start.
- Success message: You're on the pilot list. Thank you. We'll contact you at the email address you gave when pilots open.
- Form fields: Name, Company, Role, Work email, Phone (optional), Warehouse location, Message
- Button: Join the pilot list
- Form: TODO (Tally or Formspree embed)

---

## Footer

- Logo (white horizontal on navy)
- Line: Smart drones. Smarter warehouses.
- Links: How it works · Use cases · Team · Contact · Privacy
- Contact email: TODO (e.g. hello@getflyventory.com)
- Location: Abu Dhabi, UAE
- © 2026 Flyventory
