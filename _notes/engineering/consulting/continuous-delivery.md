# Continuous Delivery

To continuously deliver app updates to your users, you need an automated process that reliably builds, tests, and updates your software. Code changes should automatically flow through a pipeline that includes artifact creation, unit/integration testing, functional testing, and production rollout.

In some cases, you want a code update to apply to only a subset of your users, so that it is exercised realistically before you push it to your entire user base. If one of these canary releases proves unsatisfactory, your automated procedure must be able to quickly rollback changes.

**The Problem with Long Release Cycles**

* Dependencies drift.
* People move on after a feature is implemented.
* Difficult to isolate and triage the source of issues.

Solution =&gt; Release often.

#### Benefits of Continuous Delivery

* Innovation \(Great for business!\)
  * Quicker time to market for new features, configuration changes, experiments, and bug fixes.
  * An aggressive release cadence ensures that broken things get fixed quickly and new ways to delight users arrive in days, not months.
* Faster feedback loops \(Boosts developer productivity and happiness\)
  * Smaller changes deployed frequently make it easier to troubleshoot issues.
  * Incorporating automated testing techniques like chaos engineering or automated canary analysis into the delivery process, problems can be detected more quickly and fixed more efficiently.
* Increase reliability and availability \(Chaos Engineering\)
  * To release quickly, continuous delivery encourages tooling to replace manual error-prone processes with automated workflows.
  * Continuous delivery pipelines can further be crafted to incrementally roll out changes at specific times and different cloud targets.
  * Safe deployment practices can be built into the release process and reduce the blast radius of a bad deployment.
* Developer productivity and Efficiency
  * A more frequent release Cadence helps reduce issues such as incompatible upstream dependencies.
  * Accelerating the time between commit and deploy allows developers to diagnose and react to issues while the change is fresh in their minds.
  * As developer become responsible for maintaining the services they deploy, there is a greater sense of ownership and less blame game when issues do arise.
  * CD leads to higher performing, happier developers.

