export type Program = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  style: string;
  daysPerWeek: number;
  durationMin: number;
  equipment: string;
  level: string;
  image: string;
  bestFor: string[];
};

export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  restSec: number;
  cue: string;
};

export type Workout = {
  id: string;
  weekday: number;
  title: string;
  focus: string;
  durationMin: number;
  coachingNote: string;
  exercises: Exercise[];
};

export type QuizAnswers = {
  goal: string;
  place: string;
  experience: string;
  days: string;
  time: string;
  style: string;
};

export const SITE = {
  name: "HSK Coaching",
  short: "HSK",
  domain: "hskcoaching.co.uk",
  url: "https://hskcoaching.co.uk",
  locale: "en_GB",
  language: "en-GB",
  city: "Coventry",
  region: "West Midlands",
  country: "United Kingdom",
  countryCode: "GB",
  geoRegion: "GB-COV",
  latitude: 52.4068,
  longitude: -1.5197,
  priceMonthly: "£29",
  priceYearly: "£249",
  description:
    "HSK Coaching is a Coventry personal training studio and online coaching practice. Daily strength programmes, written by one coach, for gym and home.",
  serviceAreas: [
    "Coventry",
    "West Midlands",
    "United Kingdom (online)",
  ],
};

export const COACH = {
  name: "HSK Coaching",
  first: "HSK",
  brand: "HSK Coaching",
  city: "Coventry",
  role: "Strength and conditioning coach",
  years: 14,
  line: "Expert coaching. A plan for every day.",
};

export const programs: Program[] = [
  {
    slug: "forged",
    name: "FORGED",
    tagline: "Maximize muscle size, symmetry, and definition.",
    description:
      "Classic bodybuilding structure with modern pacing. Five focused sessions a week so you add tissue without living in the gym.",
    style: "Hypertrophy",
    daysPerWeek: 5,
    durationMin: 50,
    equipment: "Full gym",
    level: "Intermediate",
    image: "/images/client-bench.jpg",
    bestFor: ["Build muscle", "Full gym", "45–60 min"],
  },
  {
    slug: "vitality",
    name: "VITALITY",
    tagline: "Energize body and mind with functional strength.",
    description:
      "Minimal kit, maximum return. Built for busy weeks — short sessions you can run from a hotel room or a quiet corner of the gym.",
    style: "Functional",
    daysPerWeek: 4,
    durationMin: 35,
    equipment: "Minimal",
    level: "All levels",
    image: "/images/dips-boxing.jpg",
    bestFor: ["Feel better", "Home", "30 min"],
  },
  {
    slug: "ascend",
    name: "ASCEND",
    tagline: "Build an athletic physique with classic strength work.",
    description:
      "Squat, hinge, press, pull. The fundamentals, programmed with intent so you get stronger every month — not just tired.",
    style: "Strength",
    daysPerWeek: 5,
    durationMin: 45,
    equipment: "Full gym",
    level: "Intermediate",
    image: "/images/marcus-kettle.jpg",
    bestFor: ["Get stronger", "Full gym", "45 min"],
  },
  {
    slug: "endure",
    name: "ENDURE",
    tagline: "Longevity and sustainable strength with dumbbells.",
    description:
      "Joints first, ego second. A dumbbell-only plan that builds real strength you can keep for decades.",
    style: "Longevity",
    daysPerWeek: 4,
    durationMin: 40,
    equipment: "Dumbbells",
    level: "Beginner+",
    image: "/images/dips-rower.jpg",
    bestFor: ["Longevity", "Home", "Beginner"],
  },
  {
    slug: "define",
    name: "DEFINE",
    tagline: "Sculpt a toned, lean body with strength and metabolic work.",
    description:
      "Thirty focused minutes. Strength paired with short finishers so you look athletic without living on a treadmill.",
    style: "Sculpt",
    daysPerWeek: 5,
    durationMin: 30,
    equipment: "Dumbbells + bodyweight",
    level: "All levels",
    image: "/images/client-swing.jpg",
    bestFor: ["Get lean", "30 min", "Home"],
  },
  {
    slug: "limitless",
    name: "LIMITLESS",
    tagline: "Heavy strength and conditioning for competitive athleticism.",
    description:
      "For people who want to be difficult to tire. Heavy compounds, honest conditioning, six days that demand you show up.",
    style: "Performance",
    daysPerWeek: 6,
    durationMin: 55,
    equipment: "Full gym",
    level: "Advanced",
    image: "/images/chalk.jpg",
    bestFor: ["Get stronger", "6 days", "Full gym"],
  },
];

