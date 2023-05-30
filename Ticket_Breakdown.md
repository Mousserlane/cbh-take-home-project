# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Rule for Time estimates is using the fibonacci sequence 1-8:

a. 1 is for very small tasks that took 1-2 hours max to finished.

b. 2 is for small tasks that'll took 3-5 hours to finished.

c. 3 is for medium tasks that'll took a day to finished.

d. 5 is for large tasks that'll took two days to finished.

e. 8 is for extra large tasks that'll took a week to finished.

---

1. create a one-to-many table called `FacilityAgent` to with `FacilityId `, `AgentId `, & `CustomAgentId` columns. This is used to saved the generated custom id from the ORM function.
   1. Acceptance criteria: Tables should have `FacilityId`, `AgentId`, & `CustomAgentId` columns.
   2. Time estimate: 1
2. create a function `generateCustomId` inside the `FacilityController` to allow Facilities to save custom Ids for their agents.
   1. Acceptance Criteria: Unit test, Function should take agentId & facilityId and generate the custom Id using facility name as prefix. Then save it to the new `FacilityAgent` table.
   2. Time estimate: 3
3. create a function `getCustomAgentId` to get the data from  `FacilityAgent` table. This is the function will get the generated custom agent id.
   1. Acceptance criteria: Unit test, Function should take `agentId` as its parameter & will return the custom ID. This is all assuming that Agents can only work for one facility.
   2. Time estimate: 3
4. Incoroprate the `getCustomAgentId` to the `getShiftsByFacility` function.
   1. Acceptance criteria: Unit test—add `getCustomAgentId` as mock function.
   2. Time estimate: 2
