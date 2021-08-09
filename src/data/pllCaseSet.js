const pllCaseSet = {
  details: {
    id: "pll",
    title: "PLL",
    subTitle: "Full PLL",
    mask: "ll",
    view: "plan",
    numCases: 21,
  },
  cases: [
    {
      id: "dc9d5589-0258-43de-bc5f-146e9f38539f",
      name: "H perm",
      group: "EPLL",
      prob: 1,
      arrows: ["U1U7-s8-black,U7U1-s8-black,U3U5-s8-black,U5U3-s8-black"],
      scrambles: [
        "R L D2 R L D2 R2 B2 D2 B2 L2 F2 U2 R2 F2 U2",
        "F B D2 F B D2 F2 R2 D2 R2 B2 L2 U2 F2 L2 U2",
        "B F D2 B F D2 B2 L2 D2 L2 F2 R2 U2 B2 R2 U2",
        "L R D2 L R D2 L2 F2 D2 F2 R2 B2 U2 L2 B2 U2",
      ],
      video:
        "https://www.youtube.com/embed/9r_HqG4zSbk?controls=0&amp;start=70",
      algs: ["M2 U M2 U2 M2 U M2", "M2 U' M2 U2 M2 U' M2"],
    },
    {
      id: "8de1fc54-9674-4b3c-80c8-13d97383559f",
      name: "Z perm",
      group: "EPLL",
      prob: 2,
      arrows: ["U3U7-s8-black,U7U3-s8-black,U1U5-s8-black,U5U1-s8-black"],
      scrambles: [
        "R L U2 R L' U' R2 U' R2 U' R2 U' R2 U' R2 B2 R2 B2",
        "F B U2 F B' U R2 F2 R2 U F2 U R2 F2 R2 U F2 U'",
        "B F U2 B F' U L2 B2 L2 U B2 U L2 B2 L2 U B2 U'",
        "L R U2 L R' U' L2 U' L2 U' L2 U' L2 U' L2 F2 L2 F2",
      ],
      video:
        "https://www.youtube.com/embed/9r_HqG4zSbk?controls=0&amp;start=85",
      algs: [
        "M' U' M2 U' M2 U' M' U2 M2",
        "M' U M2 U M2 U M' U2 M2",
        "y M2 U M2 U M' U2 M2 U2 M'",
        "M2 U' M2 U' M' U2 M2 U2 M'",
      ],
    },
    {
      id: "c111db3e-42fc-4c83-8686-8f759c7f6c9e",
      name: "Ua perm",
      group: "EPLL",
      prob: 4,
      arrows: ["U5U3-s8-black,U7U5-s8-black,U3U7-s8-black"],
      scrambles: [
        "F2 D F2 R2 F2 D R2 F2 D2 F2 B2 L2 B2 R2 D2 R2",
        "R2 U' B2 R2 B2 U B2 R2 B2 U2 B2 U2 R2 B2 R2 U2 B2",
        "R2 U' F2 R2 F2 U R' L F2 D2 B2 U2 R L B2 D2",
        "R2 D' R2 F2 R2 D R L' F2 D2 B2 U2 R' L' B2 D2",
      ],
      video:
        "https://www.youtube.com/embed/9r_HqG4zSbk?controls=0&amp;start=18",
      algs: [
        "M2 U M U2 M' U M2",
        "R U' R U R U R U' R' U' R2",
        "y2 R2 U' R' U' R U R U R U' R",
      ],
    },
    {
      id: "9731cb2b-73db-4b8c-b811-9c7775c80552",
      name: "Ub perm",
      group: "EPLL",
      prob: 4,
      arrows: ["U3U5-s8-black,U5U7-s8-black,U7U3-s8-black"],
      scrambles: [
        "F2 U' L2 F2 L2 U F2 L2 U2 L2 F2 L2 U2 F2 L2 U2 F2",
        "F2 D' F2 R2 B2 U R D2 F2 B2 U2 L' F2 R2 U2 B2 U2",
        "F2 D' F2 L2 F2 D F2 L2 D2 L2 B2 R2 U2 F2 R2 U2 B2",
        "L2 U B2 L2 B2 U B2 U2 B2 U2 L2 B2 L2 U2 L2 U2",
      ],
      video:
        "https://www.youtube.com/embed/9r_HqG4zSbk?controls=0&amp;start=43",
      algs: [
        "M2 U' M U2 M' U' M2",
        "R2 U R U R' U' R' U' R' U R'",
        "y2 R' U R' U' R' U' R' U R U R2",
      ],
    },
    {
      id: "f9e1922d-90d7-4a98-9258-f74eafc9d6ec",
      name: "Aa perm",
      group: "A",
      prob: 4,
      arrows: ["U2U6-s8-black,U6U0-s8-black,U0U2-s8-black"],
      scrambles: [
        "R L U2 R L' U F2 U2 R2 F2 R2 U' B2 U' F2 U R2 B2",
        "F B U2 F B L2 U R2 B2 U L2 U' B2 R2 U' L2 F2 B2",
        "B F U2 B F R2 U F2 L2 D B2 U' F2 R2 D' R2 B2 F2",
        "L R U2 L R' D F2 D' F2 U2 L2 F2 L2 U L2 U L2 F2",
      ],
      algs: [
        "x R' U R' D2 R U' R' D2 R2 x'",
        "x L2 D2 L' U' L D2 L' U L' x'",
        "x' L' U L' D2 L U' L' D2 L2 x",
        "x R' U R' D2 R U' R' D2 R2 x'",
        "x' R2 D2 R' U' R D2 R' U R' x",
      ],
    },
    {
      id: "22400ed6-4aab-42a7-a05e-756f3f9e482e",
      name: "Ab perm",
      group: "A",
      prob: 4,
      arrows: ["U8U0-s8-black,U0U6-s8-black,U6U8-s8-black"],
      scrambles: [
        "R L U2 R L U' D' F2 D L2 F2 D B2 D' F2 L2 U' L2",
        "F B U2 F B' R2 U L2 U' B2 U2 B2 L2 F2 D L2 D L2",
        "B F U2 B' F R2 U L2 U' B2 U2 B2 L2 F2 D L2 D L2",
        "L R U2 L R U' D' B2 D B2 R2 U L2 U' R2 B2 U' R2",
      ],
      algs: [
        "x R2' D2 R U R' D2 R U' R x'",
        "x' L2 D2 L U L' D2 L U' L x",
        "y x L U' L D2 L' U L D2 L2 x'",
        "y2 x R2 D2 R U R' D2 R U' R x'",
        "y' x' R U' R D2 R' U R D2 R2 x",
      ],
    },
    {
      id: "fc9f34fa-7afc-4d7f-9f7a-1ae8b1a13b9e",
      name: "E perm",
      group: "Other",
      prob: 2,
      arrows: ["U0U6-s8-black,U6U0-s8-black,U2U8-s8-black,U8U2-s8-black"],
      scrambles: [
        "R L F2 R L' U' L2 D2 F2 U' B2 U' R2 F2 D2 B2 U' R2",
        "F B L2 F' B' L2 U R2 D' L2 B2 L2 D R2 U F2 U2 L2",
        "B F R2 B' F' R2 U L2 D' R2 F2 R2 D L2 U B2 U2 R2",
        "L R B2 L R' U' R2 D2 B2 U' F2 U' L2 B2 D2 F2 U' L2",
      ],
      algs: [
        "x' L' U L D' L' U' L D L' U' L D' L' U L D x",
        "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
      ],
    },
    {
      id: "6ef77698-fca1-4aaa-8997-87bebe00db76",
      name: "F perm",
      group: "Other",
      prob: 4,
      arrows: ["U1U7-s8-black,U7U1-s8-black,U2U8-s8-black,U8U2-s8-black"],
      scrambles: [
        "R L' F2 R L' U' R2 U' R2 L2 F2 U L2 D' B2 D L2 F2",
        "F B D2 F B' D' L2 B2 D' L2 B2 U' F2 L2 R2 U L2 D'",
        "B F D2 B' F D' R2 L2 F2 U B2 L2 D B2 L2 U L2 D'",
        "L R' B2 L R' U R2 U L2 R2 B2 U' L2 D F2 D' L2 B2",
      ],
      algs: ["R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R"],
    },
    {
      id: "796359c2-69ac-4ed5-a0a0-76d53792eb33",
      name: "Ja perm",
      group: "J",
      prob: 4,
      arrows: ["U1U5-s8-black,U5U1-s8-black,U2U8-s8-black,U8U2-s8-black"],
      scrambles: [
        "R L U2 R L' B2 U R2 F2 B2 U' L2 U L2 B2 D F2 U'",
        "F B U2 F B' U F2 D' F2 D R2 F2 L2 B2 D B2 L2 U",
        "B F U2 B' F U R2 B2 D B2 D' L2 U F2 R2 B2 R2 D",
        "L R U2 L' R B2 U L2 U' R2 U R2 F2 D F2 L2 R2 U'",
      ],
      algs: [
        "x R2 F R F' R U2 r' U r U2 x'",
        "y2 L' U' L F L' U' L U L F' L2 U L",
        "y' R' U L' U2 R U' R' U2 R L",
      ],
    },
    {
      id: "4453d455-65b9-48e6-9ef4-ed62252cb451",
      name: "Jb perm",
      group: "J",
      prob: 4,
      arrows: ["U5U7-s8-black,U7U5-s8-black,U2U8-s8-black,U8U2-s8-black"],
      scrambles: [
        "R L U2 R L U D' F2 U' F2 D R2 D' F2 D L2 U2",
        "F B U2 F B U L2 U B2 U' L2 R2 F2 U F2 U' L2 D",
        "B F U2 B F U L2 U B2 U' R2 L2 F2 U F2 U' L2 D",
        "L R U2 L R U D' F2 U' F2 D R2 D' F2 D L2 U2",
      ],
      algs: ["R U R' F' R U R' U' R' F R2 U' R'"],
    },
    {
      id: "a9554939-61de-4f4b-bf85-f7bc40563225",
      name: "Ra perm",
      group: "R",
      prob: 4,
      arrows: ["U1U3-s8-black,U3U1-s8-black,U2U8-s8-black,U8U2-s8-black"],
      scrambles: [
        "R L U2 R L' U' R2 L2 B2 U L2 D' R2 F2 B2 D R2 U2",
        "F B U2 F B U R2 U' L2 U F2 U' L2 D B2 D' F2 B2",
        "B F U2 B F U R2 U' L2 U F2 U' L2 D B2 D' B2 F2",
        "L R U2 L R' D' L2 F2 U' L2 U R2 U' B2 R2 F2 L2 U2",
      ],
      algs: [
        "R U' R' U' R U R D R' U' R D' R' U2 R'",
        "R U R' F' R U2 R' U2 R' F R U R U2 R'",
        "y' L U2 L' U2 L F' L' U' L U L F L2",
      ],
    },
    {
      id: "a5e06308-5b59-4aae-8f97-90bae8a8d1bc",
      name: "Rb perm",
      group: "R",
      prob: 4,
      arrows: ["U3U7-s8-black,U7U3-s8-black,U2U8-s8-black,U8U2-s8-black"],
      scrambles: [
        "R L U2 R L' U L2 U' L2 D F2 D' F2 R2 L2 F2 L2 U2",
        "F B U2 F B L2 U' F2 R2 D' F2 D L2 D' R2 F2",
        "B F U2 B F L2 U' F2 R2 D' F2 D L2 D' R2 F2",
        "L R U2 L R' U L2 B2 L2 R2 D B2 D' F2 D R2 F2 U2",
      ],
      algs: [
        "R2 F R U R U' R' F' R U2 R' U2 R",
        "y' R' U2 R U2 R' F R U R' U' R' F' R2",
        "R' U2 R' D' R U' R' D R U R U' R' U' R",
      ],
    },
    {
      id: "ba8b9813-17cf-4088-9966-c5aaefeeb37e",
      name: "T perm",
      group: "Other",
      prob: 4,
      arrows: ["U3U5-s8-black,U5U3-s8-black,U2U8-s8-black,U8U2-s8-black"],
      scrambles: [
        "R L F2 R L U R2 U' L2 F2 U' F2 U F2 R2 U' R2 F2",
        "F B L2 F B' U2 F2 U F2 U' R2 B2 U' L2 U B2 D' R2",
        "B F R2 B' F' U' R2 U R2 D' R2 D2 B2 U B2 D' R2",
        "L R B2 L' R D B2 U2 F2 R2 F2 U L2 U R2 U' F2 U",
      ],
      algs: ["R U R' U' R' F R2 U' R' U' R U R' F'"],
    },
    {
      id: "a57b00bf-463f-40fd-adbb-fe60e2ba3bd5",
      name: "Y perm",
      group: "Other",
      prob: 4,
      arrows: ["U1U3-s8-black,U3U1-s8-black,U0U8-s8-black,U8U0-s8-black"],
      scrambles: [
        "R L B2 R' L' U' L2 U' L2 U B2 D B2 D' R2 U R2 U",
        "F B U2 F B' U' L2 U R2 D' R2 U' B2 D R2 D' L2 U'",
        "B F U2 B' F U' L2 U R2 D' R2 U' B2 D R2 D' L2 U'",
        "L R B2 L' R' U' L2 U' L2 U B2 D B2 D' R2 U R2 U",
      ],
      algs: [
        "F R U' R' U' R U R' F' R U R' U' R' F R F'",
        "F R' F R2 U' R' U' R U R' F' R U R' U' F'",
      ],
    },
    {
      id: "f67e372a-be9d-4ba4-877c-b0bb277e8b66",
      name: "V perm",
      group: "Other",
      prob: 4,
      arrows: ["U1U5-s8-black,U5U1-s8-black,U0U8-s8-black,U8U0-s8-black"],
      scrambles: [
        "F B U2 F B U F2 U2 L2 U' L2 F2 U2 F2 U L2 U2 B2",
        "L R U2 L R U B2 U2 L2 D' L2 F2 D2 F2 U R2 U2 F2",
        "R L U2 R L U B2 U2 L2 D' L2 F2 D2 F2 U R2 U2 F2",
        "B F U2 B F U F2 U2 L2 U' L2 F2 U2 F2 U L2 U2 B2",
      ],
      algs: [
        "R' U R' U' y R' F' R2 U' R' U R' F R F",
        "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2",
        "z D' R2 D R2 U R' D' R U' R U R' D R U' z'",
        "R U2 R' D R U' R U' R U R2 D R' U' R D2",
        "x' R' F R F' U R U2 R' U' R U' R' U2 R U R' U' x",
      ],
    },
    {
      id: "91106464-e9d0-4114-a204-0dc8c1ea684c",
      name: "Na perm",
      group: "N",
      prob: 1,
      arrows: ["U3U5-s8-black,U5U3-s8-black,U2U6-s8-black,U6U2-s8-black"],
      scrambles: [
        "R L' U2 R' L U2 F2 L2 U' L2 U2 F2 U L2 U2 L2 F2 U'",
        "F B' U2 F' B U2 L2 B2 U' B2 U2 L2 U B2 U2 B2 L2 U",
        "B F' U2 B' F U2 R2 F2 U' F2 U2 R2 U F2 U2 F2 R2 U",
        "L R' U2 L' R U2 B2 R2 U' R2 U2 B2 U R2 U2 R2 B2 U'",
      ],
      algs: [
        "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
        "z U R' D R2 U' R D' U R' D R2 U' R D'",
      ],
    },
    {
      id: "3d48fbf0-5f67-4875-8ffe-99df098daa48",
      name: "Nb perm",
      group: "N",
      prob: 1,
      arrows: ["U3U5-s8-black,U5U3-s8-black,U0U8-s8-black,U8U0-s8-black"],
      scrambles: [
        "R L' U2 R' L U2 F2 R2 U R2 U2 F2 U' R2 U2 R2 F2 U",
        "F B' U2 F' B U2 L2 F2 U F2 U2 L2 U' F2 U2 F2 L2 U'",
        "B F' U2 B' F U2 R2 B2 U B2 U2 R2 U' B2 U2 B2 R2 U'",
        "L R' U2 L' R U2 B2 L2 U L2 U2 B2 U' L2 U2 L2 B2 U",
      ],
      algs: [
        "R' U R U' R' F' U' F R U R' F R' F' R U' R",
        "z D' R U' R2 D R' U D' R U' R2 D R' U",
      ],
    },
    {
      id: "876cb7c2-f591-451d-a6ab-722192aad190",
      name: "Ga perm",
      group: "G",
      prob: 4,
      arrows: [],
      scrambles: [
        "R L U2 R' L F2 U' B2 R2 F2 L2 D' R2 D L2 D' B2 U",
        "F B U2 F B' L2 R2 U' R2 U F2 U' R2 D F2 B2 R2 D'",
        "B F U2 B F' U' B2 L2 U' L2 U F2 U' B2 U F2 L2 B2",
        "L R U2 L R' F2 U' B2 R2 F2 L2 D' R2 D L2 D' B2 U",
      ],
      algs: [
        "R2 U R' U R' U' R U' R2 U' D R' U R D'",
        "R2 u R' U R' U' R u' R2 y' R' U R",
      ],
    },
    {
      id: "af895f1e-729b-4c63-aaef-7e3910e21444",
      name: "Gb perm",
      group: "G",
      prob: 4,
      arrows: [],
      scrambles: [
        "R L U2 R L F2 U L2 U' R2 U B2 R2 D B2 R2 U",
        "F B U2 F B' U' R2 F2 U' F2 U F2 R2 D R2 D'",
        "B F U2 B F' U D' R2 U' F2 U B2 U' B2 D L2 U' R2",
        "L R U2 L R F2 U L2 U' R2 U B2 R2 D B2 R2 U",
      ],
      algs: [
        "R' U' R U D' R2 U R' U R U' R U' R2 D",
        "y F' U' F R2 u R' U R U' R u' R2",
      ],
    },
    {
      id: "8ba4e3c8-fd07-4360-af29-59ba64c64360",
      name: "Gc perm",
      group: "G",
      prob: 4,
      arrows: [],
      scrambles: [
        "R L U2 R L' B2 U R2 F2 L2 B2 U B2 U' L2 D F2 U'",
        "F B U2 F B' U L2 B2 R2 B2 L2 D' F2 D R2 U' F2 U",
        "B F U2 B F' U R2 U' B2 U R2 D' B2 L2 U' B2 L2 F2",
        "L R U2 L' R B2 U L2 U' L2 D F2 D' L2 R2 B2 L2 U'",
      ],
      algs: [
        "R2 U' R U' R U R' U R2 U D' R U' R' D",
        "y2 R2 F2 R U2 R U2 R' F R U R' U' R' F R2",
        "R2 u' R U' R U R' u R2 y R U' R'",
      ],
    },
    {
      id: "d6e81702-6823-414a-a3d0-17e8ec680762",
      name: "Gd perm",
      group: "G",
      prob: 4,
      arrows: [],
      scrambles: [
        "R L U2 R L' F2 U F2 U' L2 U R2 L2 B2 R2 D B2 U'",
        "F B U2 F B' D' L2 U L2 B2 D F2 D' B2 D R2 F2 R2",
        "B F U2 B F' U B2 R2 U R2 U' F2 U B2 U' B2 R2 F2",
        "L R U2 L R' F2 U B2 U' R2 U B2 L2 B2 F2 D B2 U'",
      ],
      algs: [
        "R U R' U' D R2 U' R U' R' U R' U R2 D'",
        "R U R' y' R2 u' R U' R' U R' u R2",
      ],
    },
  ],
};

export default pllCaseSet;
