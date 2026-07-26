# Submitting this sheet to the Roll20 community repository

This folder is filled in and ready. Author, Roll20 user ID, license name, and
the required preview image are all in place. What remains is the GitHub PR
itself — steps only you can do from your account.

## Filled in for you
- sheet.json -> authors: William Harvey Jr
- sheet.json -> roll20userid: 10767956
- LICENSE -> copyright: William Harvey Jr
- screenshot.png -> included (2476x1356 PNG), referenced as "preview" in sheet.json

## What was changed for repository eligibility
Roll20 forbids character creation/advancement in community sheets. Two features
were REMOVED versus the private build:
- The "Autofill Defaults" worker that seeded the standard skill list
- The Power-Level worker that set starting Refresh / Skill Cap / skill points

Power Level is now a plain label; Refresh and Skill Cap are user-entered. All
auto-CALCULATION (stress sums, adjusted refresh from stunt costs, skill-point
tally from typed ratings) is retained — that is allowed.

## Step by step (your part)
1. Fork https://github.com/Roll20/roll20-character-sheets on GitHub.
2. In your fork, create a folder: `Dresden Files Accelerated/`
3. Add every file from this zip into that folder: sheet.html, sheet.css,
   sheet.json, translation.json, screenshot.png, LICENSE, README.md,
   STUNT_COST_REFERENCE.md.
4. (Optional sanity check) paste sheet.json into https://jsonlint.com
5. Commit and push to your fork.
6. Open a Pull Request against Roll20/roll20-character-sheets `master`.
   PRs are reviewed roughly weekly (submit before ~06:00 PST Monday).
7. A Roll20 staffer reviews for the minimum requirements and the
   no-character-creation rule. Address any comments; once merged, the sheet
   appears in the sheet dropdown for all users.

## One thing to eyeball before you submit
The Approaches box labels each approach with the skills it covers
(e.g. "Focus — Careful: Discipline, Alertness, Investigation"). This is a
short descriptive aid, not a reproduced rules table, and is very likely fine.
But it is the one spot that references DFRPG skill groupings. If a reviewer
objects, deleting the <span class="appr-skills">...</span> text from each of
the six approach rows in sheet.html removes it without affecting anything else.

## If you don't want to use GitHub
You don't have to publish to the repo to share the sheet. Anyone can paste
sheet.html + sheet.css into their own game's Custom Sheet boxes. The repo is
only needed to make it selectable from Roll20's built-in sheet dropdown.
