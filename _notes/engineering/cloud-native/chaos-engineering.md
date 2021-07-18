---
description: 'Link: https://principlesofchaos.org'
---

# Chaos Engineering

## Background

Chaos Engineering lets you validate what you think will happen with what is actually happening in your systems. By performing the smallest possible experiments you can measure, you’re able to “break things on purpose” in order to learn how to build more resilient systems.

Chaos Engineering is the discipline of experimenting on a system in order to build confidence in the system’s capability to withstand turbulent conditions in production.

Remember: Chaos Engineering is focused on controlled failure-injection. The purpose of these experiments is to simulate disaster conditions. Focus on availability in the beginning, or lack thereof.

Advances in large-scale computing systems are changing the way we see software engineering. As an industry, we are quick to adopt practices that increase flexibility of development and velocity of development.

_**How much confidence can we have in these complex systems that we put into production?**_

Weakness could take the form of:

* Improper fallback settings when a service is unavailable
* Retry storms from improperly tuned timeouts
* Outages when a downstream dependency receives too much traffic
* Cascading failures when a single point of failure crashes

An empirical, systems-based approach addresses the chaos in distributed systems at scale and builds confidence in the ability of those systems to withstand realistic conditions. We learn about the behavior of a distributed system by observing it during a controlled experiment.

#### In Practice

Chaos Engineering can be thought of as the facilitation of experiments to uncover systemic weaknesses. These experiments follow four steps:

1. Start by defining ‘steady state’ as some measurable output of a system that indicates normal behavior. \(Baseline\)
2. Hypothesize that this steady state will continue in both the control group and the experimental group. \(Test groups\)
3. Introduce variables that reflect real world events like servers that crash, hard drives that malfunction, network connections that re severed.
4. Try to disprove the hypothesis by looking for a difference in steady state between the control group and the experimental group.

The harder it is to disrupt the steady state, the more confidence we have in the behavior of the system. If a weakness is uncovered, we now have a target for improvement before that behavior manifests in the system at large.

#### Advanced Principles

* Build a hypothesis around Steady State Behavior
  * Focus on the measurable output of a system, rather than internal attributes of the system. Measurements of that output over a short period of time constitute a proxy for the system’s steady state.
  * The overall system’s throughput, error rates, latency percentiles, etc could all be metrics of interest.
  * By focusing on systemic behavior patterns during experiments, Chaos verifies that the system does work, rather than trying to validate how it works.
* Vary Real-world Events
  * Chaos variables reflect real-world events.
  * Organize events either by potential impact or estimated frequency.
  * Consider events that correspond to hardware failures like servers dying, software failures like malformed responses and non-failure events like a spike in traffic or a scaling event.
  * Any event capable of disrupting steady state is a potential variable in a Chaos experiment.
* Run Experiments in Production
  * Systems behave differently depending on the environment and traffic patterns.
  * Since the behavior utilization can change at any time, sampling real traffic is the only way to reliably capture the request path.
  * To guarantee both authenticity of the way in which the system is exercised and relevance to the current deployed system, Chaos strongly prefers to experiment directly on production traffic.
* Automate Experiments to Run Continuously
  * Running experiments manually is labor-intensive and ultimately unsustainable. Automate experiments and run them continuously.
  * Chaos Engineering builds automation into the system to drive both orchestration and analysis.
* Minimize Blast Radius
  * Experimenting in production has the potential to cause unnecessary customer pain. While there must be an allowance for some short-term negative impact, it is the responsibility and obligation of the Chaos Engineer to ensure the fallout from experiments are minimized and contained.

Where other practices address velocity and flexibility, Chaos specifically tackles systemic uncertainty in these distributed systems. The principles of Chaos provide confidence to innovate quickly at massive scales and give customers the high quality experiences they deserve.

### Tools

* Chaos Monkey \(Kill EC2 machines\)
* Spinnaker \(CI/CD\)
* Kube-monkey
  * Performs one task: randomly delete kubernetes pods within the cluster, as a means of injecting failure in the system and testing the stability of the remain pods.
* Chaos Lambda
  * [https://github.com/bbc/chaos-lambda](https://github.com/bbc/chaos-lambda)

Stories =&gt; [https://news.ycombinator.com/item?id=19180836](https://news.ycombinator.com/item?id=19180836) Kubernetes =&gt; [https://www.gremlin.com/chaos-monkey/chaos-monkey-alternatives/kubernetes/](https://www.gremlin.com/chaos-monkey/chaos-monkey-alternatives/kubernetes/) Tools for outside AWS =&gt; [https://www.gremlin.com/chaos-monkey/chaos-monkey-alternatives/](https://www.gremlin.com/chaos-monkey/chaos-monkey-alternatives/)

## Articles

**Netflix**

[https://www.youtube.com/watch?v=Q4nniyAarbs](https://www.youtube.com/watch?v=Q4nniyAarbs)

* 4 billion hours per month \(40% of the entire internet at peak\).
* Control Plane
  * Signing up and logging in
  * Streaming
* They measure engineers based on how they optimize these three things
  * Performance
  * Fault Tolerance
  * Availability
* High priority on Feature velocity
  * Competitive edge
  * Experiments actively with A/B Tests
* Microservices
  * Team of 4-5 people \(pizza size\)
* Look into systems thinking, bullwhip pattern, and beer game.
* Tools
  * Traffic analysis
    * [https://github.com/Netflix/vizceral](https://github.com/Netflix/vizceral)
  * Killing Servers
    * [https://github.com/Netflix/chaosmonkey](https://github.com/Netflix/chaosmonkey)
  * Killing Regions
    * Chaos Kong \(not publicly available\)
  * All
    * SimianArmy
      * [https://www.gremlin.com/chaos-monkey/the-simian-army/](https://www.gremlin.com/chaos-monkey/the-simian-army/)

**Simian Army \(Deprecated\)**

[https://www.gremlin.com/chaos-monkey/the-simian-army/](https://www.gremlin.com/chaos-monkey/the-simian-army/)

The Simian Army is a suite of failure-inducing tools designed to add more capabilities beyond Chaos Monkey. While Chaos Monkey foley handles termination of random instances, Netflix engineers needed additional tools able to induce other types of failure.

Army Members \(Tools\)

* Chaos Monkey
* Swabbie \(R.I.P Janitor Monkey\)
  * Seeks out and disposes of unused resources within the cloud.
  * Checks any given resource against a set of configurable rules to determine if its an eligible candidate for cleanup.
  * Only available on Spinnaker.
* Conformity Monkey
  * Available through Spinnaker.
  * Seeks out and disposes of resources that don’t conform to predefined rule sets and shuts them down. Examples include:
    * Auto-scaling groups and their associated elastic load balancers that have mismatched availability zones.
    * Clustered instances that are not contained in required security groups.
    * Instances that are older than the a certain age threshold.
* Security Monkey
  * Standalone project
  * Seeks potential security vulnerabilities and violations.
  * Ships with a SPA web interface.

At Netflix, an engineer is responsible for its innovation as well as its operation, which includes making sure the service is reliable, secure, efficient and performant.