function ex(
  name: string,
  sets: number,
  reps: string,
  restSec: number,
  cue: string,
): Exercise {
  return { name, sets, reps, restSec, cue };
}

const restDay = (slug: string, weekday: number, title: string): Workout => ({
  id: `${slug}-${weekday}`,
  weekday,
  title,
  focus: "Recovery",
  durationMin: 25,
  coachingNote:
    "Recovery is the session. Walk, breathe, and leave a little in the tank for tomorrow.",
  exercises: [
    ex("Easy walk", 1, "20 min", 0, "Nasal breathing. Keep it conversational."),
    ex("World's greatest stretch", 2, "5 / side", 30, "Long exhales. Don't rush the hip."),
    ex("Couch stretch", 2, "60s / side", 20, "Glute on, ribs down."),
    ex("Dead hang", 3, "20–40s", 45, "Shoulders active, then slowly relax into it."),
  ],
});

function week(
  slug: string,
  days: Array<Omit<Workout, "id" | "weekday">>,
): Workout[] {
  return days.map((d, i) => ({ ...d, id: `${slug}-${i}`, weekday: i }));
}

export const workoutsByProgram: Record<string, Workout[]> = {
  forged: week("forged", [
    {
      title: "Chest & triceps",
      focus: "Press",
      durationMin: 52,
      coachingNote: "Own the eccentric. If the last two reps are ugly, the weight is too heavy.",
      exercises: [
        ex("Barbell bench press", 4, "6–8", 150, "Plant your feet. Bar to mid-chest, not the neck."),
        ex("Incline dumbbell press", 3, "8–10", 90, "Soft bend at the top. Don't clang the bells."),
        ex("Weighted dip", 3, "8–10", 90, "Slight forward lean. Lock out without shrugging."),
        ex("Cable fly", 3, "12–15", 60, "Hug a barrel. Pause one second in the squeeze."),
        ex("Overhead cable extension", 3, "12–15", 60, "Elbows still. Only the forearm moves."),
        ex("Push-up finisher", 1, "AMRAP", 0, "Clean reps only. Stop one before form breaks."),
      ],
    },
    {
      title: "Back & biceps",
      focus: "Pull",
      durationMin: 50,
      coachingNote: "Pull with the elbows, not the hands. Leave your traps out of it.",
      exercises: [
        ex("Weighted pull-up", 4, "5–8", 150, "Chest to bar. Full hang at the bottom."),
        ex("Chest-supported row", 4, "8–10", 90, "Squeeze a pencil between the shoulder blades."),
        ex("Lat pulldown", 3, "10–12", 75, "Think elbows to hips."),
        ex("Straight-arm pulldown", 3, "12–15", 60, "Ribs down. Feel the lats, not the arms."),
        ex("Incline dumbbell curl", 3, "10–12", 60, "Shoulders pinned. Slow the lower."),
        ex("Hammer curl", 2, "12–15", 45, "Thumbs up. Don't swing."),
      ],
    },
    {
      title: "Legs",
      focus: "Squat & hinge",
      durationMin: 55,
      coachingNote: "Depth you can own. Heels heavy, knees tracking the toes.",
      exercises: [
        ex("Back squat", 4, "5–7", 180, "Brace first. Break at the hips and knees together."),
        ex("Romanian deadlift", 3, "8–10", 120, "Bar close. Soft knees. Hamstrings, not low back."),
        ex("Walking lunge", 3, "10 / leg", 90, "Long stride. Front heel owns the floor."),
        ex("Leg press", 3, "12–15", 75, "Don't lock out aggressively. Control the hole."),
        ex("Lying leg curl", 3, "12–15", 60, "Hips glued down. Pause at the top."),
        ex("Standing calf raise", 4, "12–15", 45, "Full stretch. Two-second squeeze."),
      ],
    },
    {
      title: "Shoulders & arms",
      focus: "Delts",
      durationMin: 45,
      coachingNote: "Small muscles, honest weights. Leave the ego in the locker.",
      exercises: [
        ex("Seated dumbbell press", 4, "8–10", 120, "Ribs stacked. Don't overarch."),
        ex("Lateral raise", 4, "12–15", 60, "Lead with the elbows. Soft pinkies up."),
        ex("Rear-delt fly", 3, "15–20", 45, "Think reach, then squeeze."),
        ex("Face pull", 3, "15–20", 45, "Externally rotate at the end."),
        ex("EZ-bar curl", 3, "8–10", 75, "Elbows pinned. No swing."),
        ex("Skull crusher", 3, "10–12", 75, "Only the elbow joint. Bar to hairline."),
      ],
    },
    {
      title: "Full-body session",
      focus: "Density",
      durationMin: 40,
      coachingNote: "Keep transitions tight. This is about quality volume, not hero sets.",
      exercises: [
        ex("Front squat", 3, "6–8", 120, "Elbows high. Sit between the hips."),
        ex("Pendlay row", 3, "6–8", 90, "Dead stop every rep. Pull to the hip."),
        ex("Dumbbell bench", 3, "10–12", 75, "Even tempo. No bounce."),
        ex("Lat pulldown", 3, "10–12", 60, "Full stretch at the top."),
        ex("Walking lunge", 2, "12 / leg", 60, "Upright torso."),
        ex("Plank", 3, "40s", 30, "Ribs down, glutes on."),
      ],
    },
    {
      title: "Optional accessories",
      focus: "Arms",
      durationMin: 30,
      coachingNote: "Optional. If you trained hard Mon–Fri, walk instead.",
      exercises: [
        ex("Cable curl", 3, "12–15", 45, "Constant tension. Don't rest at the bottom."),
        ex("Pressdown", 3, "12–15", 45, "Elbows glued to the ribs."),
        ex("Lateral raise", 3, "15–20", 40, "Light. Make it burn cleanly."),
        ex("Dead hang", 3, "30s", 30, "Breathe. Let the spine decompress."),
      ],
    },
    {
      title: "Walk & reset",
      focus: "Recovery",
      durationMin: 25,
      coachingNote: "You grew yesterday. Today you let it happen.",
      exercises: [
        ex("Easy walk", 1, "25 min", 0, "Outside if you can. Phone in a pocket."),
        ex("Hip 90/90", 2, "8 / side", 20, "Tall spine. Slow rotations."),
        ex("Thoracic opener", 2, "8 / side", 20, "Exhale as you rotate."),
      ],
    },
  ]),
  vitality: week("vitality", [
    {
      title: "Full body A",
      focus: "Strength",
      durationMin: 35,
      coachingNote: "Simple work, done well. Film one set if you can — I'll tell you what I see.",
      exercises: [
        ex("Goblet squat", 4, "8–10", 75, "Elbows inside the knees at the bottom."),
        ex("Single-arm row", 3, "10 / side", 60, "Hips square. Pull to the hip pocket."),
        ex("Push-up", 3, "8–12", 60, "Body one line. Knees down if the last reps break."),
        ex("Romanian deadlift", 3, "10", 75, "Soft knees. Feel the hamstrings load."),
        ex("Side plank", 3, "25s / side", 30, "Hips high. Don't sag."),
      ],
    },
    {
      title: "Engine",
      focus: "Conditioning",
      durationMin: 30,
      coachingNote: "Sustainable pace. You should be able to speak a short sentence.",
      exercises: [
        ex("Kettlebell swing", 6, "12", 45, "Hinge, don't squat. Snap the hips."),
        ex("Farmer carry", 4, "40m", 45, "Tall. Ribs stacked over pelvis."),
        ex("Bike or brisk walk", 1, "8 min", 0, "Nasal if you can. Build heat, don't redline."),
        ex("Dead bug", 3, "6 / side", 30, "Low back pinned. Slow the limbs."),
      ],
    },
    restDay("vitality", 2, "Reset"),
    {
      title: "Full body B",
      focus: "Strength",
      durationMin: 35,
      coachingNote: "Match last session's loads, then earn a small jump.",
      exercises: [
        ex("Split squat", 3, "8 / leg", 75, "Back knee kisses the floor. Front heel heavy."),
        ex("Half-kneeling press", 3, "8 / side", 60, "Squeeze the down-knee glute."),
        ex("Inverted row or band row", 3, "10–12", 60, "Chest proud. Pause one second."),
        ex("Hip thrust", 3, "10–12", 60, "Chin tucked. Squeeze at the top."),
        ex("Carry + march", 3, "30s", 40, "Slow knees. Don't leak at the ribs."),
      ],
    },
    {
      title: "Mobile strength",
      focus: "Control",
      durationMin: 30,
      coachingNote: "Quality over sweat. This is how you stay in the game.",
      exercises: [
        ex("World's greatest stretch", 3, "5 / side", 20, "Long exhale into the hip."),
        ex("Bear crawl", 4, "20s", 30, "Quiet knees. Hips low."),
        ex("Single-leg RDL", 3, "8 / side", 45, "Hips square. Soft standing knee."),
        ex("Wall slide", 3, "10", 30, "Ribs down. Wrists stay on the wall."),
        ex("Easy walk", 1, "10 min", 0, "Shake the session out."),
      ],
    },
    restDay("vitality", 5, "Walk day"),
    restDay("vitality", 6, "Off"),
  ]),
  ascend: week("ascend", [
    {
      title: "Squat day",
      focus: "Lower",
      durationMin: 48,
      coachingNote: "Warm the hips properly. First work set should feel heavy but honest.",
      exercises: [
        ex("Back squat", 5, "5", 180, "Brace, then move. Don't bounce out of the hole."),
        ex("Front-foot elevated split squat", 3, "8 / leg", 90, "Long time under tension."),
        ex("Leg curl", 3, "10–12", 60, "Hips glued. Full squeeze."),
        ex("Calf raise", 4, "10–12", 45, "Pause in the stretch."),
        ex("Hanging knee raise", 3, "10–12", 45, "Pelvis tucks. Don't swing."),
      ],
    },
    {
      title: "Press day",
      focus: "Upper",
      durationMin: 45,
      coachingNote: "Shoulder blades set before every press. Earn the lockout.",
      exercises: [
        ex("Overhead press", 5, "5", 150, "Glutes on. Head through at the top."),
        ex("Pause bench", 3, "6", 120, "One full second on the chest."),
        ex("Weighted chin-up", 3, "5–8", 120, "Dead hang. No kip."),
        ex("Dumbbell row", 3, "8 / side", 75, "Pull to the hip."),
        ex("Face pull", 3, "15", 45, "External rotation at the end."),
      ],
    },
    {
      title: "Hinge day",
      focus: "Posterior",
      durationMin: 48,
      coachingNote: "The floor is not the enemy. Push it away.",
      exercises: [
        ex("Conventional deadlift", 4, "4–6", 180, "Slack out. Legs first, then lock the hips."),
        ex("Romanian deadlift", 3, "8", 120, "Soft knees. Bar stays on the legs."),
        ex("Hip thrust", 3, "8–10", 75, "Posterior tilt at the top."),
        ex("Back extension", 3, "12", 60, "Squeeze glutes, not the spine."),
        ex("Farmer carry", 3, "40m", 60, "Quiet steps. Tall."),
      ],
    },
    restDay("ascend", 3, "Active recovery"),
    {
      title: "Athletic full body",
      focus: "Power",
      durationMin: 42,
      coachingNote: "Move like an athlete. Crisp, not sloppy-fast.",
      exercises: [
        ex("Box jump or jump squat", 4, "5", 75, "Soft landing. Reset every rep."),
        ex("Push press", 4, "5", 90, "Dip-drive. Arms just finish it."),
        ex("Pendlay row", 4, "6", 90, "Dead stop. Violent but clean."),
        ex("Walking lunge", 3, "8 / leg", 75, "Long stride."),
        ex("Sled or bike sprint", 6, "20s", 40, "Hard, then fully recover."),
      ],
    },
    {
      title: "Accessories",
      focus: "Armor",
      durationMin: 40,
      coachingNote: "This is the work that keeps the big days honest.",
      exercises: [
        ex("Bulgarian split squat", 3, "8 / leg", 75, "Torso tall."),
        ex("Incline press", 3, "8–10", 75, "Controlled."),
        ex("Chest-supported row", 3, "10", 60, "Squeeze and hold."),
        ex("Lateral raise", 3, "15", 40, "Light and strict."),
        ex("Carry variation", 3, "30s", 40, "Don't leak."),
      ],
    },
    restDay("ascend", 6, "Off"),
  ]),
  endure: week("endure", [
    {
      title: "Lower strength",
      focus: "Legs",
      durationMin: 40,
      coachingNote: "Leave two reps in the tank. We are building a long career.",
      exercises: [
        ex("Goblet squat", 4, "8", 75, "Elbows track inside the knees."),
        ex("Dumbbell RDL", 3, "10", 75, "Hinge until the hamstrings say stop."),
        ex("Step-up", 3, "8 / leg", 60, "Drive through the whole foot."),
        ex("Calf raise", 3, "12", 40, "Full range."),
        ex("Dead bug", 3, "6 / side", 30, "Slow. Low back stays heavy."),
      ],
    },
    {
      title: "Upper strength",
      focus: "Push & pull",
      durationMin: 40,
      coachingNote: "Shoulders happy first. If anything pinches, reduce the range and tell me.",
      exercises: [
        ex("Floor press", 4, "8", 75, "Pause on the floor. Then press."),
        ex("Single-arm row", 4, "10 / side", 60, "Hips square."),
        ex("Half-kneeling press", 3, "8 / side", 60, "Don't lean back."),
        ex("Face pull or band pull-apart", 3, "15", 40, "Soft elbows."),
        ex("Farmer carry", 3, "30s", 40, "Quiet grip, tall spine."),
      ],
    },
    restDay("endure", 2, "Walk"),
    {
      title: "Full body control",
      focus: "Unilateral",
      durationMin: 38,
      coachingNote: "The weaker side leads. Match it. Don't let the strong side show off.",
      exercises: [
        ex("Split squat", 3, "8 / leg", 75, "Front heel owns it."),
        ex("Single-arm floor press", 3, "8 / side", 60, "Ribs down as you press."),
        ex("Single-leg RDL", 3, "8 / side", 60, "Hips stay square."),
        ex("Suitcase carry", 3, "25s / side", 40, "Don't lean away from the bell."),
        ex("Side plank", 3, "20s / side", 25, "Hips high."),
      ],
    },
    {
      title: "Easy engine",
      focus: "Zone 2",
      durationMin: 35,
      coachingNote: "You should finish wanting a little more. That's the point.",
      exercises: [
        ex("Brisk walk or easy bike", 1, "25 min", 0, "Nasal breathing. Conversational."),
        ex("Hip openers", 2, "5 / side", 20, "Slow."),
        ex("Dead hang", 3, "20–30s", 30, "Breathe."),
      ],
    },
    restDay("endure", 5, "Off"),
    restDay("endure", 6, "Off"),
  ]),
  define: week("define", [
    {
      title: "Lower sculpt",
      focus: "Glutes & legs",
      durationMin: 30,
      coachingNote: "Tempo is the load. Three seconds down on every squat and hinge.",
      exercises: [
        ex("Tempo goblet squat", 3, "10", 45, "Three down, one up."),
        ex("Hip thrust", 3, "12", 45, "Pause two seconds at the top."),
        ex("Reverse lunge", 3, "10 / leg", 45, "Long stride, tall chest."),
        ex("Glute bridge march", 2, "8 / side", 30, "Hips don't drop."),
        ex("Finisher: squat pulses", 2, "30s", 30, "Small range. Honest burn."),
      ],
    },
    {
      title: "Upper sculpt",
      focus: "Push & pull",
      durationMin: 30,
      coachingNote: "Keep the rest honest. The clock is part of the program.",
      exercises: [
        ex("Push-up", 3, "8–12", 45, "Body one line."),
        ex("Bent-over row", 3, "12", 45, "Soft knees, long spine."),
        ex("Arnold press", 3, "10", 45, "Smooth rotation."),
        ex("Lateral raise", 3, "15", 30, "Don't shrug."),
        ex("Finisher: mountain climber", 3, "30s", 20, "Quiet hips."),
      ],
    },
    {
      title: "Full body metabolic",
      focus: "Density",
      durationMin: 28,
      coachingNote: "Circuits. Move with intent, not panic.",
      exercises: [
        ex("Kettlebell swing", 4, "12", 20, "Hinge snap."),
        ex("Push-up", 4, "8", 20, "Clean."),
        ex("Reverse lunge", 4, "8 / leg", 20, "Control the knee."),
        ex("Renegade row", 4, "6 / side", 40, "Hips still."),
        ex("Bike or march", 1, "4 min", 0, "Bring the heart rate down on purpose."),
      ],
    },
    restDay("define", 3, "Walk"),
    {
      title: "Core & carry",
      focus: "Midsection",
      durationMin: 28,
      coachingNote: "Core is anti-movement. Don't flop through these.",
      exercises: [
        ex("Dead bug", 3, "6 / side", 30, "Exhale the ribs down."),
        ex("Side plank", 3, "25s / side", 25, "Hips high."),
        ex("Hollow hold", 3, "20–30s", 30, "Low back heavy."),
        ex("Farmer carry", 4, "30s", 30, "Tall."),
        ex("Dead hang", 3, "20s", 30, "Decompress."),
      ],
    },
    {
      title: "Glute emphasis",
      focus: "Posterior",
      durationMin: 30,
      coachingNote: "If you only remember one cue: squeeze at the top, then own the lower.",
      exercises: [
        ex("Hip thrust", 4, "10", 45, "Two-second squeeze."),
        ex("Romanian deadlift", 3, "10", 60, "Hamstrings loaded."),
        ex("Step-up", 3, "8 / leg", 45, "No push-off from the back foot."),
        ex("Side-lying abduction", 2, "15 / side", 20, "Small and honest."),
        ex("Walk", 1, "8 min", 0, "Shake it out."),
      ],
    },
    restDay("define", 6, "Off"),
  ]),
  limitless: week("limitless", [
    {
      title: "Max lower",
      focus: "Squat",
      durationMin: 58,
      coachingNote: "This is a heavy day. Film your top set. Warm up like it matters.",
      exercises: [
        ex("Back squat", 5, "3–5", 210, "Brace so hard the belt is optional."),
        ex("Pause squat", 3, "3", 150, "Two seconds in the hole."),
        ex("Romanian deadlift", 3, "6", 120, "Heavy and clean."),
        ex("Walking lunge", 3, "8 / leg", 75, "Don't rush."),
        ex("Hanging leg raise", 3, "8–10", 45, "No swing."),
      ],
    },
    {
      title: "Max upper",
      focus: "Press",
      durationMin: 55,
      coachingNote: "Touch and go is not a style. Control the bar.",
      exercises: [
        ex("Bench press", 5, "3–5", 180, "Legs drive. Bar path slightly back."),
        ex("Weighted pull-up", 4, "4–6", 150, "Dead stop hang."),
        ex("Overhead press", 3, "5", 120, "Strict. No knee dip."),
        ex("Chest-supported row", 3, "8", 75, "Squeeze."),
        ex("Face pull", 3, "15", 40, "Armor for tomorrow."),
      ],
    },
    {
      title: "Conditioning",
      focus: "Engine",
      durationMin: 40,
      coachingNote: "Hard, then recover. If the reps get sloppy, you went too soon.",
      exercises: [
        ex("Assault bike or rower", 8, "30s on / 60s off", 0, "Leave a little for interval 8."),
        ex("Kettlebell swing", 5, "15", 45, "Power, not grind."),
        ex("Farmer carry", 4, "40m", 45, "Heavy."),
        ex("Dead hang", 3, "30s", 30, "Reset the shoulders."),
      ],
    },
    {
      title: "Hinge emphasis",
      focus: "Pull",
      durationMin: 55,
      coachingNote: "Speed off the floor. Lockout is a destination, not a lean-back.",
      exercises: [
        ex("Deadlift", 5, "3", 210, "Push the floor. Don't yank."),
        ex("Front squat", 3, "5", 150, "Elbows high."),
        ex("Barbell row", 4, "6", 90, "Chest over the bar."),
        ex("Hip thrust", 3, "8", 75, "Heavy."),
        ex("Back extension", 3, "12", 45, "Glutes."),
      ],
    },
    {
      title: "Athletic accessories",
      focus: "Armor",
      durationMin: 45,
      coachingNote: "This is how you stay available for the heavy days.",
      exercises: [
        ex("Bulgarian split squat", 3, "8 / leg", 75, "Own the bottom."),
        ex("Incline press", 3, "8", 75, "Controlled."),
        ex("Single-arm row", 3, "8 / side", 60, "No rotation."),
        ex("Lateral raise", 4, "12–15", 40, "Strict."),
        ex("Carry medley", 3, "40s", 40, "Don't leak."),
      ],
    },
    {
      title: "Repeatability",
      focus: "Density",
      durationMin: 40,
      coachingNote: "Same work, less rest. Championship condition.",
      exercises: [
        ex("Front squat", 4, "5", 90, "Crisp."),
        ex("Push press", 4, "5", 75, "Dip-drive."),
        ex("Pull-up", 4, "AMRAP-2", 75, "Stop two early."),
        ex("Bike", 1, "8 min", 0, "Flush."),
      ],
    },
    restDay("limitless", 6, "Off — earn next week"),
  ]),
};

