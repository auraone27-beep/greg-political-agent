# Pilot 1: Political Race Analysis Agent
## Gregory Curtis — Environmental Foundation

_Created: 2026-02-15 by Aura_
_Status: Spec — Awaiting Approval_
_Priority: P0 — Strategy meeting Tuesday Feb 18_

---

## User Story

As Greg, a solo foundation operator making political funding decisions across federal, state, and local races, I need an AI-powered system that continuously monitors races, evaluates candidates against my criteria, and produces weekly actionable memos — so I can make informed funding decisions in minutes instead of days of manual research.

## Problem

Greg makes political funding decisions across 5 dimensions: ballot depth (federal → local), geography, candidate criteria, polling/prediction data, and impact potential. This currently requires:
- Manual research across FEC, OpenSecrets, BallotReady, Ballotpedia, ProPublica
- Cross-referencing polling data with funding gaps
- Evaluating candidates against foundation priorities (environmental policy)
- Producing memos for strategy meetings
- One person doing the work of a full political research team

## Proposed Solution

### Core System: Autonomous Political Race Monitor

**Data Layer:**
- FEC/OpenFEC API: Campaign finance, contributions, expenditures (free)
- ProPublica Congress API: Members, votes, bills, committees (free)  
- OpenSecrets: Money in politics, lobbying, donor data (free for educational)
- BallotReady API: Candidates, ballot measures, endorsements (paid — custom pricing)
- Ballotpedia API: Candidates, elections, bios, districts (paid subscription)
- Google Civic Info API: Elections, polling places (free)
- Polling aggregators: FiveThirtyEight, RealClearPolitics (scrape/API)

**Analysis Engine:**
- Candidate scoring model based on Greg's criteria (environmental policy alignment, viability, impact potential)
- Funding gap analysis: where money is needed most vs current funding levels
- Geographic coverage mapping: ensure portfolio covers priority regions
- Polling trend tracking: momentum indicators for each race

**Output Layer:**
- Weekly automated memo: top races requiring attention, funding recommendations, risk flags
- Dashboard: filterable by geography, ballot level, score, funding status
- Strategy meeting prep pack: auto-generated before scheduled meetings
- Alert system: notify when a high-priority race has a significant change (polling shift, opponent funding surge, endorsement)

### V1 Deliverable (Proof of Concept for Strategy Meeting)

**For Tuesday Feb 18:** A sample political race analysis memo covering:
- 5-10 races across federal/state/local levels
- Environmental policy scoring for each candidate
- Current funding landscape per race
- Recommended funding allocations
- Data sources cited

### Architecture

**Production Instance:**
- Repo: `Aurapath/greg-political-agent` (new, private)
- Stack: Next.js + Supabase (matches Aurapath standard)
- Hosting: Vercel
- Data collection: Cron jobs pulling from APIs daily
- Analysis: Agent processes data and produces memos
- Dashboard: Client-facing UI for Greg to browse races and recommendations

## Acceptance Criteria

- [ ] Data pipeline pulls from at least 3 sources (FEC, ProPublica, one paid source)
- [ ] Candidate scoring model reflects Greg's 5 evaluation dimensions
- [ ] Weekly memo auto-generates with actionable recommendations
- [ ] Dashboard shows races filterable by geography, level, score
- [ ] Alert system notifies on significant race changes
- [ ] All data sources cited in every recommendation

## Cost Estimate

**Data Sources:**
- FEC, ProPublica, Google Civic: Free
- BallotReady: ~$500-2K/month (needs quote)
- Ballotpedia: ~$500-1K/month (needs quote)

**Development:**
- V1 (4 weeks): Data pipeline + scoring model + memo generation + basic dashboard
- V2 (2 weeks): Alert system + strategy meeting auto-prep + refinement from Greg's feedback

**Ongoing:**
- Dedicated agent team monitoring and improving the system
- Monthly retainer covers data source costs + agent compute + iteration

## Test Requirements

- [ ] Data pipeline test: verify each API returns expected data format
- [ ] Scoring model test: given known candidate data, produces expected score
- [ ] Memo generation test: output contains all required sections
- [ ] Dashboard renders with real data without errors
