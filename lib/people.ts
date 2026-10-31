// Who the visitor has in mind. Every card below is a real card from the named
// deck (content/decks in the app repo), word for word, ordered light to deep.
export interface Card {
  q: string;
  a: string;
  b: string;
}

export interface Person {
  id: string;
  chip: string;
  /** How the person reads inside a sentence: "Mom", "your partner". */
  name: string;
  deck: string;
  cards: [Card, Card, Card];
}

export const PEOPLE: Person[] = [
  {
    id: "friend",
    chip: "Best friend",
    name: "your best friend",
    deck: "Pick Up At 3AM",
    cards: [
      { q: "Game night, final round, and I really want this one. Do you let me win?", a: "Never, I play to win", b: "Fine, it’s yours" },
      { q: "I’m between homes and need your sofa for a month. Okay?", a: "Stay as long as you need", b: "A week, max" },
      { q: "Is there something you’ve never quite forgiven me for?", a: "One thing, yes", b: "Nothing at all" },
    ],
  },
  {
    id: "crush",
    chip: "Crush",
    name: "your crush",
    deck: "Situationship Court",
    cards: [
      { q: "They’ve had your hoodie for a month now. Is that basically official?", a: "Basically, yes", b: "It’s just a hoodie" },
      { q: "I text you: ‘Can we talk tonight?’ Your first thought:", a: "You want more!", b: "You’re ending it" },
      { q: "If we had ‘the talk’ right now, how would it go?", a: "Better than you think", b: "Let’s not find out" },
    ],
  },
  {
    id: "partner",
    chip: "Partner",
    name: "your partner",
    deck: "What You’d Do For Love",
    cards: [
      { q: "They want your last fry. You hand it over?", a: "Obviously", b: "Not the last one" },
      { q: "Their family’s watching and they’re wrong. You take their side?", a: "Their side, always", b: "Wrong is wrong" },
      { q: "You could see if you two last forever. Look?", a: "Show me", b: "Let it stay a mystery" },
    ],
  },
  {
    id: "group",
    chip: "Group chat",
    name: "the group chat",
    deck: "Group Chat Confessions",
    cards: [
      { q: "You’ve muted someone in this chat:", a: "Guilty", b: "Never" },
      { q: "Screenshotted a friend’s text to another friend:", a: "Obviously", b: "Never" },
      { q: "A ‘real’ chat exists without one of us:", a: "Yes", b: "We’d never" },
    ],
  },
  {
    id: "sibling",
    chip: "Sibling",
    name: "your sibling",
    deck: "The Sibling Deck",
    cards: [
      { q: "Does ‘I called it first!’ still count between us?", a: "Still legally binding", b: "Expired long ago" },
      { q: "Do you worry about your sibling more than you let on?", a: "More than I say", b: "No, I trust them to cope" },
      { q: "Was there a time we drifted apart, even if we never said it?", a: "Yes, for a while", b: "No, never really" },
    ],
  },
  {
    id: "mom",
    chip: "Mom",
    name: "Mom",
    deck: "The Mom Deck",
    cards: [
      { q: "Mom asks ‘Did you eat?’ What does it really mean?", a: "Exactly that: food", b: "Secret code: I love you" },
      { q: "A mom’s pride: does it feel more like fuel, or like pressure?", a: "Like fuel", b: "Like pressure" },
      { q: "When did you feel most loved by the other: on a big day, or on a hard one?", a: "On a big day", b: "On a hard day" },
    ],
  },
  {
    id: "dad",
    chip: "Dad",
    name: "Dad",
    deck: "The Dad Deck",
    cards: [
      { q: "‘We’ll see.’ Growing up, what did that usually mean?", a: "Maybe, honestly", b: "No, said nicely" },
      { q: "Has either of you ever said something real, but dressed it up as a joke?", a: "Yes, plenty of times", b: "No, never" },
      { q: "Saying ‘love you’ to each other: easy, or still a bit awkward?", a: "Easy, every time", b: "Still a bit awkward" },
    ],
  },
];

export const personById = (id: string): Person => PEOPLE.find((p) => p.id === id) ?? PEOPLE[0];

export const possessive = (name: string): string => `${name}’s`;

export const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export const appUrl = (medium: string, personId?: string): string =>
  `https://web.onpini.com/?utm_source=site&utm_medium=${medium}${personId ? `&utm_content=${personId}` : ""}`;
