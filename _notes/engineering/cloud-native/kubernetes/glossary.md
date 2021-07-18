---
description: 'Link: https://dyn.com/blog/kubernetes-terminology-you-need-to-know/'
---

# Glossary

### [Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod)

The smallest deployable units of computing that can be created and managed in Kubernetes. A Pod \(as in a pod of whales or pea pod\) is a group of one or more containers \(such as Docker containers\), with a shared storage/network, and a specification for how to run the containers.

Pods are a model of the pattern of multiple cooperating processes which form a cohesive unit of service. Pods serve as a unit of deployment, horizontal scaling and replication.

The applications in a pod all use the same network namespace \(same IP and port space\) and can thus find each other and communicate using `localhost`.

To create a pod, you'll need to first describe the pod's desired state by creating a deployment resource.

**Kubectl Commands:**

* `kubectl get pods`

### [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

A _Deployment_ resource provides declarative updates for [Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod/) and [ReplicaSets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/). You describe a _desired state_ in a Deployment, and the Deployment [Controller](https://kubernetes.io/docs/concepts/architecture/controller/) changes the actual state to the desired state at a controlled rate. Also, deployments are responsible for creating and destroying Pods dynamically \(based on desired state changes to the Deployment controller\). 

Some common use-cases for deployment resources include:

* Creating a new ReplicaSet when updating to a new Docker image tag/version.
* Scaling up the Deployment resource \(CPU, Memory, etc\) when facilitating more load.
* Removing older ReplicaSets that are no longer in use.

**Kubectl Commands:**

* `kubectl describe deployments`

**Example:**

```text
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

In order to expose your Pod, you'll need to create a Service resource.

### [Service](https://kubernetes.io/docs/concepts/services-networking/service/)

Kubernetes assigns each Pod an IP address, and a single DNS name for each set of Pods, and can load-balance across each set of Pods. However, what happens when Pods \(called "frontend"\) tries to talk to another set of Pods \(called "backend"\).

**Example:**

```text
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

Secret

PersistentVolume