export const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"] as const;
export const WEEKDAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export function getProgram(slug: string | null | undefined) {
  return programs.find((p) => p.slug === slug) ?? null;
}

export function todayWeekdayIndex(date = new Date()) {
  return (date.getDay() + 6) % 7;
}

export function getWorkout(slug: string, weekday: number) {
  const weekPlan = workoutsByProgram[slug];
  if (!weekPlan) return null;
  return weekPlan.find((w) => w.weekday === weekday) ?? weekPlan[0] ?? null;
}

export function scoreQuiz(answers: QuizAnswers): string {
  const scores: Record<string, number> = {
    forged: 0,
    vitality: 0,
    ascend: 0,
    endure: 0,
    define: 0,
    limitless: 0,
  };

  const bump = (slug: string, n = 2) => {
    scores[slug] = (scores[slug] ?? 0) + n;
  };

  if (answers.goal === "muscle") {
    bump("forged", 4);
    bump("ascend", 2);
  } else if (answers.goal === "lean") {
    bump("define", 4);
    bump("vitality", 2);
  } else if (answers.goal === "strong") {
    bump("ascend", 3);
    bump("limitless", 3);
    bump("forged", 1);
  } else if (answers.goal === "energy") {
    bump("vitality", 4);
    bump("endure", 2);
  } else if (answers.goal === "longevity") {
    bump("endure", 4);
    bump("vitality", 2);
  }

  if (answers.place === "home") {
    bump("vitality", 3);
    bump("endure", 3);
    bump("define", 2);
    bump("forged", -2);
    bump("limitless", -3);
  } else if (answers.place === "gym") {
    bump("forged", 2);
    bump("ascend", 2);
    bump("limitless", 2);
  }

  if (answers.experience === "new") {
    bump("endure", 3);
    bump("vitality", 2);
    bump("limitless", -3);
    bump("forged", -1);
  } else if (answers.experience === "advanced") {
    bump("limitless", 3);
    bump("forged", 2);
    bump("ascend", 2);
  }

  if (answers.days === "3-4") {
    bump("vitality", 2);
    bump("endure", 2);
    bump("limitless", -2);
  } else if (answers.days === "6") {
    bump("limitless", 3);
    bump("forged", 1);
  }

  if (answers.time === "30") {
    bump("define", 3);
    bump("vitality", 2);
    bump("limitless", -2);
    bump("forged", -1);
  } else if (answers.time === "60") {
    bump("forged", 2);
    bump("limitless", 2);
    bump("ascend", 1);
  }

  if (answers.style === "barbell") {
    bump("ascend", 3);
    bump("limitless", 2);
    bump("forged", 2);
  } else if (answers.style === "functional") {
    bump("vitality", 3);
    bump("endure", 2);
  } else if (answers.style === "sculpt") {
    bump("define", 3);
    bump("forged", 1);
  }

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "vitality";
}

