+++
title = "Performance Testing using Gatling"
description = "In this blog post, we are going to write run your first load test using Gatling, an open source performance testing tool. But before we get our hands dirty, let's explore what performance testing is and some performance testing strategies."
date = "2020-09-18 12:00:00"
draft = true

[taxonomies]
tags=["testing", "automation"]

[extra]
author = "tjmaynes"
+++
## What is Performance Testing? 
> Performance testing is the process of determining the speed, responsiveness, and durability of  a computer system, program, and/or network under simulated extreme circumstances - Guru99.

Websites, mobile apps, and/or services deployed to market without Performance tests are especially useful for guaranteeing that your service, or software, uphold's your , which keeps your customer's happy and will help you sleep better at night.

While writing performance tests are important, it's also it important to include these tests in your Continuous Integration (CI) environment as well. If a commit causes a subtle performance degradation, and depending on how well you've written your performances tests, then "super-awesome" performance test suite should be able to pick up this issue before your users do.

### Load Testing
Load testing is a performance testing strategy for determining how responsive your system is under an expected load. For example, you can write a load test to determine whether your AmazingAPI service is able to be hit by users at 15 times per second (requests per second/rps).

### Stress Testing

however due to a recent Twitter message about AmazingCompany, more people are 
### Endurance Testing