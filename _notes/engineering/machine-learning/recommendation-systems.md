---
description: 'Link: https://en.wikipedia.org/wiki/Collaborative_filtering'
---

# Recommendation Systems

## Techniques

#### Collaborative Filtering

**Introduction**

Collaborative filtering is a method of making automatic predictions \(filtering\) about the interests of a user by collecting preferences or taste information from many users \(collaborating\). If a person A has the same opinion as a person B on an issue, A is more likely to have B’s opinion on a different issue than that of a randomly chosen person. “People often get the best recommendations from someone with tastes similar to themselves.” - thus being able to make recommendations for these people.

CF algorithms often require:

* User’s active participation
* An easy way to represent user’s interests
* Algorithms that are able to match people with similar interests

The workflow looks like this

* A user expresses their preference by rating items of the system
  * These ratings can be viewed as an approximate representation of the user’s interest in some domain
* The system matches this user’s rating against other users’ and finds the people with most “similar” tastes.
  * With similar uses, the system recommends items that the similar users have rated highly but not yet being rated by this user.
* The key problem of CF is how to combine and weigh the preferences of user neighbors.

**Applied**

CF systems generate more personalized recommendations by analyzing information from the past activity of a specific user, or the history of other users deemed to be of similar taste to a given user.

* Bayesian Networks
* Clustering Models