export const testimonials = [
  {
    name: "Michael L.",
    quote:
      "My coach in my ear pushing me to be better — not just physically, but mentally, day in day out.",
    highlight: "not just physically, but mentally",
  },
  {
    name: "Michelle H.",
    quote: "I needed structure. I needed someone to tell me exactly what to do. Now I just show up.",
    highlight: "exactly what to do",
  },
  {
    name: "Ross B.",
    quote: "It helps me be consistent. I have a coach in my ear, telling me what to do.",
    highlight: "consistent",
  },
  {
    name: "Kelly C.",
    quote: "Gave me the confidence to go to the gym. I know what to do now.",
    highlight: "I know what to do now",
  },
  {
    name: "CC A.",
    quote: "From the first session it was clear this was properly programmed. Structured, effective, and easy to stay consistent with.",
    highlight: "this is it",
  },
  {
    name: "Liz W.",
    quote: "Do the workout like it is. It’s there for a reason. It’s programmed.",
    highlight: "It’s programmed",
  },
];

export const longReviews = [
  {
    title: "What you need",
    name: "Jimmy V.",
    body: "You think you only have 25–40 minutes a day? That is not a problem. You will have everything you need — timing, videos, and a chat with the coach. No gear? No problem.",
  },
  {
    title: "Best coaching around",
    name: "Reyez",
    body: "I’ve trained for 13 years — trainers, CrossFit, the lot. This programming changed my body in two months. Stronger, leaner, and I actually look forward to the next session.",
  },
  {
    title: "No more guessing",
    name: "M. Dunn",
    body: "I used to search for workouts and mix-and-match splits. The programming removed the guesswork. On the days I would have skipped, the plan still got me through the session.",
  },
];

