---
description: 'Link:  https://kubernetes.io/docs'
---

# Kubernetes

## [Introduction](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

Prior to Cloud Computing, organizations/teams ran applications on physical servers which proved to be costly to maintain. After physical servers came the rise of virtualization software which was less costly to maintain, however virtualized applications proved to be more costly in physical resources \(memory, cpu, storage, etc\).

Currently, we live in a "Containerization" world, where whole applications are running in isolated environments called _containers_. Each container has its own filesystem, CPU, memory, process space, and more.

Containers are a great way to bundle your applications, however you'll still need to manage the containers and ensure there is no downtime during deployment. While there are many container orchestrator tools, we'll be taking a deep dive into Kubernetes, a framework for running distributed systems _resiliently_.

#### What is Cloud Native?

The Cloud Native space is deep and complex, the definition of Cloud Native is not well defined. However, according to Joe Beda, Cloud Native computing are "_Applications that take advantage of the unique capabilities of the cloud._"

In this cloud native world, developers are transferring management responsibility to the cloud provider \(AWS, Azure, GCP\). Also, developers are able to provision their own infrastructure resources quickly, and autonomously, in an automated way \(decoupling applications from the infrastructure they run on\). Thus, applications can be scaled up, and down, based on the needs of the system or user load.

#### What is Kubernetes?

Kubernetes is an open source tool for orchestrating the deployment of containerized applications in a reliable, scalable way through the use of distributed systems. Kubernetes provides the following:

* Service Discovery and Load Balancing
* Storage orchestration
* Automated rollouts and rollbacks

#### Motivation

Resiliency is the ability of a system to recover from failures and continue to function, its about responding to failures than avoiding them by responding in a way that avoids downtime and data loss. The goal of resiliency is to retain the application to a fully functioning state after a failure.
  - if an application is performing poorly, we could revert a commit and redeploy to "master" branch.
  - also could be done automatically with canary style deployments.

#### Getting Started

Since Docker is the default container runtime engine supported by Kubernetes, you'll want to make sure Docker is [installed](https://docs.docker.com/install/) on your machine. While there are many local Kubernetes development tools out there \(like [kind](https://kind.sigs.k8s.io/docs/user/quick-start/) and [minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/)\) The quickest way to setup a cluster locally, is to use the Docker Desktop's [Kubernetes environment](https://www.docker.com/blog/kubernetes-is-now-available-in-docker-desktop-stable-channel/). This comes installed, but not enabled by default, in the Docker Desktop app.

For more information on how to turn this feature on, checkout this [guide](https://thenewstack.io/how-to-install-docker-desktop-with-kubernetes-on-macos/) from Docker.

#### Frequently Used Commands

### Glossary

#### Common

**Pod**

A _pod_ is the smallest deployable units of computing that can be created and managed in Kubernetes. A Pod \(as in a pod of whales or pea pod\) is a group of one or more containers \(such as Docker containers\), with a shared storage/network, and a specification for how to run the containers.

Pods are a model of the pattern of multiple cooperating processes which form a cohesive unit of service. Pods serve as a unit of deployment, horizontal scaling and replication.

The applications in a pod all use the same network namespace \(same IP and port space\) and can thus find each other and communicate using `localhost`.

**Service**

A _service_ is an abstraction which defines a logical set of Pods and a policy by which to access them. The set of Pods targeted by a Service is usually determined by a selector.

#### Resources

**Deployment Resource**

**Service Resource**

**Secret Resource**