export const faqs = [
  {
    q: "How do I find the right plan?",
    a: "Complete the two-minute consultation. You will answer a few questions about your goal, equipment, and schedule. We recommend one of six programmes — all written by HSK Coaching — and you can change at any time.",
  },
  {
    q: "Is HSK Coaching for the gym or for home?",
    a: "Both. FORGED, ASCEND and LIMITLESS are designed for a full gym. VITALITY, ENDURE and DEFINE work with dumbbells, a kettlebell, or bodyweight. The consultation accounts for where you train.",
  },
  {
    q: "How is HSK Coaching different from other fitness apps?",
    a: "You work with one coach, not a library of unrelated videos. You receive a daily plan, in-session cues, form notes, and direct access to ask questions. New sessions are published every week.",
  },
  {
    q: "Do I need a credit card to start?",
    a: "No. Begin with a 7-day trial and cancel at any time. Membership is £29 a month or £249 a year.",
  },
  {
    q: "How long are the workouts?",
    a: "Most sessions last between 30 and 55 minutes. DEFINE is built for 30 minutes. LIMITLESS can run closer to an hour on heavier days.",
  },
  {
    q: "What if I am a beginner?",
    a: "Start with ENDURE or VITALITY. The coaching cues are written so you can learn correct positions before increasing load. We will advise you when you are ready to progress.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. Your training log stays with you. Change programmes from your account whenever your goal or equipment changes.",
  },
  {
    q: "Is nutrition included?",
    a: "Yes. Log meals alongside your training. Protein and calories sit in one place — no second application required.",
  },
];

export const benefits = [
  {
    title: "Results in less time",
    body: "Every session is programmed in advance, so your time in the gym is spent training — not planning.",
  },
  {
    title: "New workouts weekly",
    body: "A complete week of sessions, written by one coach and published every Monday.",
  },
  {
    title: "Train anywhere",
    body: "Follow the plan in a full gym, at home, or while travelling, without losing structure.",
  },
  {
    title: "Professional coaching",
    body: "Clear form guidance, in-session cues, and direct answers when you have questions.",
  },
];

export const QUIZ_STORAGE_KEY = "hale.quiz";

export type StoredQuiz = {
  answers: QuizAnswers;
  programSlug: string;
};

export const quizSteps: Array<{
  key: keyof QuizAnswers;
  title: string;
  options: Array<{ value: string; label: string; hint?: string }>;
}> = [
  {
    key: "goal",
    title: "What do you want most right now?",
    options: [
      { value: "muscle", label: "Build muscle", hint: "Size, shape, definition" },
      { value: "lean", label: "Get lean", hint: "Sculpted, athletic, lighter" },
      { value: "strong", label: "Get stronger", hint: "Heavier lifts, real power" },
      { value: "energy", label: "Feel better", hint: "Energy, consistency, mood" },
      { value: "longevity", label: "Train for life", hint: "Joints, posture, decades" },
    ],
  },
  {
    key: "place",
    title: "Where will you train?",
    options: [
      { value: "gym", label: "Full gym", hint: "Barbells, racks, cables" },
      { value: "home", label: "Home or hotel", hint: "Dumbbells or bodyweight" },
      { value: "both", label: "A combination", hint: "I train in more than one place" },
    ],
  },
  {
    key: "experience",
    title: "How long have you been lifting?",
    options: [
      { value: "new", label: "Beginner", hint: "Under a year, or returning" },
      { value: "mid", label: "1–3 years", hint: "Comfortable with the main lifts" },
      { value: "advanced", label: "3+ years", hint: "Ready for higher demand" },
    ],
  },
  {
    key: "days",
    title: "How many days can you train?",
    options: [
      { value: "3-4", label: "3–4 days" },
      { value: "5", label: "5 days" },
      { value: "6", label: "6 days" },
    ],
  },
  {
    key: "time",
    title: "How long can a session be?",
    options: [
      { value: "30", label: "30 minutes" },
      { value: "45", label: "45 minutes" },
      { value: "60", label: "Up to an hour" },
    ],
  },
  {
    key: "style",
    title: "Which training style do you prefer?",
    options: [
      { value: "barbell", label: "Heavy barbell", hint: "Squat, bench, deadlift" },
      { value: "functional", label: "Functional and mixed", hint: "Carries, kettlebells, control" },
      { value: "sculpt", label: "Physique and metabolic", hint: "Shorter, denser sessions" },
      { value: "mix", label: "No preference", hint: "Recommend the best fit" },
    ],
  },
];
